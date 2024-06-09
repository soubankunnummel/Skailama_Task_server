

// image upload middle ware
import dotenv from 'dotenv'
dotenv.config()

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from "cloudinary";



const storage = multer.diskStorage({});
const upload = multer({ storage }); 


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRE,
  });



const fileUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            next()
          }
          const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: "skailama",
          });
 
          req.image = uploadedImage.secure_url;
    next()

    } catch (error) {
        console.error("Error removing file from Cloudinary:", error);
    }
}

export { fileUpload, upload }