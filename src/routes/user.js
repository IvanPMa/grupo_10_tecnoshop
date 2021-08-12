const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateLogin = require('../middlewares/validateLoginMiddleware');
const validateRegister = require('../middlewares/validateRegisterMiddleware');
const validateEditUser = require('../middlewares/validateEditUserMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', userController.index);                            // Listado de usuarios
router.get('/details/:id', userController.detailUser);            // Detalle de un usuario particular
router.put('/details/:id', userController.editUser);              // Acción de edición
router.delete('/details/:id', userController.deleteUser);         // Acción de borrado
router.get('/edit/:id', userController.editUserForm);             // Formulario de edición de usuario
router.get('/login', guestMiddleware, userController.loginForm);                       // Formulario de acceso de usuario
router.get('/register', guestMiddleware, userController.registerForm);                 // Formulario de registro de usuario
router.post('/login', validateLogin, userController.verifyLogin);
router.post('/register', validateRegister, userController.createUser);    // Acción de creación de usuario
router.get('/profile', authMiddleware, userController.profile);
router.get('/profile/edit', authMiddleware, userController.editProfile);
router.post('/profile/edit', validateEditUser, userController.verifyEditProfile);
router.get('/logout', userController.logout);

module.exports = router;