const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const controllers = {
    index: async (req, res) => {
        let users = await db.User.findAll();
        res.render('./userManagement/listUser', { users: users });
    },

    createUserForm: (req, res) => {
        res.render('./userManagement/createUser');
    },

    createUser: async (req, res) => {
        let errors = validationResult(req);

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
                res.render('./userManagement/createUser', { errors: { email: { msg: 'El correo ya está registrado' } }, old: req.body });
            }
            else{
                await db.User.create(user);
                res.redirect('/userManagement');
            }
        }
        else{
            res.render('./userManagement/createUser', { errors: errors.mapped(), old: req.body});
        }
    },

    detailUser: async (req, res) => {
        let user = await db.User.findByPk(req.params.id, { include: [{ association: "category" }] });
        res.render('./userManagement/userDetail', { user: user });
    },

    editUserForm: async (req, res) => {
        let user = await db.User.findByPk(req.params.id, { include: [{ association: "category" }] });
        req.session.PictureId = user.id; // Para poner el id en el nombre de la foto
        res.render('./userManagement/editUser', { user: user });
    },

    editUser: async (req, res) => {
        let errors = validationResult(req);
        let user = await db.User.findByPk(req.params.id, { include: [{ association: "category" }] });

        if(errors.isEmpty()){ // Editar usuario
            let promotion = (req.body.promos) ? true : false;
            let image = user.image;
            let password = user.password;
            let category = await db.UserCategory.findOne({ where: { name: req.body.category } });

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
                res.render('./userManagement/editUser', { errors: { email: { msg: 'El correo ya está registrado' } }, old: req.body, user: user });
            }
            else{
                // Usuario editado
                await db.User.update(
                    {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: password,
                        category_id: category.id,
                        promotion: promotion,
                        image: image
                    },
                    { where: { id: req.params.id } }
                );
                res.redirect('/userManagement/' + req.params.id);
            }
        }
        else{
            res.render('./userManagement/editUser', { errors: errors.mapped(), old: req.body, user: user});
        }
    },

    deleteUser: async (req, res) => {
        await db.User.destroy({ where: { id: req.params.id } });
        res.redirect('/userManagement');
    },

    deletePicture: async (req, res) => {
        await db.User.update({ image: 'default.jpg' }, { where: { id: req.params.id } });
        res.redirect('/userManagement/' + req.params.id + '/edit');
    }
};

module.exports = controllers;