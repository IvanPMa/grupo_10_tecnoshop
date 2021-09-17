const express = require('express');
const router = express.Router();
const apiController = require ('../controllers/apiController');

router.get('/users', apiController.getAllUsers);
router.get('/users/:id', apiController.getUser);
router.get('/products', apiController.getAllProducts);
router.get('/products/:id', apiController.getProduct);

module.exports = router;