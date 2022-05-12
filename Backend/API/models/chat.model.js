const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchemaModel = new Schema({
    message: {type: String},
    sid: Schema.Types.ObjectId,
    rid: Schema.Types.ObjectId,
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('chat', ChatSchemaModel);
