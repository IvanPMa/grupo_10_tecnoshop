const express = require('express');
const router = express.Router();
const productManagementController = require ('../controllers/productManagementController');


router.get('/', productManagementController.index);              //1. Listado de productos
router.get('/create', productManagementController.createProduct);//2. Formulario de creación de productos
router.get('/:id', productManagementController.detailProduct);   //3. Detalle de un producto particular
router.post('/', productManagementController.index);             //4. Acción de creación
router.get('/:id/edit', productManagementController.editProduct);//5. Formulario de edición de productos
router.put('/', productManagementController.index);              //6. Acción de edición
router.delete('/', productManagementController.index);           //7. Acción de borrado

module.exports = router;