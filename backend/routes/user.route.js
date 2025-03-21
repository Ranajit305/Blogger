import express from 'express'
import { checkUser, login, logout, searchUser, signup, subscribeOrUnsubscribe, updateProfile, userAccount } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/updateProfile', verifyToken, updateProfile);
router.get('/check', verifyToken, checkUser);
router.get('/search/:name', verifyToken, searchUser);
router.get('/:userId', verifyToken, userAccount);
router.post('/:userId', verifyToken, subscribeOrUnsubscribe);

export default router