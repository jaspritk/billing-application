const express = require('express');
const app = express();
const BillDetails = require('./../models/bill-details');
const moment = require('moment');

app.use(express.json());

getBillDetails = (req, res) => {
    BillDetails.find({ '_customerId': req.params.customerId })
        .then(billDetails => res.send(billDetails))
        .catch((error) => console.log(error))
}

postBillDetails = (req, res) => {
    const bill = new BillDetails({
        _customerId: req.params.customerId,
        foodItem: req.body.foodItem,
        quantity: req.body.quantity,
        plateType: req.body.plateType,
        pricePerPlate: req.body.pricePerPlate,
        subtotal: req.body.subtotal,
        date: moment().format('LL'),
        time: moment().format('LTS'),
    })
    bill
        .save()
        .then((billDetails) => {
            res.status(200).json({
                message: "Items added successfully!",
                created: billDetails
            })
        })
        .catch((error) => console.log(error))
}

getAllItems = (_, res) => {
    BillDetails.find({})
        .then(billDetails => res.send(billDetails))
        .catch((error) => console.log(error))
}

// putBillDetails = (req, res) => {
//     BillDetails.updateOne({ _customerId: req.params.customerId, _id: req.params.id }, { $set: req.body })
//         .then((billDetails) => {
//             res.status(200).json({
//                 message: "updated successfully!",
//                 created: billDetails
//             })
//         })
//         .catch((error) => console.log(error))
// }

// deleteBillDetails = (req, res) => {
//     BillDetails.deleteOne({ '_customerId': req.params.customerId, '_id': req.params.id })
//         .then(billDetails => res.send(billDetails))
//         .catch((error) => console.log(error))
// }



module.exports = {
    getBillDetails,
    postBillDetails,
    getAllItems
    // putBillDetails,
    // deleteBillDetails
};