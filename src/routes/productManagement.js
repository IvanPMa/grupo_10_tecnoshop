const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productManagementController = require('../controllers/productManagementController');
const validateProductMiddleware = require('../middlewares/validateProductMiddleware');

var storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null,path.join(__dirname, '../../public/images/products'));
    },
    filename : (req, file, cb)=>{
        cb(null,'image_product_'+ req.session.ImageId + path.extname(file.originalname));
    }
});

var upload = multer({ storage });

// Gestión de Productos (ToDo: Accesible sólo si eres administrador)
router.get('/', productManagementController.index);                     // Listado de productos
router.get('/create', productManagementController.createForm);          // Formulario de creación de productos
router.post('/create', upload.single('image'), validateProductMiddleware, productManagementController.createProduct);// Acción de creación
router.get('/:id', productManagementController.detailProduct);          // Detalle de un producto particular
router.get('/edit/:id', productManagementController.editForm);          // Formulario de edición de productos
router.put('/edit/:id',upload.single('image'), validateProductMiddleware, productManagementController.editProduct);// Acción de edición
router.delete('/delete/:id', productManagementController.deleteProduct);// Acción de borrado

module.exports = router;