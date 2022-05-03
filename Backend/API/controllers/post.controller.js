const PostModel = require('../models/post.model')


class PostController {
    static Index = (req, res) => {
        return res.json({
            'isError': false,
            'message': 'Đây là route của các api liên quan đến chức năng bài viết!'
        });
    }

    static CreatePost = (req, res) => {
        let createdUser
    }
}


module.exports = PostController;