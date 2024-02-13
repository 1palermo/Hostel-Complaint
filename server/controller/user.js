const User = require("../model/user");
const Report = require("../model/report");
const Response = require("../model/response");
const { setUser, getUser } = require("../services/auth");
const cloudinary = require('../config/cloudStorage');

async function handleLogin(req, res) {
    try {
        const username = req.body.email;
        const password = req.body.password;
        const google = req.query.google;
        const user = await User.findOne({ email: username }, { _id: 1, roll:1 , email: 1, category: 1, password: 1, username: 1, userImage: 1, hostel_room_no: 1,
        tower: 1, contact: 1});
      //  console.log(user);
        if (!user) {
            return res.redirect("/login");
        } else {
            user.comparePasswords(password, (err, match) => {
                if (!match && google === "false") {
                    return res.status(300).json({
                        url: "/",
                        valid: false
                    });
                } else {
                    const temp = {
                        _id: user._id,
                        email: user.email,
                        category: user.category,
                        contact: user.contact,
                        username: user.username,
                        userImage: user.userImage,
                        hostel_room_no: user.hostel_room_no,
                        tower: user.tower,
                        roll : user.roll
                    };
                    const token = setUser(temp);
                    if (user.category === "Hostel-Admin") {
                        return res.status(300).json({
                            url: `/Admin?close=${"yes"}&dept=${""}&cat=${"Hostel-Admin"}`,
                            customToken: token,
                            valid: true,
                            temp
                        });
                    }
                    else if (user.category === "Electrical-Admin") {
                        return res.status(300).json({
                            url: `/Admin?close=${"no"}&dept=${"electrical department"}&cat=${"Electrical-Admin"}`,
                            customToken: token,
                            valid: true,
                            temp
                        });
                    }
                    else if (user.category === "Civil-Admin") {
                        return res.status(300).json({
                            url: `/Admin?close=${"no"}&dept=${"civil department"}&cat=${"Civil-Admin"}`,
                            customToken: token,
                            valid: true,
                            temp
                        });
                    }
                    else if (user.category === "ComputerCentre-Admin") {
                        return res.status(300).json({
                            url: `/Admin?close=${"no"}&dept=${"computer centre"}&cat${"ComputerCentre-Admin"}`,
                            customToken: token,
                            valid: true,
                        });
                    }
                    else if (user.category === "Attendant") {
                        return res.status(300).json({
                            url: '/Attendant',
                            customToken: token,
                            valid: true,
                            temp
                        });
                    }
                    else{
                        return res.status(300).json({
                            url: '/User/userHome',
                            customToken: token,
                            valid: true,
                            temp
                        });
                    }
                }
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
}

async function handleSignup(req, res) {
    try {
        const file = req.body.image;
        const currentDate = new Date();
        const expirationDate = new Date(currentDate);
        expirationDate.setFullYear(expirationDate.getFullYear() + 4); // Adding 4 years
        const expirationDateString = expirationDate.toISOString();

        cloudinary.uploader.upload(file, {
            upload_preset: 'unsigned_upload',
            allowed_formats: ['jpg', 'jpeg', 'png'],
            expires_at: expirationDateString // Include expiration date
        }, function (err, result) {
            if (err) {
                console.log("failure", err);
                return res.status(400).redirect("/");
            }
            else {
                const user = new User({
                    username: req.body.username,
                    contact: req.body.contact,
                    email: req.body.email,
                    password: req.body.password,
                    category: "Hosteller",
                    userImage: result.secure_url,
                    tower: req.body.tower,
                    roll: req.body.roll,
                    hostel_room_no: req.body.hostel_room_no
                });
                user.save()
                    .then((user) => {
                        const token = setUser({
                            _id: user._id,
                            email: user.email,
                            category: user.category
                        });
                        console.log("saved");
                        return res.status(200).json({
                            customToken: token,
                            url: "/User/userHome",
                            valid: true,
                            user
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        return res.status(400).redirect("/");
                    });
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
}

async function handleAuthentication(req, res) {
    try {
        const token = req.headers.authorization;
        console.log("c", token);
        if (!token || token === '') {
            return res.status(400).json({ error: 'token not found', valid: false, url:'/' });
        }

        const tokenUser = getUser(token);
        console.log(tokenUser);
        if (tokenUser) {
            const username = tokenUser.email;
            const user = await User.findOne({ email: username }, { _id: 1, status: 1, username: 1, email: 1, contact: 1, userImage: 1, tower: 1, hostel_room_no: 1, roll: 1, category: 1 });
            
            if (!user) {
                return res.json({ valid: false, url: '/' });
            }
            if (user.category === "Hostel-Admin") {
                return res.status(300).json({
                    url: `/Admin?close=${"yes"}&dept=${""}&cat=${"Hostel-Admin"}`,
                    valid: true,
                    user
                });
            }
            else if (user.category === "Electrical-Admin") {
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"electrical department"}&cat=${"Electrical-Admin"}`,
                    valid: true,
                    user
                });
            }
            else if (user.category === "Civil-Admin") {
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"civil department"}&cat=${"Civil-Admin"}`,
                    valid: true,
                    user
                });
            }
            else if (user.category === "ComputerCentre-Admin") {
                return res.status(300).json({
                    url: `/Admin?close=${"no"}&dept=${"computer centre"}&cat${"ComputerCentre-Admin"}`,
                    valid: true,
                    user
                });
            }
            else if (user.category === "Attendant") {
                console.log("hi is am attendant")
                return res.status(300).json({
                    url: '/Attendant',
                    valid: true,
                    user
                });
            }
            else{
                console.log("hi i am c")
                return res.status(300).json({
                    url: '/User/userHome',
                    valid: true,
                    user
                });
            }
        }
        else{
            return res.json({
                url: "/",
                valid: false
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
}

async function handleProfile(req, res) {
    try {
        const token = req.headers.authorization;
        const user = getUser(token);
        if (!user) {
            res.json({
                username: "xyz",
                contact: 0,
                email: "xyz@admin.ac.in",
                hostel_room_no: "",
                tower: ""
            });
        }
        const profile = await User.find({ _id: user?._id });
        res.json(profile);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
}

async function handleUpdate(req, res) {
    try {
        const token = req.headers.authorization;
        const user =  getUser(token);
     
        const del = await User.findOneAndUpdate({ _id: user._id }, {
            username: req.body.data.username,
            contact: req.body.data.contact,
            tower: req.body.data.tower,
            hostel_room_no: req.body.data.hostel_room_no
        });
       
        res.status(300).json({
            message: "updated successfully!"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
}

async function deleteUser(req, res) {
    try {
        await User.deleteMany({ _id: req.query.Id });
        const reports = await Report.find({ sender: req.query.Id });
        reports.map(async (data) => {
            await Response.deleteMany({ problem: data._id });
        });
        await Report.deleteMany({ sender: req.query.Id });
        res.status(200).json({ message: 'User and associated data deleted successfully.' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
}

async function getAllUsers(req, res) {
    try {
        const Users = await User.find({ category: "Hosteller" });
        res.json(Users);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
}

async function handleReport(req, res) {
    try {
        const file = req.body.data.image;
        const token = req.headers.authorization;
        
        if (file) {
            cloudinary.uploader.upload(file, {
                upload_preset: 'unsigned_upload',
                allowed_formats: ['jpg', 'jpeg', 'png']
            }, function (err, result) {
                if (err) {
                    console.log("failure", err);
                    return res.status(400).redirect("/");
                }
                else {
                    const report = new Report({
                        problem: req.body.data.issue,
                        title: req.body.data.title,
                        description: req.body.data.desc,
                        sender: getUser(token)._id,
                        department: req.body.data.department,
                        image: result.secure_url,
                        createdAt: new Date()
                    });

                    report.save()
                        .then((rep) => {
                            return res.status(200).json({
                                valid: true
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            return res.status(400).json({
                                valid: false
                            });
                        });
                }
            });
        }
        else {
            const report = new Report({
                problem: req.body.data.issue,
                title: req.body.data.title,
                description: req.body.data.desc,
                sender: getUser(token)._id,
                department: req.body.data.department,
                image: "",
                createdAt: new Date()
            });

            report.save()
                .then((rep) => {
                    return res.status(200).json({
                        valid: true
                    });
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(400).json({
                        valid: false
                    });
                });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            error: 'An error occurred'
        });
    }
}

module.exports = { handleLogin, handleSignup, handleReport, handleAuthentication, handleProfile, handleUpdate, deleteUser, getAllUsers };
