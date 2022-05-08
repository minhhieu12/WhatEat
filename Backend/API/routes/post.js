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
    .post (
        '/GetAllPosts',
        AuthController.IsAuth,
        PostController.GetAllPosts
    )
    .post (
        '/LikeThePost',
        AuthController.IsAuth,
        PostController.LikeThePost
    )
    .post (
        '/CommentThePost',
        AuthController.IsAuth,
        PostController.CommentThePost
    )

module.exports = router;