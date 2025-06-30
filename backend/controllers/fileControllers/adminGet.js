import fileModel from '../../models/fileModel.js';
import { Router } from 'express';
import authenticateUser from '../../middleware/token.js';

const adminGet = Router();

adminGet.get('/admin', authenticateUser, async (req, res) => {
    try {
         // user-specific data handling.
         // Only fetch images belonging to the logged-in user
        const data = await fileModel.find({userId: req.user.id})     
        res.status(200).send({ data, message: 'Welcome to the admin dashboard', user: req.user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ error: 'Server error occurred' });
    }
});

export default adminGet;


   
    //  const data = await fileModel.find({ userId: req.user.id });
    //  res.status(200).send({ data, message: 'Welcome to the admin dashboard', user: req.user });
