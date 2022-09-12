const mongoose = require('mongoose');

const DrawerDetailsSchema = new mongoose.Schema({
    drawerName: {
        type: String,
        required: true,
        trim: true
    },
    drawerPhone: {
        type: Number,
        required: true,
        trim: true
    },
    drawerEmail: {
        type: String,
        required: true,
        trim: true
    },
    drawerAddress: {
        type: String,
        required: true,
        trim: true
    },
    drawerCity: {
        type: String,
        required: true,
        trim: true
    },
    drawerState: {
        type: String,
        required: true,
        trim: true
    },
})

const DrawerDetails = mongoose.model('drawer-details', DrawerDetailsSchema);

module.exports = DrawerDetails;