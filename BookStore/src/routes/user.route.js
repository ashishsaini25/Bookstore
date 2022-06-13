import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth,resetuserAuth } from '../middlewares/auth.middleware';

const router = express.Router();


router.get('', userController.getAllUsers);


router.post('', newUserValidator, userController.newUser);
router.post('/login', userController.login);
router.post('/forgetpassword',userController.forgetpassword);
router.post('/resetpassword',resetuserAuth,userController.resetpassword);

export default router;
