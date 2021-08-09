const fs = require('fs');
const path = require('path');
let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding : 'utf-8'}));

const controllers = {
    index : (req, res) => {
        // Si es un usuario se regresa al menu
        // Si es admin te muestra la lista de usuarios
        res.redirect('/')
    },
    createUser : (req, res) => {
        if(req.body.terminos){
            let newId = users[users.length - 1].id + 1;
            let spam = (req.body.spam) ? "true" : "false";

            let user = {
                id: newId,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                category: "user",
                spam: spam,
                image: "default.jpg"
            }

            users.push(user);

            let usersJSON = JSON.stringify(users, null, 1);
            fs.writeFileSync(path.join(__dirname, '../data/users.json'), usersJSON);
            res.redirect('/login')
        }
        else{
            res.redirect('/register');
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