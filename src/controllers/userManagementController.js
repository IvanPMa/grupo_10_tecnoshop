const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const controllers = {
    index: (req, res) => {
        let users = User.getData()
        res.render('./userManagement/listUser', { users: users });
    },

    createUserForm: (req, res) => {
        req.session.PictureId = User.generateId();
        res.render('./userManagement/createUser');
    },

    createUser: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){ // Crear usuario
            let promos = (req.body.promos) ? "true" : "false";
            let image = "default.jpg";

            if(req.file){
                image = req.file.filename;
            }

            let user = {
                id: User.generateId(),
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                category: req.body.category,
                promos: promos,
                image: image
            }

            User.create(user);
            res.redirect('/users');
        }
        else{
            res.render('./userManagement/createUser', { errors: errors.mapped(), old: req.body});
        }
    },

    detailUser: (req, res) => {
        let user = User.findByField('id', req.params.id);
        res.render('./userManagement/userDetail', { user: user });
    },

    editUserForm: (req, res) => {
        let user = User.findByField('id', req.params.id);
        req.session.PictureId = user.id;
        res.render('./userManagement/editUser', { user: user });
    },

    editUser: (req, res) => {
        let errors = validationResult(req);
        let user = User.findByField('id', req.params.id);

        if(errors.isEmpty()){ // Editar usuario
            let promos = (req.body.promos) ? "true" : "false";
            let image = user.image;
            let password = user.password;

            // Si se cambio la foto
            if(req.file){
                image = req.file.filename;
            }

            // Si se cambió la contraseña
            let changePassword = req.body.password.length > 0;
            if(changePassword){
                password = bcrypt.hashSync(req.body.password, 10);

                if(password.length < 8){
                    res.render('./userManagement/editUser', { errors: { checkpassword: { msg: 'La contraseña debe tener al menos ocho caractéres' } }, user: user, old: req.body });
                }
            }

            let userEdited = {
                id: user.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                category: req.body.category,
                promos: promos,
                image: image
            }

            User.edit(userEdited);
            res.redirect('/users/' + user.id);
        }
        else{
            res.render('./userManagement/editUser', { errors: errors.mapped(), old: req.body, user: user});
        }
    },

    deleteUser: (req, res) => {
        let user = User.findByField('id', req.params.id);
        User.delete(user);
        res.redirect('/users');
    },

    deletePicture: (req, res) => {
        let user = User.findByField('id', req.params.id);
        User.resetPicture(user);
        res.redirect('/users/' + user.id + '/edit');
    }
};

module.exports = controllers;