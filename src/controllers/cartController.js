const controller = {
    index : (req,res ) =>{
        req.session.currentUrl = '/cart';
        res.render('./products/cart');
    }
}

module.exports = controller;