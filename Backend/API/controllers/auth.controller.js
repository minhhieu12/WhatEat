const authMethod = require('../config/auth.methods');
require('dotenv').config();

exports.IsAuth = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers['author'];
    if (!accessTokenFromHeader) {
        return res.status(401).json({
            "isError": true,
            "message": "Không tìm thấy Token!",
        });
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await authMethod.verifyToken(
        accessTokenFromHeader,
        accessTokenSecret,
    );
    if (!verified) {
        return res
            .status(401)
            .json({
                'isError': true,
                'message': "Không được truy cập!"
            });
    }

    return next();
};