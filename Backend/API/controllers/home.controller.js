const UserModel = require('../models/user.model');
const bcrypt = require("bcrypt");

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
    static login(req, res){
        try {
            let email = req.body.email,
                passWord = req.body.passWord;

            if (!email || !passWord) {
                return res.status(400).json({
                    "isError": true,
                    "message": "Các trường không được bỏ trống!"
                });
            }

            UserModel.findOne({email: email}, (err, user) => {
                if (!user) {
                    return res.status(400).json({
                        "isError": true,
                        "message": "Tài khoản không tồn tại!"
                    });
                }
                else {
                    if (bcrypt.compareSync(passWord, user.passWord)) {
                        return res.status(200).json({
                            "isError": false,
                            "message": "Đăng nhập thành công!"
                        });
                    } else {
                        return res.status(400).json({
                            "isError": true,
                            "message": "Mật khẩu không chính xác!"
                        });
                    }

                }
            })
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