const fs = require('fs');
const path = require ('path');
const db = require('../database/models');

const controller = {
    index: (req, res) => {
        let productsJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'), {encoding: "utf-8"});
        let all = JSON.parse(productsJSON);
        let products = 
        [
            {
                name: "Productos recomendados",
                products: all
            },
            {
                name: "Los más vendidos",
                products: all
            },
            {
                name: "Agregados recientemente",
                products: all
            }
        ]

        res.render('home', { productGroup: products , users: users});
    },
}

module.exports = controller;