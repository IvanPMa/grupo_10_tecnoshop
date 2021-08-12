const { check } = require('express-validator');

const validateEditUserMiddleware = [
    check('first_name').notEmpty().withMessage('Debes completar el campo de nombre'),
    check('last_name').notEmpty().withMessage('Debes completar el campo de apellido'),
    check('email').isEmail().withMessage('Escribe un correo electrónico válido'),
    check('checkpassword').custom((check, { req }) => check === req.body.password).withMessage('Las contraseñas no coinciden')
];

module.exports = validateEditUserMiddleware;