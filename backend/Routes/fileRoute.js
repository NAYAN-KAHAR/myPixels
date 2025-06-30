
import { Router } from 'express'
// import getUser from '../controllers/authControllers/getUser.js';
import UploadFile from '../controllers/fileControllers/uploadFile.js';
import getFile from '../controllers/fileControllers/getFile.js';
import deleteFile from '../controllers/fileControllers/deleteFile.js';
import UpdateFile from '../controllers/fileControllers/updateFile.js';
import getQueryFile from '../controllers/fileControllers/getQueryFile.js';
import adminGet from '../controllers/fileControllers/adminGet.js';

const router = Router();


router.use('/', UploadFile);
router.use('/', getFile);
router.use('/', deleteFile);
router.use('/', UpdateFile);
router.use('/', getQueryFile);
router.use('/', adminGet);

export default router;