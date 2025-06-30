

import fileModel from '../../models/fileModel.js';
import { Router } from 'express';


const deleteFile = Router();


deleteFile.delete('/:id', async (req, res) => {
    try {
         const {id} = req.params
         await fileModel.findByIdAndDelete(id);
         res.status(200).send({message:"image deleted sucessfully"});

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: 'Server error occurred' });
    }
});

export default deleteFile;
