const mongoose = require('mongoose');

const MenuDetailsSchema = new mongoose.Schema({
    itemName: {
        type: String,
        trim: true
    },

    halfPlatePrice: {
        type: Number
    },

    fullPlatePrice: {
        type: Number
    },

    category: {
        type: String
    }
});

const MenuDetails = mongoose.model('menu-details', MenuDetailsSchema);

module.exports = MenuDetails;