const PostModel = require('../models/post.model')
const UserModel = require('../models/user.model');


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
            postTitle = req.body.postTitle,
            category = req.body.category,
            image = req.body.image,
            place = req.body.place,
            rate = req.body.rate;

        let post = await new PostModel({
            createdUser,
            postContent,
            postTitle,
            category,
            image,
            place,
            rate,
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

    static GetAllPost = async (req, res) => {
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

    static Get10Posts = async (req, res) => {
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
        await PostModel.find({})
            .then(doc => {
                return res.json({
                    'isError': false,
                    'data': random(doc).slice(0, 10)
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

    static GetDetailPost = (req, res) => {
        try{
            let id = req.body.id
            let data = {}
            let place = {}
            let countLike = {countLike: ""}
            let countComment = {countComment: ""}
            let comment = []
            PostModel.findOne({_id: id}, (err, post) => {
                countLike.countLike = post.like.length;
                countComment.countComment = post.comment.length;
                data = post
                place = post.place
                var temp = {
                    commentContent: "",
                    date: "",
                    fullName: "",
                    image: "",
                }
                post.comment.forEach((cmt) => {
                    //console.log(cmt.createdUser)
                    temp.commentContent = cmt.commentContent
                    temp.date = cmt.createdDate
                    UserModel.findOne({_id: cmt.createdUser}, (err, users) => {
                        temp.fullName = users.fullName
                        temp.image = users.image
                    })
                    comment.push(temp)
                })
                return res.json({
                    "isError": false,
                    "data": data,
                    "place": place,
                    "countComment": countComment,
                    "countLike": countLike,
                    "comment": comment
                });
            })
        } catch (e) {
            return res.status(400).json({
                "isError": true,
                "message": e.message
            });
        }
    }

    static LikeThePost = async (req, res) => {
        let postId = req.body._id,
            likedUser = req.body.createdUser;

        if (!postId || !likedUser)
            return res.status(400).json({
                'isError': true,
                'message': 'Params truyền vào bị thiếu, vui lòng kiểm tra lại'
            });

        await PostModel.findOne({ _id: postId })
            .then(doc => {
                if (!doc) {
                    return res.status(400).json({
                        'isError': true,
                        'message': 'Không tìm thấy bài viết!'
                    });
                }

                if (!doc.like.find(e => e.createdUser == likedUser)) {
                    doc.like.addToSet({ createdUser: likedUser });
                    doc.save();
                }

                return res.status(200).json({
                    'isError': false,
                    'message': 'Đã thích bài viết thành công!'
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

    static CommentThePost = async (req, res) => {
        let postId = req.body._id,
            commentUser = req.body.createdUser,
            commentContent = req.body.content;

        if (!postId || !commentUser || !commentContent)
            return res.status(400).json({
                'isError': true,
                'message': 'Params truyền vào bị thiếu, vui lòng kiểm tra lại'
            });

        await PostModel.findOne({ _id: postId })
            .then(doc => {
                if (!doc) {
                    return res.status(400).json({
                        'isError': true,
                        'message': 'Không tìm thấy bài viết!'
                    });
                }

                doc.comment.addToSet({ createdUser: commentUser, commentContent: commentContent });
                doc.save();

                return res.status(200).json({
                    'isError': false,
                    'message': 'Đã bình luận bài viết thành công!'
                });
            })
            .catch(error => {
                return res.status(400).json({
                    'isError': true,
                    'message': 'Đã xảy ra lỗi khi bình luận bài viết, vui lòng kiểm tra lại',
                    'messageDetail': error
                });
            });
    }
}


module.exports = PostController;