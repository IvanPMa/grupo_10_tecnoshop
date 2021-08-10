const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
let users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), {encoding : 'utf-8'}));
const { validationResult } = require('express-validator');

const controller = {
    login : (req, res) => {
        res.render('./users/login');
    },
    verifyLogin : (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            user = users.find(u => u.email == req.body.email)

            if(bcrypt.compareSync(user.password, req.body.password)){
                res.redirect('/');
            }
            else{
                res.render('./users/login', { errors: errors.array(), old: req.body});
            }
        }
        else{
            res.render('./users/login', { errors: errors.array(), old: req.body});
        }
    }
};

module.exports = controller;