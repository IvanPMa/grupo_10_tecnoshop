const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const controllers = {
    index: async (req, res) => {
        let users = await db.User.findAll();
        res.render('./manage/users/listUser', { users: users });
    },

    createUserForm: async (req, res) => {
        let categories = await db.UserCategory.findAll();
        res.render('./manage/users/createUser', { categories });
    },

    createUser: async (req, res) => {
        let errors = validationResult(req);
        let categories = await db.UserCategory.findAll();

        if(errors.isEmpty()){ // Crear usuario
            let promotion = (req.body.promos) ? true : false;

            let user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                category: req.body.category,
                promotion: promotion
            }

            // Verificar si el correo no está registrado
            let userByEmail = await db.User.findOne({
                where: { email: req.body.email }
            });

            if(userByEmail){
                res.render('./manage/users/createUser', { errors: { email: { msg: 'El correo ya está registrado' } }, old: req.body, categories });
            }
            else{
                await db.User.create(user);
                res.redirect('/manage/users');
            }
        }
        else{
            res.render('./manage/users/createUser', { errors: errors.mapped(), old: req.body, categories });
        }
    },

    detailUser: async (req, res) => {
        let user = await db.User.findByPk(req.params.id, { include: [{ association: "category" }] });
        res.render('./manage/users/userDetail', { user: user });
    },

    editUserForm: async (req, res) => {
        let user = await db.User.findByPk(req.params.id, { include: [{ association: "category" }] });
        let categories = await db.UserCategory.findAll();
        req.session.UserIdPicture = user.id; // Para poner el id en el nombre de la foto
        res.render('./manage/users/editUser', { user, categories });
    },

    editUser: async (req, res) => {
        let errors = validationResult(req);
        let user = await db.User.findByPk(req.params.id, { include: [{ association: "category" }] });
        let categories = await db.UserCategory.findAll();
        let promotion = (req.body.promos) ? true : false;
        let password = user.password;

        // Validación del formato de la foto
        if(req.fileValidationError) {
            errors.errors.push({ msg: 'La imagen debe tener un formato válido', param: 'picture' });
        }

        // Validación de la contraseña
        let isPasswordChanged = req.body.password.length > 0;
        if(isPasswordChanged){
            if(req.body.password.length < 8){
                errors.errors.push({ msg: 'La contraseña debe tener al menos ocho caractéres', param: 'password' });
            }
            else{
                password = bcrypt.hashSync(req.body.password, 10);
            } 
        }

        // Validación para ver si el correo no está registrado
        let emailRegister = await db.User.findOne({
            where: {
                email: req.body.email,
                [db.Sequelize.Op.not]: [{
                    id: req.params.id
                }]
            }
        });
        if(emailRegister){
            errors.errors.push({ msg: 'El correo ya está en uso', param: 'email' });
        }

        if(errors.isEmpty()){
            // Editar usuario
            await db.User.update(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: password,
                    category_id: req.body.category,
                    promotion: promotion,
                    image: (req.file) ? req.file.filename : user.image
                },
                { where: { id: req.params.id } }
            );
            res.redirect('/manage/users/' + req.params.id);
        }
        else{
            res.render('./manage/users/editUser', { errors: errors.mapped(), old: req.body, user, categories });
        }
    },

    deleteUser: async (req, res) => {
        await db.User.destroy({ where: { id: req.params.id } });
        res.redirect('/manage/users');
    },

    deletePicture: async (req, res) => {
        await db.User.update({ image: 'default.jpg' }, { where: { id: req.params.id } });
        res.redirect('/manage/users/' + req.params.id + '/edit');
    }
};

module.exports = controllers;