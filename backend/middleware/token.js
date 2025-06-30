
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateUser  = async (req, res, next) => {
    try {
        // console.log('authenticateUser', req.cookies)
        const token = req.cookies.token; // Get token from cookies
        if (!token) {
            return res.status(401).send({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.MY_SECRET); // Decode token
        req.user = decoded; // Store decoded data in the request
        // console.log('user-->', decoded)
        next();
    } catch (error) {
        return res.status(403).send({ message: 'Invalid or expired token' });
    }
};

export default authenticateUser ;
