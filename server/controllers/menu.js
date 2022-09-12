const express = require('express');
const app = express();

const MenuDetails = require('./../models/menu-details');

app.use(express.json());

getMenuDetails = (_, res) => {
    MenuDetails.find({})
        .then(menuDetails => res.send(menuDetails))
        .catch((error) => console.log(error))
}

postMenuDetails = (req, res) => {
    const menu = new MenuDetails({
        itemName: req.body.itemName,
        halfPlatePrice: req.body.halfPlatePrice,
        fullPlatePrice: req.body.fullPlatePrice,
        category: req.body.category
    });
    menu
        .save()
        .then(menuDetails => {
            res.status(200).json({
                message: "Menu item added successfully!",
                created: menuDetails
            })
        })
        .catch((error) => console.log(error))
}

putMenuDetails = (req, res) => {
    MenuDetails.updateOne({ _id: req.params.id }, { $set: req.body })
        .then((menuDetails) => {
            res.status(200).json({
                message: "Menu item updated successfully!",
                created: menuDetails
            })
        })
        .catch((error) => console.log(error))
}

deleteMenuDetails = (req, res) => {
    MenuDetails.deleteOne({ _id: req.params.id })
        .then(menuDetails => {
            res.status(200).json({
                message: "Menu item deleted successfully!",
                created: menuDetails
            })
        })
        .catch((error) => console.log(error))
}

module.exports = {
    getMenuDetails,
    postMenuDetails,
    putMenuDetails,
    deleteMenuDetails,
}