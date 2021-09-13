const { check } = require('express-validator');

const validateEditUserMiddleware = [
    check('first_name')
        .notEmpty().withMessage('Debes completar el campo de nombre')
        .isLength({ min: 2 }).withMessage('Debes tener al menos dos caracteres'),
    check('last_name')
        .notEmpty().withMessage('Debes completar el campo de apellido')
        .isLength({ min: 2 }).withMessage('Debes tener al menos dos caracteres'),
    check('email')
        .notEmpty().withMessage('Debes completar este campo')
        .isEmail().withMessage('Escribe un correo electrónico válido'),
    check('checkpassword')
        .custom((check, { req }) => check === req.body.password).withMessage('Las contraseñas no coinciden'),
];

module.exports = validateEditUserMiddleware;