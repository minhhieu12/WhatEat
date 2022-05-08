const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodsSchemaModel = new Schema({
    name: {type: String},
    tag: {type: String},
    image: [],
    description: {type: String}
});

module.exports = mongoose.model('foods', FoodsSchemaModel);