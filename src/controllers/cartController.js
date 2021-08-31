const db = require('../database/models');
const Product = require('../database/models/Product');

const controller = {
    index: async (req,res) => {
        /*
        let cart = await db.ShoppingCart.findAll({
            include: [{ association: 'product' }, { association: 'model' }],
            attributes: ['quantity', [db.Sequelize.literal('quantity*product.price'), 'total']],
            where: { user_id: 1 }
        })*/

        let cart = await db.Check.findAll({
            include: { association: 'products' }
        });
        
        if(cart){
            let mensaje = '';
/*
            cart.forEach(c => {
                mensaje += `El usuario ${c.user_id} compró ${c.products[0].Check_Product.quantity} ${c.products[0].name} el ${c.date}.  Total = ${c.total}`;
                mensaje += '<br>';
            })*/

            //res.send(cart);
            res.send(mensaje);
            //res.render('./products/cart');
        }
        else res.send('no hay carrito');
    }
}

module.exports = controller;