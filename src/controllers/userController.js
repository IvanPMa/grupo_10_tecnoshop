const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const session = require('express-session');

const controllers = {
    index: (req, res) => {
        // Si es un usuario se regresa al menu
        // Si es admin te muestra la lista de usuarios
        res.redirect('/')
    },

    createUser: (req, res) => {
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
                res.redirect('/user/login');
            }
        }
        else{
            res.render('./users/register', { errors: errors.mapped(), old: req.body});
        }
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
    },

    registerForm: (req, res) =>{
        res.render('./users/register');
    },

    loginForm: (req, res) => {
        res.render('./users/login');
    },
    
    verifyLogin: (req, res) => {
        let errors = validationResult(req);
        let msgError = 'Email o contraseña incorrecta';

        if(errors.isEmpty()){
            let user = User.findByField('email', req.body.email);
            
            if(user){
                verifyPass = bcrypt.compareSync(req.body.password, user.password);
                
                if(verifyPass){
                    // Usuario ingresado correctamente
                    delete user.password;
                    req.session.userLogged = user;
                    res.redirect('/');
                }
                else{
                    res.render('./users/login', { errors: { password: { msg: msgError }}, old: req.body } )
                }
            }
            else{
                res.render('./users/login', { errors: { password: { msg: msgError }}, old: req.body } )
            }
        }
        else{
            res.render('./users/login', { errors: errors.mapped(), old: req.body});
        }
    },

    profile: (req, res) => {
        res.render('./users/profile', { user: req.session.userLogged });
    },

    editProfile: (req, res) => {
        res.render('./users/editProfile', { user: req.session.userLogged });
    },

    verifyEditProfile: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let password = bcrypt.hashSync(req.body.password, 10);

            let user = {
                id: req.session.userLogged.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                category: req.session.userLogged.category,
                promos: req.session.userLogged.promos,
                image: "default.jpg"
            }

            // Verificar si el correo no está registrado
            let emailRegister = User.findByField('email', req.body.email);

            if(emailRegister){
                res.render('./users/editProfile', { errors: { email: { msg: 'El correo ya está en usó' } }, user: req.session.userLogged, old: req.body });
            }
            else{
                User.edit(user);
                delete user.password;
                req.session.userLogged = user;
                res.redirect('/user/profile');
            }
        }
        else{
            res.render('./users/editProfile', { errors: errors.mapped(), user: req.session.userLogged, old: req.body});
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = controllers;