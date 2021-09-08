const express = require('express');
const router = express.Router();
const manageProducts = require('../routes/manageProducts');
const manageUsers = require('../routes/manageUsers');
const manageController = require ('../controllers/manageController');

router.get('/', manageController.index);                        // Obtener las tablas de la base de datos
router.get('/checks', manageController.checks);                 // Obtener la tabla de Recibos
router.get('/shoppingcarts', manageController.shoppingCarts);   // Obtener la tabla de Carrito de compras
router.get('/models', manageController.models);                 // Obtener la tabla de Modelos
router.post('/models/add', manageController.addModel);
router.delete('/models/:id/delete', manageController.deleteModel);
router.get('/categories', manageController.categories);         // Obtener la tabla de categorías de usuarios y productos
router.post('/categories/user/add', manageController.addUserCategory);
router.delete('/categories/user/:id/delete', manageController.deleteUserCategory);
router.post('/categories/product/add', manageController.addProductCategory);
router.delete('/categories/product/:id/delete', manageController.deleteProductCategory);

router.use('/products', manageProducts);
router.use('/users', manageUsers);

module.exports = router;