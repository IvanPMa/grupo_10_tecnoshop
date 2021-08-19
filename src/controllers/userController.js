const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const controllers = {
    register: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let promos = (req.body.promos) ? "true" : "false";
            let password = bcrypt.hashSync(req.body.password, 10);

            let user = {
                id: User.generateId(),
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

                    if(req.body.remember){
                        res.cookie('userEmail', req.body.email, { maxAge: 60 * (1000 * 60) })
                    }

                    res.redirect('/');
                }
                else{
                    // Contraseña incorrecta
                    res.render('./users/login', { errors: { password: { msg: msgError }}, old: req.body } )
                }
            }
            else{
                // Email incorrecto
                res.render('./users/login', { errors: { password: { msg: msgError }}, old: req.body } )
            }
        }
        else{
            // Errores en los inputs del form
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
            let userLogged = User.findByField('id', req.session.userLogged.id);
            let password = userLogged.password;
            let filename = userLogged.image;

            // Si se cambió la foto
            if(req.file){
                filename = req.file.filename;
            }

            // Si se cambió la contraseña
            let changePassword = req.body.password.length > 0;
            if(changePassword){
                password = bcrypt.hashSync(req.body.password, 10);

                if(password.length < 8){
                    res.render('./users/editProfile', { errors: { checkpassword: { msg: 'La contraseña debe tener al menos ocho caractéres' } }, user: req.session.userLogged, old: req.body });
                }
            }

            let userEdited = {
                id: req.session.userLogged.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                category: req.session.userLogged.category,
                promos: req.session.userLogged.promos,
                image: filename
            }
    
            // Verificar si el correo no está registrado
            let emailRegister = User.isNewEmailInUse(userEdited, userEdited.email);
            if(emailRegister){
                // Error de que el correo está en uso
                console.log(userEdited);
                res.render('./users/editProfile', { errors: { email: { msg: 'El correo ya está en uso' } }, user: req.session.userLogged, old: req.body });
            }
            else{
                // Usuario editado
                User.edit(userEdited);
                res.redirect('/user/profile');
            }
        }
        else{
            // Error del forms
            res.render('./users/editProfile', { errors: errors.mapped(), user: req.session.userLogged, old: req.body});
        }
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    },

    deletePicture: (req, res) => {
        let userLogged = User.findByField('id', req.session.userLogged.id);
        User.resetPicture(userLogged);
        res.redirect('/user/profile/edit');
    }
};

module.exports = controllers;