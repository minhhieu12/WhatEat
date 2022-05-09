const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/follow.controller');
const AuthController = require('../controllers/auth.controller');

router
    .get(
        '/',
        AuthController.IsAuth,
        FollowController.Index
    )
    .post(
        '/Follow',
        AuthController.IsAuth,
        FollowController.Follow
    )
    .post(
        '/UnFollow',
        AuthController.IsAuth,
        FollowController.UnFollow
    )

module.exports = router;