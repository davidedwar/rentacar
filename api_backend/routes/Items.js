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
// router.post('/items/uploadImages', ItemController.uploader);
// app.post('/items/uploadImages', upload.array('myFiles', 12), (req, res, next) => {
//     const files = req.files
//     if (!files) {
//       const error = new Error('Please choose files')
//       error.httpStatusCode = 400
//       return next(error)
//     }
   
//       res.send(files)
    
//   })
// router.get('/items/getModels', ItemController.getModels);

module.exports = router;