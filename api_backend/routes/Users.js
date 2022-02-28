const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Users');
// const validator = require('../index');


router.post('/user/signin', UserController.signin);
router.post('/user/register', UserController.register);
router.get('/user/signout', UserController.signout);
router.post('/user/editProfile', UserController.editProfile);  
// router.get('/changePassword', ItemController.signin);


module.exports = router;