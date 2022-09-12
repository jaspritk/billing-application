const mongoose = require('mongoose');

const BillDetailsSchema = new mongoose.Schema({
    _customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    foodItem: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        trim: true
    },
    plateType: {
        type: String
    },
    pricePerPlate: {
        type: Number,
    },
    subtotal: {
        type: Number,
    },
    date: {
        // type: Date
    },
    time: {
        // type: Date
    }
});

const BillDetails = mongoose.model('bill-details', BillDetailsSchema);

module.exports = BillDetails;