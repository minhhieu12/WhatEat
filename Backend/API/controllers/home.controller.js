const UserModel = require('../models/user.model');
const PlacesModel = require('../models/places.model')
const PostModel = require('../models/post.model')
const bcrypt = require("bcrypt");
const authMethod = require('../config/auth.methods');
const randToken = require('rand-token');
const jwtVariable = require('../config/jwt');
const {load} = require("debug");
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
                passWord = req.body.passWord,
                gender = req.body.gender,
                birthday = req.body.birthday,
                image = req.body.image,
                bio = req.bio
                //rePassword = req.body.rePassword;
            /*
            if(!fullName || !email || !passWord || !userName || !gender || !birthday || !rePassword){
                return res.status(400).json({
                    "isError": true,
                    "message": "Các trường không được trống!"
                });
            }

            if (passWord != rePassword) {
                return res.status(400).json({
                    "isError": true,
                    "message": "Mật khẩu nhập lại không khớp!"
                });
            }

             */

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
                    user.gender = gender;
                    user.birthday = birthday;
                    user.image = image;
                    user.bio = bio;
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
                    "id": user._id,
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

    static GetPlacesMap(req, res) {
        try {
            let data = [];
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

    static GetPlacesToPick(req, res){
        try {
            let data = [];
            PlacesModel.find({}, (err, places) => {
                places.forEach((place) => {
                    place.quanAn.forEach((quan) => {
                        data.push({
                            '_id': quan._id,
                            'name': quan.name,
                            'address': quan.address,
                            'phone': quan.phone,
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
        } catch (error) {
            return res.status(400).json({
                "isError": true,
                "message": error.message
            });
        }
    }

    static GetProfile(req, res){
        try{
            let id = req.body.id
            let data = {}
            UserModel.findOne({_id: id}, (err, users) => {
                data = {
                    'profileId': users._id,
                    'fullName': users.fullName,
                    'userName': users.userName,
                    'bio': users.bio,
                    'image': users.image
                }
                let countPost = {countPost: ''}
                PostModel.find({createUser: id}, (err, posts) => {
                    var count = 0
                    posts.forEach((post) => {
                        count ++
                        countPost.countPost = count
                        Object.assign(data, countPost)
                    });
                    return res.json({
                        "isError": false,
                        "data": data,
                    });
                });
            });

        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static GetUserPost(req, res){
        try{
            let id = req.body.id
            let data = []
            PostModel.find({createUser: id}, (err, posts) => {
                posts.forEach((post) => {
                    data.push(post)
                });
                return res.json({
                    "isError": false,
                    "data": data,
                });
            });
        }catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static searchPlacePick(req, res){
        try{
            let input = req.body.input;
            let data = [];
            PlacesModel.find({}, (err, places) => {
                places.forEach((place) => {
                    // place.quanAn.find({name: { $regex: '.*' + input + '.*' }}, (err, quan) => {
                    //     data.push(data)
                    // })
                    // place.quanAn.find(e => e.name.indexOf(input) > -1);
                    place.quanAn.forEach(item => {
                        console.log(item)
                        if (item.name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                            data.push(item);
                        }
                    })
                });
                return res.json({
                    "isError": false,
                    "data": data,
                });
            });
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }
}

module.exports = HomeController;