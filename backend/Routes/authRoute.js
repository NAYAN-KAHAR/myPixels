
import { Router } from 'express'
import getUser from '../controllers/authControllers/getUser.js';
import createUser from '../controllers/authControllers/createUser.js';
import loginUser from '../controllers/authControllers/login.js';
import deleteUser from '../controllers/authControllers/deleteUser.js';
import logoutUser from  '../controllers/authControllers/logout.js';
import forgetPassword from  '../controllers/authControllers/forgetPass.js';
import verifyOtp from  '../controllers/authControllers/verifyOtp.js';
import updatePassword from  '../controllers/authControllers/update.js';


const router = Router();


router.get('/',  getUser);
router.post('/', createUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);
router.post('/logout', logoutUser);

router.post('/forget/password', forgetPassword);
router.post('/otp/verify', verifyOtp);
router.put('/new/password', updatePassword);

export default router;