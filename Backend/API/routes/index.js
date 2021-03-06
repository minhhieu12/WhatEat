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
    .post('/GetPlaceDetail', authController.IsAuth, HomeController.GetPlaceDetail)
    .post('/GetUser',authController.IsAuth, HomeController.GetUser)
    .post('/SearchUser',authController.IsAuth, HomeController.SearchUser)
    .post('/SearchPost',authController.IsAuth, HomeController.SearchPost)
    .post('/GetFollower',authController.IsAuth, HomeController.GetFollower)
    .post('/GetFollowing',authController.IsAuth, HomeController.GetFollowing)
    .post('/GetUserStoredPost',authController.IsAuth, HomeController.GetUserStoredPost)
    .post('/UpdatePlacesRate',authController.IsAuth, HomeController.UpdatePlacesRate)
    .post('/EditProfile',authController.IsAuth, HomeController.EditProfile)
    .post('/ChangePassword',authController.IsAuth, HomeController.ChangePassword)

module.exports = router;
