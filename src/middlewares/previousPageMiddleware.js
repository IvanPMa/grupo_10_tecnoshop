function previousPageMiddleware(req, res, next){
    let login = req.originalUrl.split('/')[2] == 'login';
    let logout = req.originalUrl.split('/')[2] == 'logout';
    let cart = req.originalUrl.split('/')[2] == 'addproduct' ||
               req.originalUrl.split('/')[2] == 'delete' ||
               req.originalUrl.split('/')[2] == 'buy';

    if(!logout && !login && !cart){
        req.session.previousPage = req.originalUrl;
    }

    next();
}

module.exports = previousPageMiddleware;