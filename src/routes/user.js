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

router.get('/login', guestMiddleware, userController.loginForm);        // Formulario de acceso de usuario
router.get('/register', guestMiddleware, userController.registerForm);  // Formulario de registro de usuario
router.post('/login', validateLogin, userController.verifyLogin);       //
router.post('/register', validateRegister, userController.register);    // Acción de creación de usuario
router.get('/profile', authMiddleware, userController.profile);         //
router.get('/profile/edit', authMiddleware, userController.editProfile);//
router.put('/profile/edit', upload.single('userPicture'), validateEditUser, userController.verifyEditProfile);
router.get('/logout', userController.logout);

module.exports = router;