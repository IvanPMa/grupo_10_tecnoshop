const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { check } = require('express-validator');
const manageUsersController = require ('../controllers/manageUsersController');

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
        cb(null,'user_'+ req.session.UserIdPicture + '_picture' + path.extname(file.originalname));
    }
})

var upload = multer({ storage });

// Gestión de Usuarios (ToDo: Accesible sólo si eres administrador)
router.get('/', manageUsersController.index);                                               // Listado de usuarios
router.get('/create', manageUsersController.createUserForm);                                // Formulario de creación de usuarios
router.get('/:id', manageUsersController.detailUser);                                       // Detalle de un usuario particular
router.post('/create', validateCreate, manageUsersController.createUser);                   // Acción de creación
router.get('/:id/edit', manageUsersController.editUserForm);                                // Formulario de edición de usuario
router.put('/:id', upload.single('picture'), validateEdit, manageUsersController.editUser); // Acción de edición
router.delete('/:id', manageUsersController.deleteUser);                                    // Acción de borrado
router.get('/:id/deletePicture', manageUsersController.deletePicture);                      // Ruta para restablecer la foto

module.exports = router;