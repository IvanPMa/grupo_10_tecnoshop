const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding : 'utf-8'}));
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
            let id = users[users.length - 1].id + 1;
            let promos = (req.body.spam) ? "true" : "false";
            let password = bcrypt.hashSync(req.body.password, 10);

            let user = {
                id: id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: password,
                category: "user",
                promos: promos,
                image: "default.jpg"
            }

            users.push(user);

            let usersJSON = JSON.stringify(users, null, 1);
            fs.writeFileSync(path.join(__dirname, '../data/users.json'), usersJSON);
            res.redirect('/login');
        }
        else{
            res.render('./users/register', { errors: errors.array(), old: req.body});
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