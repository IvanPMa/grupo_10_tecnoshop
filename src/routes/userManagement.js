const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userManagementController = require ('../controllers/userManagementController');

var storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null,path.join(__dirname, '../../public/images/users'));
    },
    filename : (req, file, cb)=>{
        cb(null,'user_'+ req.session.userLogged.id + '_picture' + path.extname(file.originalname));
    }
})

var upload = multer ({ storage });

// Gestión de Usuarios
router.get('/', userManagementController.index);               // Listado de usuarios
router.get('/:id', userManagementController.detailUser);                  // Detalle de un usuario particular
router.put('/:id', userManagementController.editUser);                    // Acción de edición
router.get('/edit/:id', upload.single('userPicture'), userManagementController.editUserForm);                   // Formulario de edición de usuario
router.post('/edit/:id', userManagementController.editUserForm);                   // Formulario de edición de usuario

module.exports = router;