const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const controllers = {
    index : (req, res) => {
        // Si es un usuario se regresa al menu
        // Si es admin te muestra la lista de usuarios
        res.redirect('/')
    },
    createUser : (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let promos = (req.body.spam) ? "true" : "false";
            let password = bcrypt.hashSync(req.body.password, 10);

            let user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                category: "user",
                promos: promos,
                image: "default.jpg"
            }

            // Verificar si el correo no está registrado
            let emailRegister = User.findByField('email', req.body.email);

            if(emailRegister){
                res.render('./users/register', { errors: { email: { msg: 'El correo ya está registrado' } }, old: req.body });
            }
            else{
                User.create(user);
                res.redirect('/login');
            }
        }
        else{
            res.render('./users/register', { errors: errors.mapped(), old: req.body});
        }
    },
    detailUser : (req, res) => {
        // Si es un usuario se regresa al menu
        // Si es admin te muestra la lista de usuarios
        res.send('detalles del usuario')
    },
    editUserForm : (req, res) => {
        // Si es un usuario se regresa al menu
        // Si es admin te muestra la lista de usuarios
        res.render('form de edicion del usuario')
    },
    editUser : (req, res) => {
        res.send('editar del usuario')
    },
    deleteUser : (req, res) => {
        res.send('borrar del usuario')
    }
};

module.exports = controllers;