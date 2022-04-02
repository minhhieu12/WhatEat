const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/home.controller');

router
    .get('/', HomeController.index)
    .post('/register', HomeController.register)
    .post('/login', HomeController.login)

module.exports = router;
