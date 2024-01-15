const mongoose= require('mongoose')

mongoose
    .connect("mongodb+srv://ag8350961:taosOMECiJy9yXn@cluster0.cr82fqb.mongodb.net/hostel")
    .then(()=>{console.log("Db connected")})
    .catch((err)=>{console.log(err)})


