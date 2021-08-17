const fs = require('fs');
const path = require ('path');

const controller = {
    index: (req, res) => {
        let productosAMostrar = 5;
        let productsJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'), {encoding: "utf-8"});
        let products = JSON.parse(productsJSON);

        res.render('home', {products: products, number: productosAMostrar});
    },
}

module.exports = controller;