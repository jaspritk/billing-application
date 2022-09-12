const express = require("express");
const router = express.Router();

const customerController = require('./../controllers/customer');
const billController = require('./../controllers/bill');
const drawerController = require('./../controllers/drawer');
const menuController = require('./../controllers/menu');

// CUSTOMER DETAILS

router.get('/customer', customerController.getCustomerDetails);
router.post('/customer', customerController.postCustomerDetails);
// router.put('/customer/:id', customerController.putCustomerDetails);
router.get('/customer/:key', customerController.search);

// BILL DETAILS

router.get('/bill/:customerId', billController.getBillDetails);
router.post('/bill/:customerId', billController.postBillDetails);
router.get('/bill', billController.getAllItems);

// DRAWER DETAILS

router.get('/drawer', drawerController.getDrawerDetails);
router.post('/drawer', drawerController.postDrawerDetails);
router.put('/drawer/:id', drawerController.putDrawerDetails);
router.delete('/drawer/:id', drawerController.deleteDrawerDetails);

// MENU DETAILS

router.get('/menu', menuController.getMenuDetails);
router.post('/menu', menuController.postMenuDetails);
router.put('/menu/:id', menuController.putMenuDetails);
router.delete('/menu/:id', menuController.deleteMenuDetails);

module.exports = router;