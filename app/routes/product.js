const express = require ('express');
const router = express.Router();

const productController = require ('../controllers/product.controller');

router.get('/productCart', productController.productCart);
router.get('/productDetail', productController.productDetail);

module.exports = router;