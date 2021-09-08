const db = require('../database/models');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const controllers = {
    registerForm: (req, res) => {
        res.render('./users/register');
    },

    verifyRegister: async (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let promotion = (req.body.promos) ? true : false;
            let password = bcrypt.hashSync(req.body.password, 10);

            let user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                promotion: promotion
            }

            // Verificar si el correo no está registrado
            let userByEmail = await db.User.findOne({
                where: { email: req.body.email }
            });

            if(userByEmail){
                res.render('./users/register', { errors: { email: { msg: 'El correo ya está registrado' } }, old: req.body });
            }
            else{
                await db.User.create(user);
                res.redirect('/user/login');
            }
        }
        else{
            res.render('./users/register', { errors: errors.mapped(), old: req.body});
        }
    },

    loginForm: (req, res) => {
        res.render('./users/login');
    },
    
    verifyLogin: async (req, res) => {
        let errors = validationResult(req);
        let msgError = 'Email o contraseña incorrecta';

        if(errors.isEmpty()){
            let user = await db.User.findOne({ where: { email: req.body.email } });
            
            if(user){
                verifyPass = bcrypt.compareSync(req.body.password, user.password);
                
                // Usuario ingresado correctamente
                if(verifyPass){
                    delete user.password;
                    req.session.userLogged = user;

                    // Si activo las cookies
                    if(req.body.remember){
                        res.cookie('userEmail', req.body.email, { maxAge: 60 * (1000 * 60) });
                    }

                    // Si agrego objetos en el carrito de compras mientras no estaba logueado
                    if(req.session.tempCart){
                        for(let i = 0; i < req.session.tempCart.length; i++){
                            let cart = await db.ShoppingCart.findOne({
                                where: {
                                    user_id: req.session.userLogged.id,
                                    product_id: req.session.tempCart[i].product_id,
                                    model_id: req.session.tempCart[i].model_id }
                            });
                
                            // Si ya tiene ese producto agregado al carrito actualizar su cantidad
                            if(cart){
                                await db.ShoppingCart.update({
                                    quantity: cart.quantity + req.session.tempCart[i].quantity
                                },{
                                    where: { id: cart.id }
                                });
                            }
                            // Si no tiene el producto, anexarlo
                            else{
                                await db.ShoppingCart.create({
                                    user_id: req.session.userLogged.id,
                                    product_id: req.session.tempCart[i].product_id,
                                    model_id: req.session.tempCart[i].model_id,
                                    quantity: req.session.tempCart[i].quantity
                                });
                            }
                        }
                    }

                    res.redirect(req.session.previousPageLogin);
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
        req.session.UserIdPicture = req.session.userLogged.id; // Para poner el id en el nombre de la foto
        res.render('./users/editProfile', { user: req.session.userLogged });
    },

    verifyEditProfile: async (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let userLogged = await db.User.findByPk(req.session.userLogged.id);
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
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                image: filename
            }
    
            // Verificar si el correo no está registrado
            let emailRegister = await db.User.findOne({
                where: {
                    email: req.body.email,
                    [db.Sequelize.Op.not]: [{
                        id: req.session.userLogged.id
                    }]
                }
            });
            if(emailRegister){
                // Error de que el correo está en uso
                res.render('./users/editProfile', { errors: { email: { msg: 'El correo ya está en uso' } }, user: req.session.userLogged, old: req.body });
            }
            else{
                // Usuario editado
                await db.User.update(
                    {
                        first_name: userEdited.first_name,
                        last_name: userEdited.last_name,
                        email: userEdited.email,
                        password: userEdited.password,
                        image: userEdited.image
                    },
                    {
                        where: { id: userLogged.id }
                    }
                );
                req.session.userLogged = await db.User.findByPk(userLogged.id);
                res.redirect('/user/profile');
            }
        }
        else{
            // Error del forms
            res.render('./users/editProfile', { errors: errors.mapped(), user: req.session.userLogged, old: req.body});
        }
    },

    logout: (req, res) => {
        let previousPage = req.session.previousPage;
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect(previousPage);
    },

    deletePicture: async (req, res) => {
        let userLogged = await db.User.findByPk(req.session.userLogged.id);
        await db.User.update({ image: 'default.jpg' }, { where: { id: userLogged.id } });
        req.session.userLogged = await db.User.findByPk(userLogged.id);
        res.redirect('/user/profile/edit');
    },

    userHistory: async (req, res) => {
        let userChecks = await db.Check.findAll({
            include: [{ association: 'products'}],
            where: { user_id: req.session.userLogged.id }
        });
        res.render('./users/history', { userChecks });
    }
};

module.exports = controllers;