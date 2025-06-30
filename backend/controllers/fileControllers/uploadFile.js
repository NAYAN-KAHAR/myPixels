
import fileModel from '../../models/fileModel.js';
import { Router } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import authenticateUser from '../../middleware/token.js';

const UploadFile = Router();

// cloudinary config
cloudinary.config({
    cloud_name: 'dx0qmwrrz',
    api_key: '849214223577591',
    api_secret: '_sIKa0UtNClm2FkdLztVkykr6XU'
});

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload');  // Temp storage location
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);  // Unique filename based on timestamp
    }
});

const upload = multer({ storage });

UploadFile.post('/', authenticateUser, upload.single('file'), async (req, res) => {
  try {
        const filePath = req.file.path;
        if (req.file.size > 10 * 1024 * 1024) {
        fs.removeSync(filePath); // cleanup local file
        return res.status(400).json({ message: 'Large file is not allowed (max 10MB)' });
        };
        const response = await cloudinary.v2.uploader.upload(filePath, {
         resource_type: 'auto' //  Cloudinary can handle videos as well as images.
      });

      fs.removeSync(filePath);

      const userFile = {
        author: req.body.author,
        category: req.body.category,
        fileUrl: response.secure_url,
        fileType: response.resource_type,
        userId: req.user.id
     };

     const uploadData = await fileModel.create(userFile);
     res.status(200).send({ message: 'File uploaded and deleted successfully', uploadData });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({ error: 'Server error occurred' });
  }
});


export default UploadFile;
