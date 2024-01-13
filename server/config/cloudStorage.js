const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: ,
    api_key: ,
    api_secret: ,
    secure: true,
});

module.exports= cloudinary;
