const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'WanderLust_DEV',
    allowedFormats:['png', 'jpeg', 'jpg'],
  },
});

module.exports={cloudinary, storage};