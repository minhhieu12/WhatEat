const ChatModel = require('../models/chat.model');
const PostModel = require("../models/post.model");


class ChatController {
    static Index = (req, res) => {
        return res.json({
            'isError': false,
            'message': 'Đây là route của các api liên quan đến chức năng nhắn tin!'
        });
    }

    static NewMessage = async (req, res) => {
        let sid = req.body.sid,
            rid = req.body.rid,
            message = req.body.message;

        if (sid === "" || rid === "" | message === "") {
            return res.status(403).json({
                'isError': true,
                'message': 'Yêu cầu gửi lên không đúng định dạng !',
            });
        }

        let model = await new ChatModel({
            sid: sid,
            rid: rid,
            message: message
        });

        await model.save()
            .then(doc => {
                return res.json({
                    'isError': false,
                    'message': 'OK'
                });
            })
            .catch(error => {
                return res.status(400).json({
                    'isError': true,
                    'message': 'Đã xảy ra lỗi khi tạo tin nhắn, vui lòng kiểm tra lại!',
                    'messageDetail': error
                });
            });
    }

    static GetMessages = async (req, res) => {
        let userId = req.body.userId,
            anotherUserId = req.body.anotherUserId;

        if (!userId)
            return res.status(403).json({
                'isError': true,
                'message': 'Params truyền vào bị thiếu, vui lòng kiểm tra lại'
            });

        await ChatModel.find({ sid: userId, rid: anotherUserId })
            .then(docs => {
                if (!docs) {
                    return res.status(400).json({
                        'isError': true,
                        'message': 'Không tìm thấy bài viết!'
                    });
                }

                return res.status(200).json({
                    'isError': false,
                    'data': docs
                });
            })
            .catch(error => {
                return res.status(400).json({
                    'isError': true,
                    'message': 'Đã xảy ra lỗi khi thích bài viết, vui lòng kiểm tra lại',
                    'messageDetail': error
                });
            });
    }
}


module.exports = ChatController;
