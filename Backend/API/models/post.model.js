const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchemaModel = new Schema({
    createdUser: Schema.Types.ObjectId,
    createdDate: { type: Date, default: Date.now },
    postContent: String,
    rate: { type: Number, default: 0 },
    category: String,
    image: [ String ],
    comment: [
        {
            createdUser: Schema.Types.ObjectId,
            createdDate: { type: Date, default: Date.now },
            commentContent: String
        }
    ],
    like: [
        {
            createdUser: Schema.Types.ObjectId,
            createdDate: { type: Date, default: Date.now }
        }
    ]
});


module.exports = mongoose.model('post', PostSchemaModel);