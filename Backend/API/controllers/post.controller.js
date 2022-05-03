const PostModel = require('../models/post.model')


class PostController {
    static Index = (req, res) => {
        return res.json({
            'isError': false,
            'message': 'Đây là route của các api liên quan đến chức năng bài viết!'
        });
    }

    static CreatePost = async (req, res) => {
        let createdUser = req.body.createdUser,
            postContent = req.body.postContent,
            category = req.body.category,
            image = req.body.image;

        let post = await new PostModel({
            createdUser,
            postContent,
            category,
            image
        });

        await post.save()
            .then(doc => {
                return res.json({
                    'isError': false,
                    'message': 'Đăng bài thành công!'
                });
            })
            .catch(error => {
                return res.status(400).json({
                    'isError': true,
                    'message': 'Đã xảy ra lỗi khi đăng bài, vui lòng kiểm tra lại!',
                    'messageDetail': error
                });
            });
    }

    static GetAllPosts = async (req, res) => {
        await PostModel.find({})
            .then(doc => {
                return res.json({
                    'isError': false,
                    'data': doc
                })
            })
            .catch(error => {
                return res.status(400).json({
                    'isError': true,
                    'message': 'Đã xảy ra lỗi khi lấy tất cả bài viết',
                    'messageDetail': error
                });
            });
    }
}


module.exports = PostController;