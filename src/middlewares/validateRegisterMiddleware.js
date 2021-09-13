const { check } = require('express-validator');

const validateRegisterMiddleware = [
    check('first_name')
        .notEmpty().withMessage('Debes completar el campo de nombre')
        .isLength({ min: 2 }).withMessage('Debes tener al menos dos caracteres'),
    check('last_name')
        .notEmpty().withMessage('Debes completar el campo de apellido')
        .isLength({ min: 2 }).withMessage('Debes tener al menos dos caracteres'),
    check('email')
        .notEmpty().withMessage('Debes completar este campo')
        .isEmail().withMessage('Escribe un correo electrónico válido'),
    check('password')
        .notEmpty().withMessage('Debes completar este campo')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos ocho caractéres')
        .isStrongPassword().withMessage('Debe tener letras mayúsculas, minúsculas, un número y un carácter especial.'),
    check('checkpassword')
        .custom((check, { req }) => check === req.body.password).withMessage('Las contraseñas no coinciden'),
    check('terms')
        .notEmpty().withMessage('Debes aceptar los términos y condiciones')
];

module.exports = validateRegisterMiddleware;