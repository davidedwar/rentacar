const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/Items');
const validator = require('../helpers/index');


router.get('/', ItemController.getItems);
router.post('/AddItem', validator.AddItemValidator, ItemController.AddItem);

module.exports = router;