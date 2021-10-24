const { check } = require('express-validator');

const validateLoginMiddleware = [
    check('email')
        .notEmpty().withMessage('Debes completar este campo')
        .isEmail().withMessage('Escribe un correo electrónico válido'),
    check('password')
        .notEmpty().withMessage('Debes completar este campo')
];

module.exports = validateLoginMiddleware;