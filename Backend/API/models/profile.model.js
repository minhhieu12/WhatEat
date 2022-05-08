const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchemaModel = new Schema({
    profileId: {type: String},
    userName: {type: String, default: ''},
    bio: {type: String},
    image: {type: String, default: 'https://firebasestorage.googleapis.com/v0/b/whateat-83348.appspot.com/o/logo.png?alt=media&token=93a2c10a-5fb6-4bdd-9de5-724b014d9a39'},
    post: [
        {
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
            ],
            place: {
                placeId: {type: String},
                placeName: {type: String},
                placeAddress: {type: String}
            }
        }
    ]
});

module.exports = mongoose.model('profile', ProfileSchemaModel);