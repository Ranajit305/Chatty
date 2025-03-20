import express from 'express'
import { editProfile, login, logout, profile, signup } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile', verifyToken, profile);
router.post('/profile', verifyToken, editProfile);

export default router