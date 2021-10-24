const db = require('../database/models');

async function userLoggedMiddleware(req, res, next){
    // Buscar en la base de datos el usuario con el correo de la cookie
    let emailCookie = req.cookies.userEmail;
    
    if(emailCookie){
        let user = await db.User.findOne({ where: { email: emailCookie } });

        if(user){
            req.session.userLogged = user;
        }
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