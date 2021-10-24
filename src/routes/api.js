const express = require('express');
const router = express.Router();
const apiController = require ('../controllers/apiController');
const validateProductMiddleware = require('../middlewares/validateProductMiddleware');

router.get('/users', apiController.getAllUsers);
router.get('/users/:id', apiController.getUser);
router.get('/products', apiController.getAllProducts);
router.get('/products/:id', apiController.getProduct);
router.post('/products', validateProductMiddleware, apiController.createProduct);
router.put('/products', validateProductMiddleware, apiController.updateProduct);
router.delete('/products', apiController.deleteProduct);
router.get('/sales', apiController.sales);

module.exports = router;