const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers');

router.get('/', usersControllers.index);                    // Listado de productos
router.post('/', usersControllers.createUser);              // Acción de creación de usuario
router.get('/:id', usersControllers.detailUser);            // Detalle de un usuario particular
router.put('/:id', usersControllers.editUser);              // Acción de edición
router.delete('/:id', usersControllers.deleteUser);         // Acción de borrado
router.get('/edit/:id', usersControllers.editUserForm);     // Formulario de edición de usuario

module.exports = router;