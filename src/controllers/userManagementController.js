const bcrypt = require('bcryptjs');
const User = require('../models/User');

const controllers = {
    index: (req, res) => {
        // Si es un usuario se regresa al menu
        // Si es admin te muestra la lista de usuarios
        res.redirect('/')
    },

    detailUser: (req, res) => {
        // Si es un usuario se regresa al menu
        // Si es admin te muestra la lista de usuarios
        res.send('detalles del usuario')
    },

    editUserForm: (req, res) => {
        // Si es un usuario se regresa al menu
        // Si es admin te muestra la lista de usuarios
        res.render('form de edicion del usuario')
    },

    editUser: (req, res) => {
        res.send('editar del usuario')
    },

    deleteUser: (req, res) => {
        res.send('borrar del usuario')
    }
};

module.exports = controllers;