import express from 'express';
import * as userControllers from '../controllers/user.js';

const router = express.Router();

// Route đăng ký người dùng
router.route('/register').post(userControllers.register);

// Route đăng nhập người dùng
router.route('/login').post(userControllers.login);

export default router;
