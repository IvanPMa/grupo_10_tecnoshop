const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const productManagementController = require ('../controllers/productManagementController');

var storage = multer.diskStorage({
    destination : (req, file , cb) =>{
        cb(null,path.join(__dirname, '../../public/images/products'));
    },
    filename : (req, file , cb)=>{
        cb(null,'product_'+ Date.now() + path.extname(file.originalname));
    }
})

var upload = multer ({ storage });

router.get('/', productManagementController.index);              //1. Listado de productos
router.get('/create', productManagementController.createForm);//2. Formulario de creación de productos
router.post('/create',upload.single('productImage'), productManagementController.createProduct);

router.get('/:id', productManagementController.detailProduct);   //3. Detalle de un producto particular
router.post('/', productManagementController.index);             //4. Acción de creación
router.get('/edit/:id', productManagementController.editForm);//5. Formulario de edición de productos
router.put('/edit/:id',upload.single('productImage'), productManagementController.editProduct);              //6. Acción de edición
router.delete('/', productManagementController.index);           //7. Acción de borrado

module.exports = router;