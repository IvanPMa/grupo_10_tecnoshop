const { check } = require('express-validator');

const validateRegisterMiddleware = [
    check('first_name').notEmpty().withMessage('Debes completar el campo de nombre'),
    check('last_name').notEmpty().withMessage('Debes completar el campo de apellido'),
    check('email').isEmail().withMessage('Escribe un correo electrónico válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos ocho caractéres'),
    check('checkpassword').custom((check, { req }) => check === req.body.password).withMessage('Las contraseñas no coinciden'),
    check('terms').notEmpty().withMessage('Debes aceptar los términos y condiciones')
];

module.exports = validateRegisterMiddleware;