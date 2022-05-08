const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchemaModel = new Schema({
    fullName: {type: String, default: ''},
    email: {type: String, default: ''},
    userName: {type: String, default: ''},
    gender: {type: Number, default: 0},
    birthday: {type: Date},
    passWord: {type: String},
    rePassword: {type: String},
    accessToken: {type: String},
    refreshToken: {type: String},
    bio: {type: String},
    image: {type: String, default: 'https://firebasestorage.googleapis.com/v0/b/whateat-83348.appspot.com/o/logo.png?alt=media&token=93a2c10a-5fb6-4bdd-9de5-724b014d9a39'}
});

UserSchemaModel.methods.generateHash= (passWord) => {
    return bcrypt.hashSync(passWord, bcrypt.genSaltSync(8), null);
}

UserSchemaModel.methods.validPassword = (passWord) => {
    return bcrypt.compareSync(passWord, this.passWord);
}

module.exports = mongoose.model('users', UserSchemaModel);