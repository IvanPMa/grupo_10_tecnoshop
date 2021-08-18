const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { check } = require('express-validator');
const userManagementController = require ('../controllers/userManagementController');

const validateCreate = [
    check('first_name').notEmpty().withMessage('Debes completar este campo'),
    check('last_name').notEmpty().withMessage('Debes completar este campo'),
    check('email').notEmpty().withMessage('Debes completar este campo'),
    check('password').notEmpty().withMessage('Debes completar este campo')
];

const validateEdit = [
    check('first_name').notEmpty().withMessage('Debes completar este campo'),
    check('last_name').notEmpty().withMessage('Debes completar este campo'),
    check('email').notEmpty().withMessage('Debes completar este campo'),
];

var storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null,path.join(__dirname, '../../public/images/users'));
    },
    filename : (req, file, cb)=>{
        cb(null,'user_'+ req.session.PictureId + '_picture' + path.extname(file.originalname));
    }
})

var upload = multer({ storage });

// Gestión de Usuarios
router.get('/', userManagementController.index);                                                // Listado de usuarios
router.get('/create', userManagementController.createUserForm);                                 // Formulario de creación de usuarios
router.get('/:id', userManagementController.detailUser);                                        // Detalle de un usuario particular
router.post('/', upload.single('picture'), validateCreate, userManagementController.createUser);// Acción de creación
router.get('/:id/edit', userManagementController.editUserForm);                                 //Formulario de edición de usuario
router.put('/:id', upload.single('picture'), validateEdit, userManagementController.editUser);  // Acción de edición
router.delete('/:id', userManagementController.deleteUser);                                     // Acción de borrado
router.get('/:id/deletePicture', userManagementController.deletePicture);        // Formulario de acceso de usuario

module.exports = router;