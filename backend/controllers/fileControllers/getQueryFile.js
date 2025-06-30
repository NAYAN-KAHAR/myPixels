

import fileModel from '../../models/fileModel.js';
import { Router } from 'express';


const getQueryFile = Router();


getQueryFile.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        const limit = parseInt(req.query.limit) || 10; //  query params in the URL are always strings by default 
        const skip =  parseInt(req.query.skip)  || 0;

        const data = await fileModel.find({ category: query }).skip(skip).limit(limit)
        const totalImages = await fileModel.countDocuments({ category: query });
        const hasMore = skip + limit < totalImages; // Determine if there are more images to load
        // console.log(query, totalImages)
        res.status(200).send({ data, hasMore });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: 'Server error occurred' });
    }
});

export default getQueryFile;



