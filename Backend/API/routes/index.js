const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const HomeController = require('../controllers/home.controller');

router
    .get('/', HomeController.index)
    .post('/register', HomeController.register)
    .post('/login', HomeController.login)
    .post('/getText', authController.isAuth, HomeController.getText)

module.exports = router;
