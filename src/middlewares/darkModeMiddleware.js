const db = require('../database/models');

async function darkModeMiddleware(req, res, next){
    // Buscar en la cookie si esta activado el modo oscuro
    res.locals.darkMode = (req.cookies.darkMode == 'true') ? true : false;

    // Buscar en la base de datos si esta activado el modo oscuro
    if(req.session && req.session.userLogged){
        let user = await db.User.findByPk(req.session.userLogged.id);
        res.locals.darkMode = user.dark_mode;
        res.cookie('darkMode', user.dark_mode, { maxAge: 60 * (1000 * 60) });
    }

    next();
}

module.exports = darkModeMiddleware;