const User = require('../models/User');

function userLoggedMiddleware(req, res, next){
    // Buscar en la base de datos el usuario con el correo de la cookie
    let emailCookie = req.cookies.userEmail;
    let user = User.findByField('email', emailCookie);
    if(user){
        req.session.userLogged = user;
    }


    // Ver si hay un usuario guardado en session
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    else{
        res.locals.isLogged = false;
    }

    next();
}

module.exports = userLoggedMiddleware;