const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlacesSchemaModel = new Schema({
    name: {type: String},
    slug: {type: String},
    type: {type: String},
    nameType: {type: String},
    quanAn: [
        {
            _id: Schema.Types.ObjectId,
            name: {type: String},
            address: {type: String},
            phone: {type: String},
            rate: {type: Number},
            latitude: {type: Number},
            longitude: {type: Number},
            image: {type: String},
            category: [],
            menu: [
                {
                    name: {type: String},
                    price: {type: String},
                    img: {type: String}
                }
            ]
        }
    ]
});

module.exports = mongoose.model('places', PlacesSchemaModel);