const mongoose = require('mongoose');

const CustomerDetailsSchema = new mongoose.Schema({
    customerName: {
        type: String,
        trim: true
    },
    customerEmail: {
        type: String,
        trim: true
    },
    customerPhone: {
        type: Number,
        trim: true
    },
    drawerName: {
        type: String,
        trim: true
    },
    drawerPhone: {
        type: Number,
    },
    total: {
        type: Number,
    },
    grandtotal: {
        type: Number,
    }
});

const CustomerDetails = mongoose.model('customer-details', CustomerDetailsSchema);

module.exports = CustomerDetails;