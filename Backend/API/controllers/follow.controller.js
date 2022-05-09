const FollowModel = require('../models/follow.model');

class FollowController {
    static Index = (req, res) => {
        return res.json({
            'isError': false,
            'message': 'Đây là route của các api liên quan đến chức năng theo dõi!'
        });
    }

    static Follow = async (req, res) => {
        let createdUser = req.body.createdUser,
            followedUser = req.body.followedUser;

        if (!createdUser || !followedUser) {
            return res.status(400).json({
                'isError': true,
                'message': 'Params truyền vào bị thiếu, vui lòng kiểm tra lại'
            });
        }
        let doc = await FollowModel.find({
            $and: [
                { followedUser: followedUser },
                { createdUser: createdUser }
            ]
        });
        if (Object.keys(doc).length) {
            return res.status(400).json({
                'isError': true,
                'message': 'Tài khoản này đã được theo dõi rồi!'
            });
        }
        else {
            let follow = new FollowModel({
                followedUser: followedUser,
                createdUser: createdUser
            });
            follow.save();
            return res.json({
                'isError': false,
                'message': 'Theo dõi tài khoản thành công!'
            });
        }
    }

    static UnFollow = async (req, res) => {
        let createdUser = req.body.createdUser,
            followedUser = req.body.followedUser;

        if (!createdUser || !followedUser) {
            return res.status(400).json({
                'isError': true,
                'message': 'Params truyền vào bị thiếu, vui lòng kiểm tra lại'
            });
        }

        let doc = await FollowModel.find({
            $and: [
                { followedUser: followedUser },
                { createdUser: createdUser }
            ]
        });
        if (!Object.keys(doc).length) {
            return res.status(400).json({
                'isError': true,
                'message': 'Tài khoản chưa được theo dõi!'
            });
        }
        else
            FollowModel.findOneAndDelete({ _id: doc[0]._id }, (doc, err) => {
                return res.json({
                    'isError': false,
                    'message': 'Bỏ theo dõi tài khoản thành công!'
                });
            });
    }
}

module.exports = FollowController;