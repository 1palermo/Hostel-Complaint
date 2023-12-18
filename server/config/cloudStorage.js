const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dttlt8f5i',
    api_key: '535748393319165',
    api_secret: 'VTbKpzBITyo0dkZUGah1Kiyx7b4',
    secure: true,
});

module.exports= cloudinary;