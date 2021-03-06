const UserModel = require('../models/user.model');
const PlacesModel = require('../models/places.model')
const PostModel = require('../models/post.model')
const FollowModel = require('../models/follow.model');
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
                            'id': quan._id,
                            'name': quan.name,
                            'latitude': quan.latitude,
                            'longitude': quan.longitude,
                            'image': quan.image,
                        });
                        //console.log('hihi', data);
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
            let temp2 = [];
            function random(array){
                let i = array.length - 1;
                for (; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    const temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
                return array;
            }
            PlacesModel.find({}, (err, places) => {
                places.forEach((place) => {
                    place.quanAn.forEach((quan) => {
                        data.push({
                            '_id': quan._id,
                            'name': quan.name,
                            'address': quan.address,
                            'phone': quan.phone,
                            'image': quan.image,
                            'rate': quan.rate
                        });
                        //console.log('hihi', data);
                    });
                });
                return res.json({
                    "isError": false,
                    "data": random(data).slice(0, 10)
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
            let data = {
                profileId: '',
                fullName: '',
                userName: '',
                email: '',
                bio: '',
                image: '',
                countPost: 0
            }
            UserModel.findOne({_id: id}, (err, users) => {
                    data.profileId = users._id,
                    data.fullName = users.fullName,
                    data.userName = users.userName,
                    data.bio = users.bio,
                    data.image = users.image,
                    data.email = users.email
                PostModel.find({createdUser: id}, (err, posts) => {
                    var count = 0
                    posts.forEach((post) => {
                        count ++
                        data.countPost = count
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

    static GetPlaceDetail(req, res){
        try{
            let id = req.body.id
            let data = {
                id: '',
                name: '',
                address: '',
                phone: '',
                rate: '',
                image: [],
                menu: []
            }
            PlacesModel.find({}, (err, places) => {
                places.forEach((place) => {
                    place.quanAn.forEach((quan) => {
                        if(quan._id.toString() === id){
                            data.id = quan._id.toString(),
                            data.name = quan.name,
                            data.address = quan.address,
                            data.phone = quan.phone,
                            data.rate = quan.rate,
                            data.image.push(quan.image)
                            quan.menu.forEach((img) => {
                                data.image.push(img.img)
                            })
                            data.menu = quan.menu
                        }
                    })
                })
                return res.json({
                    "isError": false,
                    "data": data,
                });
            })
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
            PostModel.find({createdUser: id}, (err, posts) => {
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

    static GetUserStoredPost(req, res){
        try{
            let id = req.body.id
            let data = []
            PostModel.find({}, (err, posts) => {
                posts.forEach((post) => {
                    post.store.forEach((store) => {
                        if(store.createdUser == id){
                            data.push(post)
                        }
                    })
                })
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
                        //console.log(item)
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

    static GetUser(req, res){
        try{
            let data = [];
            UserModel.find({}, (err, users) => {
                users.forEach((user) => {
                    data.push(user)
                })
                return res.json({
                    "isError": false,
                    "data": data,
                });
            })
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static SearchUser(req, res){
        try{
            let input = req.body.input;
            let dataUsers = [];
            UserModel.find({}, (err, users) => {
                users.forEach((user) => {
                    if (user.fullName.toLowerCase().indexOf(input.toLowerCase()) > -1 || user.userName.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                        dataUsers.push(user);
                    }
                })
                return res.json({
                    "isError": false,
                    "dataUser": dataUsers
                });
            });
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static SearchPost(req, res){
        try{
            let input = req.body.input;
            let dataPosts = [];
            PostModel.find({}, (err, posts) => {
                posts.forEach((post) => {
                    if (post.postTitle.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                        dataPosts.push(post);
                    }
                })
                return res.json({
                    "isError": false,
                    "dataPost": dataPosts
                });
            });
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static GetFollowing(req, res){
        try{
            let id = req.body.id
            let dataFollowing = {
                countFollowing: 0,
                followings: []
            }
            FollowModel.find({createdUser: id}, (err, followers) => {
                var count = 0;
                followers.forEach((follower) => {
                    count++;
                    dataFollowing.countFollowing = count;
                    dataFollowing.followings.push(follower.followedUser);
                })
                return res.json({
                    "isError": false,
                    "data": dataFollowing
                });
            })
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static GetFollower(req, res){
        try{
            let id = req.body.id
            let dataFollower = {
                countFollower: 0,
                followers: []
            }
            FollowModel.find({followedUser: id}, (err, followers) => {
                var count = 0;
                followers.forEach((follower) => {
                    count++;
                    dataFollower.countFollower = count;
                    dataFollower.followers.push(follower.createdUser);
                })
                return res.json({
                    "isError": false,
                    "data": dataFollower
                });
            })
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static UpdatePlacesRate(req, res){
        try{
            let id = req.body.id
            var average = 0
            PostModel.find({}, (err, posts) => {
                var sumRate = 0;
                var sumPost = 0;
                posts.forEach((post) => {
                    if(post.place.placeId == id){
                        sumRate += post.rate
                        sumPost++
                    }
                })
                average = sumRate/sumPost
                PlacesModel.find({}, (err, places) => {
                    places.forEach((place) => {
                        place.quanAn.findOne({_id: id})
                            .then(doc => {
                                if (!doc) {
                                    return res.status(400).json({
                                        'isError': true,
                                        'message': 'Không tìm thấy bài viết!'
                                    });
                                } else {
                                    doc.rate = average
                                    doc.save()
                                }
                            })
                    })
                })
                return res.json({
                    "isError": false,
                    "average": average,
                    "message": "Cập nhật thành công"
                });
            })
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static EditProfile = async(req, res) => {
        let userId = req.body.id,
            fullName = req.body.fullName,
            username = req.body.userName,
            email = req.body.email,
            image = req.body.image,
            bio = req.body.bio;

        await UserModel.findOne({ _id: userId })
            .then(doc => {
                if (!doc) {
                    return res.status(400).json({
                        'isError': true,
                        'message': 'Không tìm thấy người dùng!'
                    });
                } else if (!fullName || !username || !email) {
                    return res.status(400).json({
                        "isError": true,
                        "message": "Họ và tên, Tên tài khoản và Email không được bỏ trống!"
                    });
                } else {
                    doc.fullName = fullName
                    doc.userName = username
                    doc.email = email
                    doc.image = image
                    doc.bio = bio
                    doc.save()
                    return res.status(200).json({
                        'isError': false,
                        'message': 'Đã cập nhật tài khoản thành công!'
                    });
                }
            })
            .catch(error => {
                return res.status(400).json({
                    'isError': true,
                    'message': 'Đã xảy ra lỗi khi lưu bài viết, vui lòng kiểm tra lại',
                    'messageDetail': error
                });
            });
    }

    static ChangePassword(req, res){
        try{
            let userId = req.body.id,
                oldPassword = req.body.oldPassword,
                newPassword = req.body.newPassword,
                rePassword = req.body.rePassword

            UserModel.findOne({_id: userId}, (err, user) => {
                if(!user){
                    return res.status(400).json({
                        "isError": true,
                        "message": "Không tìm thấy tài khoản!"
                    });
                }

                if(!oldPassword || !newPassword || !rePassword){
                    return res.status(200).json({
                        "isError": true,
                        "message": "Tất cả các trường không được trống!"
                    });
                }

                if (!bcrypt.compareSync(oldPassword, user.passWord)) {
                    return res.status(200).json({
                        "isError": true,
                        "message": "Mật khẩu cũ không chính xác!"
                    });
                }
                if(rePassword != newPassword){
                    return res.status(200).json({
                        "isError": true,
                        "message": "Mật khẩu nhập lại không chính xác!"
                    });
                } else {
                    user.passWord = user.generateHash(newPassword);
                    user.save()
                    return res.status(200).json({
                        'isError': false,
                        'message': 'Đã cập nhật mật khẩu thành công!'
                    });
                }
            })
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }
}

module.exports = HomeController;