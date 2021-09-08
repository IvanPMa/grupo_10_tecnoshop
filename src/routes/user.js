const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');
const validateLogin = require('../middlewares/validateLoginMiddleware');
const validateRegister = require('../middlewares/validateRegisterMiddleware');
const validateEditUser = require('../middlewares/validateEditUserMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

var storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null,path.join(__dirname, '../../public/images/users'));
    },
    filename : (req, file, cb)=>{
        cb(null,'user_'+ req.session.userLogged.id + '_picture' + path.extname(file.originalname));
    }
})

var upload = multer ({ storage });

router.get('/login', guestMiddleware, userController.loginForm);            // Formulario de acceso de usuario
router.get('/register', guestMiddleware, userController.registerForm);      // Formulario de registro de usuario
router.post('/login', validateLogin, userController.verifyLogin);           // Acción de acceso de usuario
router.post('/register', validateRegister, userController.verifyRegister);  // Acción de creación de usuario
router.get('/profile', authMiddleware, userController.profile);             // Formulario del perfil del usuario
router.get('/profile/edit', authMiddleware, userController.editProfile);    // Formulario del perfil del usuario
router.put('/profile/edit', upload.single('userPicture'), validateEditUser, userController.verifyEditProfile); // Actualización del perfil del usuario
router.get('/logout', authMiddleware, userController.logout);               // Ruta para cerrar sesión
router.get('/deletePicture', authMiddleware, userController.deletePicture); // Ruta para restablecer la foto del usuario
router.get('/history', authMiddleware, userController.userHistory);         // Ruta para cer el historial de compras del usuario

module.exports = router;