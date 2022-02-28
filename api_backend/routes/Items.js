const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/Items');
// const validator = require('../index');


router.get('/items/getItems', ItemController.getItems);
router.get('/items/addItem', ItemController.addItems);
router.get('/items/deleteItem', ItemController.deleteItems);
router.get('/items/updateItemDetails', ItemController.updateItemDetails);
router.get('/items/viewMyPostings', ItemController.viewMyPostings);
router.get('/items/viewAllPostings', ItemController.getItems);

module.exports = router;