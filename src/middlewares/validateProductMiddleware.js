const { check } = require('express-validator');

const validateProductMiddleware = [
    check('name').notEmpty().withMessage('Debes completar este campo'),
    check('description').notEmpty().withMessage('Debes completar este campo'),
    check('price').notEmpty().withMessage('Debes completar este campo')
        .isFloat({ min: 0 }).withMessage('Debe ser un valor númerico positivo')
];

module.exports = validateProductMiddleware;