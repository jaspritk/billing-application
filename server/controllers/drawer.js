const express = require('express');
const app = express();

const DrawerDetails = require('./../models/drawer-details');

app.use(express.json());

getDrawerDetails = (_, res) => {
    DrawerDetails.find({})
        .then(drawerDetails => res.send(drawerDetails))
        .catch((error) => console.log(error))
}

postDrawerDetails = (req, res) => {
    const drawer = new DrawerDetails({
        drawerName: req.body.drawerName,
        drawerPhone: req.body.drawerPhone,
        drawerEmail: req.body.drawerEmail,
        drawerAddress: req.body.drawerAddress,
        drawerCity: req.body.drawerCity,
        drawerState: req.body.drawerState
    })
    drawer
        .save()
        .then(drawerDetails => {
            res.status(200).json({
                message: "Drawer added successfully!",
                created: drawerDetails
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: error })
        });

}

putDrawerDetails = (req, res) => {
    DrawerDetails.updateOne({ _id: req.params.id }, { $set: req.body })
        .then((drawerDetails) => {
            res.status(200).json({
                message: "Drawer updated successfully!",
                created: drawerDetails
            })
        })
        .catch((error) => console.log(error))
}

deleteDrawerDetails = (req, res) => {
    DrawerDetails.deleteOne({ _id: req.params.id })
        .then(drawerDetails => {
            res.status(200).json({
                message: "Drawer deleted successfully!",
                created: drawerDetails
            })
        })
        .catch((error) => console.log(error))
}

module.exports = {
    getDrawerDetails,
    postDrawerDetails,
    putDrawerDetails,
    deleteDrawerDetails
}
