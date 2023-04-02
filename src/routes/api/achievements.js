const express = require('express');
const router = express.Router();

const { auth: authMiddleware } = require('../../middlewares');
const { achievements: controller } = require('../../controllers');

router.get('/', authMiddleware.auth, controller.get);

module.exports = router;
