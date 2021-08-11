const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const usersControllers = require('../controllers/usersControllers');

const validateRegister = [
    check('first_name').notEmpty().withMessage('Debes completar el campo de nombre'),
    check('last_name').notEmpty().withMessage('Debes completar el campo de apellido'),
    check('email').isEmail().withMessage('Escribe un correo electrónico válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos ocho caractéres'),
    check('checkpassword').custom((check, { req }) => check === req.body.password).withMessage('Las contraseñas no coinciden'),
    check('terms').notEmpty().withMessage('Debes aceptar los términos y condiciones')
];

const validateLogin = [
    check('email').isEmail().withMessage('Escribe un correo electrónico válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos ocho caractéres')
];

router.get('/', usersControllers.index);                            // Listado de productos
router.get('/details/:id', usersControllers.detailUser);            // Detalle de un usuario particular
router.put('/details/:id', usersControllers.editUser);              // Acción de edición
router.delete('/details/:id', usersControllers.deleteUser);         // Acción de borrado
router.get('/edit/:id', usersControllers.editUserForm);             // Formulario de edición de usuario
router.get('/login', usersControllers.login);                       // Formulario de acceso de usuario
router.post('/login', validateLogin, usersControllers.verifyLogin);
router.get('/register', usersControllers.register);                 // Formulario de registro de usuario
router.post('/register', validateRegister, usersControllers.createUser);    // Acción de creación de usuario

module.exports = router;
