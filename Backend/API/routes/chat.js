const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat.controller');
const AuthController = require('../controllers/auth.controller');


router
    .get(
        '/',
        ChatController.Index
    )
    .post(
        '/new-message',
        AuthController.IsAuth,
        ChatController.NewMessage
    )
    .get(
        '/get-messages',
        AuthController.IsAuth,
        ChatController.GetMessages
    )

module.exports = router;
