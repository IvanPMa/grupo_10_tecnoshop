const express = require( 'express');
const router = express.Router();
const { check } = require('express-validator');
const loginController = require('../controllers/loginController')

const validateLogin = [
    check('email').isEmail().withMessage('Escribe un correo electrónico válido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos ocho caractéres')
];

router.get('/', loginController.login);
router.post('/', validateLogin, loginController.verifyLogin)

module.exports = router;