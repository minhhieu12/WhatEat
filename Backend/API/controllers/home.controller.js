const UserModel = require('../models/user.model');
const PlacesModel = require('../models/places.model')
const bcrypt = require("bcrypt");
const authMethod = require('../config/auth.methods');
const randToken = require('rand-token');
const jwtVariable = require('../config/jwt');
require('dotenv').config();

class HomeController  {
    static async index(req, res) {
        res.json({
            'message': 'API Code By Hieuuu!'
        });
    }

    static register(req, res) {
        try {
            let fullName = req.body.fullName,
                email = req.body.email,
                userName = req.body.userName,
                passWord = req.body.passWord;

            if(!fullName || !email || !passWord || !userName){
                return res.status(400).json({
                    "isError": true,
                    "message": "Các trường không được trống!"
                });
            }

            UserModel.find({userName: userName}, (err, doc) => {
                if (doc.length) {
                    return res.status(400).json({
                        "isError": true,
                        "message": "Tài khoản đã tồn tại!"
                    });
                }
                else {
                    let user = new UserModel();
                    user.fullName = fullName;
                    user.email = email;
                    user.userName = userName;
                    user.passWord = user.generateHash(passWord);
                    user.save();
                    return res.json({
                        "isError": false,
                        "message": "Đã tạo tài khoản thành công!"
                    });
                }
            });


        }
        catch (error) {
            return res.status(400).json({
                "isError": true,
                "message": error.message
            });
        }
    }

    static async login(req, res){
        try {
            let email = req.body.email,
                passWord = req.body.passWord;

            if (!email || !passWord) {
                return res.status(400).json({
                    "isError": true,
                    "message": "Các trường không được bỏ trống!"
                });
            }

            // lấy config key
            let accessTokenLife = process.env.ACCESS_TOKEN_LIFE,
                accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

            console.log(accessTokenLife, accessTokenSecret);

            UserModel.findOne({email: email}, async (err, user) => {
                if (!user) {
                    return res.status(400).json({
                        "isError": true,
                        "message": "Tài khoản không tồn tại!"
                    });
                }

                if (!bcrypt.compareSync(passWord, user.passWord)) {
                    return res.status(200).json({
                        "isError": true,
                        "message": "Mật khẩu không chính xác!"
                    });
                }

                let dataForAccessToken = {
                    email: user.email,
                };
                let accessToken = await authMethod.generateToken(
                    dataForAccessToken,
                    accessTokenSecret,
                    accessTokenLife,
                );

                if (!accessToken) {
                    return res.status(401).json({
                        "isError": true,
                        "message": "Đăng nhập không thành công, vui lòng thử lại!"
                    });
                }

                let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
                user.refreshToken = refreshToken;
                user.save();

                return res.json({
                    "isError": false,
                    "email": email,
                    "message": "Đăng nhập thành công!",
                    "accessToken": accessToken,
                    "refreshToken": refreshToken
                });
            });
        }
        catch (error) {
            return res.status(400).json({
                "isError": true,
                "message": error.message
            });
        }
    }



    static getText(req, res) {
        return res.json({
            "isError": false,
            "message": "hihi!",
        })
    }

    static GetPlaces(req, res) {
        try {
            var data = [];
            PlacesModel.find({}, (err, places) => {
                places.forEach((place) => {
                    place.quanAn.forEach((quan) => {
                        // console.log(quan.name)
                        data.push({
                            'name': quan.name,
                            'latitude': quan.latitude,
                            'longitude': quan.longitude,
                            'image': quan.image,
                        });
                        console.log('hihi', data);
                    });
                });
                return res.json({
                    "isError": false,
                    "data": data
                });
            });

        }
        catch (error) {
            return res.status(400).json({
                "isError": true,
                "message": error.message
            });
        }
    }
}

module.exports = HomeController;