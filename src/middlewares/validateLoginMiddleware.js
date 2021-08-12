const { check } = require('express-validator');

const validateLoginMiddleware = [
    check('email').isEmail().withMessage('Escribe un correo electrónico válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos ocho caractéres')
];

module.exports = validateLoginMiddleware;