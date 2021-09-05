const express = require ('express');
const router = express.Router();
const cartController = require ('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', cartController.index);
router.post('/addproduct', cartController.addProduct);
router.post('/delete', cartController.deleteProduct);
router.post('/buy', authMiddleware, cartController.buyCart);

module.exports = router;