const express = require('express');
const passport = require('passport');
const { auth: controller } = require('../../controllers');
const { auth: middleware } = require('../../middlewares');

const authRouter = express.Router();

authRouter.post('/register', middleware.register, controller.register);
authRouter.post('/login', middleware.login, controller.login);
authRouter.post('/logout', middleware.auth, controller.logout);
authRouter.get('/current', middleware.auth, controller.current);
authRouter.post('/refresh', middleware.refresh, controller.refresh);
authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
authRouter.get('/google/callback', passport.authenticate('google', { session: false }), controller.google);

module.exports = authRouter;
