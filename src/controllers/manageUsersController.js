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

        if(errors.isEmpty()){ // Editar usuario
            let promotion = (req.body.promos) ? true : false;
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
                    res.render('./manage/users/editUser', { errors: { checkpassword: { msg: 'La contraseña debe tener al menos ocho caractéres' } }, user, categories, old: req.body });
                }
            }

            // Verificar si el correo no está registrado
            let userByEmail = await db.User.findOne({
                where: {
                    email: req.body.email,
                    [db.Sequelize.Op.not]: [{
                        id: req.params.id
                    }]
                }
            });
            if(userByEmail){
                res.render('./manage/users/editUser', { errors: { email: { msg: 'El correo ya está registrado' } }, old: req.body, user, categories });
            }
            else{
                // Usuario editado
                await db.User.update(
                    {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: password,
                        category_id: req.body.category,
                        promotion: promotion,
                        image: image
                    },
                    { where: { id: req.params.id } }
                );
                res.redirect('/manage/users/' + req.params.id);
            }
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