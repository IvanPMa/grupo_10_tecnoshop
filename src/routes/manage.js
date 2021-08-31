const express = require('express');
const router = express.Router();
const manageProducts = require('../routes/manageProducts');
const manageUsers = require('../routes/manageUsers');
const manageController = require ('../controllers/manageController');

router.get('/', manageController.index);
router.get('/checks', manageController.checks);
router.get('/shoppingcarts', manageController.shoppingCarts);
router.get('/models', manageController.models);
router.get('/categories', manageController.categories);

router.use('/products', manageProducts);
router.use('/users', manageUsers);

module.exports = router;