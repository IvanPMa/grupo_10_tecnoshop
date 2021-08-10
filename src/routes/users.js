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

router.get('/', usersControllers.index);                        // Listado de productos
router.post('/', validateRegister, usersControllers.createUser);// Acción de creación de usuario
router.get('/:id', usersControllers.detailUser);                // Detalle de un usuario particular
router.put('/:id', usersControllers.editUser);                  // Acción de edición
router.delete('/:id', usersControllers.deleteUser);             // Acción de borrado
router.get('/edit/:id', usersControllers.editUserForm);         // Formulario de edición de usuario

module.exports = router;