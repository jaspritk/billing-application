const express = require('express');
const app = express();

const CustomerDetails = require('./../models/customer-details');

app.use(express.json());

getCustomerDetails = (_, res) => {
    CustomerDetails.find({})
        .then((customerDetails) => {
            res.send(customerDetails);
        })
        .catch((error) => console.log(error))
}

postCustomerDetails = (req, res) => {
    const customer = new CustomerDetails(
        {
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhone: req.body.customerPhone,
            drawerName: req.body.drawerName,
            drawerPhone: req.body.drawerPhone,
            total: req.body.total,
            grandtotal: req.body.grandtotal,

        }
    );
    customer
        .save()
        .then((customerDetails) => {
            res.status(200).json({
                message: "Customer added successfully!",
                created: customerDetails
            })
            // res.render('template', { customerDetails: customerDetails });
        })
        .catch((error) => console.log(error));

}

// putCustomerDetails = (req, res) => {
//     CustomerDetails.updateOne({ _id: req.params.id }, { $set: req.body })
//         .then(customerDetails => res.send(customerDetails))
//         .catch((error) => console.log(error))
// }

search = (req, res) => {
    CustomerDetails.find({
        "$or": [
            { "customerName": { $regex: req.params.key, $options: 'i' } },
        ]
    }
    )
        .then(customerDetails => res.send(customerDetails))
        .catch((error) => console.log(error))
}

module.exports = {
    getCustomerDetails,
    postCustomerDetails,
    // putCustomerDetails,
    search
};