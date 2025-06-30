
import fileModel from '../../models/fileModel.js';
import { Router } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';


const UpdateFile = Router();

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

UpdateFile.put('/:id', upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            author: req.body.author,
            category: req.body.category,
        }
        if(req.file){
            const filePath = req.file.path;
            const response = await cloudinary.v2.uploader.upload(filePath,{
                resource_type:'auto'
            });
            console.log(response.secure_url);
            fs.removeSync(filePath); 
            updateData.fileUrl = response.secure_url;
            updateData.fileType = response.resource_type;
        }
      
        const uploadData = await fileModel.findByIdAndUpdate(id, updateData, {new : true})
        res.status(200).send({ message: 'Updated successfully', uploadData });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: 'Server error occurred' });
    }
});

export default UpdateFile;

