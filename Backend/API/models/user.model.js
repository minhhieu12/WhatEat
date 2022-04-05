const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchemaModel = new Schema({
    fullName: {type: String, default: ''},
    email: {type: String, default: ''},
    userName: {type: String, default: ''},
    passWord: {type: String},
    accessToken: {type: String},
    refreshToken: {type: String}
});

UserSchemaModel.methods.generateHash= (passWord) => {
    return bcrypt.hashSync(passWord, bcrypt.genSaltSync(8), null);
}

UserSchemaModel.methods.validPassword = (passWord) => {
    return bcrypt.compareSync(passWord, this.passWord);
}

module.exports = mongoose.model('users', UserSchemaModel);