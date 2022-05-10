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
        '/Get10Posts',
        AuthController.IsAuth,
        PostController.Get10Posts
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
    .post (
        '/GetDetailPost',
        AuthController.IsAuth,
        PostController.GetDetailPost
    )
    .post (
        '/GetAllPost',
        AuthController.IsAuth,
        PostController.GetAllPost
    )

module.exports = router;