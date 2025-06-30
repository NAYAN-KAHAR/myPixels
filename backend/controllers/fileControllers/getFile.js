import fileModel from '../../models/fileModel.js';
import { Router } from 'express';

const getFile = Router();

getFile.get('/', async (req, res) => {
    try {
        // Set default limit and skip values
        const limit = parseInt(req.query.limit) || 10; // Defaults to 10 if no limit is provided
        const skip = parseInt(req.query.skip)   || 0; // Defaults to 0 if no skip is provided

        // Fetch data with pagination
        const data = await fileModel.find()
            .skip(skip) // Skip the number of items
            .limit(limit); // Limit the number of items to the value in the query parameter

        // Check if there are more items to load
        const totalImages = await fileModel.countDocuments();
        const hasMore = skip + limit < totalImages; // Determine if there are more images to load
    //    console.log('totalImages',totalImages)
        res.status(200).send({ data, hasMore });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: 'Server error occurred' });
    }
});

export default getFile;
