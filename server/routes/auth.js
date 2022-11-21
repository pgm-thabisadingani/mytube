import express from 'express';
import { googleAuth, signin, signup } from '../controllers/auth.js';

const router = express.Router();

/**
 * Resquest we want to make
 * post we ar sent an infomation
 * ("/path", controller)
 *  */

//CREATE A USER (path and controller)
router.post('/signup', signup);

//SIGN IN
router.post('/signin', signin);

//GOOGLE AUTH
router.post('/google', googleAuth);

export default router;
