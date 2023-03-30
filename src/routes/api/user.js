const express = require('express');
const { userController: controller } = require('../../controllers');

// import mdlw from 'middlewares/users.validation';
// import { authMiddleware } from 'middlewares/auth';

const authRouter = express.Router();

authRouter.post('/register', mdlw.auth, controller.register);
authRouter.post('/login', mdlw.auth, controller.login);
authRouter.post('/logout', authMiddleware, controller.logout);
authRouter.get('/current', authMiddleware, controller.currentUser);
// authRouter.get('/verify/:verificationToken', ctrl.verify);
// authRouter.post('/verify', mdlw.email, ctrl.sendVerifyMail);

module.exports = authRouter;
