const { check } = require('express-validator');

const validateProductMiddleware = [
    check('name').notEmpty().withMessage('Debes completar este campo'),
    check('description').notEmpty().withMessage('Debes completar este campo'),
    check('category').notEmpty().withMessage('Debes completar este campo'),
    check('price').notEmpty().withMessage('Debes completar este campo')
        .isNumeric().withMessage('Debe ser un valor númerico')
];

module.exports = validateProductMiddleware;