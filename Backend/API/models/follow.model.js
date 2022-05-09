const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchemaModel = new Schema({
    createdUser: Schema.Types.ObjectId,
    followedUser: Schema.Types.ObjectId,
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('follows', FollowSchemaModel);