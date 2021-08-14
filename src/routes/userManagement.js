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
        cb(null,'user_'+ req.session.newUserId + '_picture' + path.extname(file.originalname));
    }
})

var upload = multer ({ storage });

// Gestión de Usuarios
router.get('/', userManagementController.index);// Listado de usuarios                                  YA
router.get('/create', userManagementController.createUserForm);// Formulario de creación de usuarios    YA
router.get('/:id', userManagementController.detailUser);// Detalle de un usuario particular             YA
router.post('/', upload.single('picture'), validateCreate, userManagementController.createUser);// Acción de creación YA
router.get('/:id/edit', userManagementController.editUserForm);//Formulario de edición de usuario       YA
router.put('/:id/edit', upload.single('picture'), validateEdit, userManagementController.editUser);// Acción de edición YA
router.delete('/', userManagementController.index);// Acción de borrado

module.exports = router;