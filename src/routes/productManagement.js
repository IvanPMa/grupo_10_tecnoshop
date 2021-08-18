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

router.get('/', productManagementController.index);              //1. Listado de productos
router.get('/create', productManagementController.createForm);//2. Formulario de creación de productos
router.post('/create', upload.single('productImage'), validateProductMiddleware, productManagementController.createProduct);
router.get('/:id', productManagementController.detailProduct);   //3. Detalle de un producto particular
router.post('/', productManagementController.index);             //4. Acción de creación
router.get('/edit/:id', productManagementController.editForm);//5. Formulario de edición de productos
router.put('/edit/:id',upload.single('productImage'), productManagementController.editProduct);              //6. Acción de edición
router.delete('/delete/:id', productManagementController.deleteProduct);           //7. Acción de borrado

module.exports = router;