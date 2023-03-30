const express = require('express');
const { user: controller } = require('../../controllers');
const { user: middleware, auth } = require('../../middlewares');

// import mdlw from 'middlewares/users.validation';
// import { authMiddleware } from 'middlewares/auth';

const authRouter = express.Router();

authRouter.post('/register', middleware.register, controller.register);
authRouter.post('/login', middleware.login, controller.login);
authRouter.post('/logout', auth, controller.logout);
authRouter.get('/current', auth, controller.currentUser);
// authRouter.get('/verify/:verificationToken', controller.verify);
// authRouter.post('/verify', mdlw.email, controller.sendVerifyMail);

module.exports = authRouter;
