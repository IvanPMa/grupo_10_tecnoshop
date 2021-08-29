const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const manageProductsController = require('../controllers/manageProductsController');
const validateProductMiddleware = require('../middlewares/validateProductMiddleware');

var storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null,path.join(__dirname, '../../public/images/products'));
    },
    filename : (req, file, cb)=>{
        cb(null,'image_product_'+ req.session.ProductIdImage + path.extname(file.originalname));
    }
});

var upload = multer({ storage });

// Gestión de Productos (ToDo: Accesible sólo si eres administrador)
router.get('/', manageProductsController.index);                        // Listado de productos
router.get('/create', manageProductsController.createForm);             // Formulario de creación de productos
router.post('/create', validateProductMiddleware, manageProductsController.createProduct);// Acción de creación
router.get('/:id', manageProductsController.detailProduct);             // Detalle de un producto particular
router.get('/edit/:id', manageProductsController.editForm);             // Formulario de edición de productos
router.put('/edit/:id',upload.single('image'), validateProductMiddleware, manageProductsController.editProduct);// Acción de edición
router.delete('/delete/:id', manageProductsController.deleteProduct);   // Acción de borrado

module.exports = router;