const { check } = require('express-validator');

const validateProductMiddleware = [
    check('name')
        .notEmpty().withMessage('Debes completar este campo')
        .isLength({ min: 5 }).withMessage('Debes tener al menos cinco caracteres'),
    check('description')
        .notEmpty().withMessage('Debes completar este campo')
        .isLength({ min: 20 }).withMessage('Debes tener al menos veinte caracteres'),
    check('price')
        .notEmpty().withMessage('Debes completar este campo')
        .isFloat({ min: 0 }).withMessage('Debe ser un valor númerico positivo')
];

module.exports = validateProductMiddleware;