const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const AuthController = require('../controllers/auth.controller');


router
    .get (
        '/',
        PostController.Index
    )
    .post (
        '/CreatePost',
        AuthController.IsAuth,
        PostController.CreatePost
    )


module.exports = router;