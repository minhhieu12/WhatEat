const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const HomeController = require('../controllers/home.controller');

router
    .get('/', HomeController.index)
    .post('/register', HomeController.register)
    .post('/login', HomeController.login)
    .post('/getText', authController.IsAuth, HomeController.getText)
    .get('/GetPlacesMap', HomeController.GetPlacesMap)
    .get('/GetPlacesToPick', HomeController.GetPlacesToPick)
    .post('/GetProfile', authController.IsAuth, HomeController.GetProfile)
    .post('/searchPlacePick', authController.IsAuth, HomeController.searchPlacePick)
    .post('/GetUserPost', authController.IsAuth, HomeController.GetUserPost)

module.exports = router;
