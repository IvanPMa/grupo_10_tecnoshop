const fs = require('fs');
const path = require ('path');
const controller = {
    index: (req, res)=>{
        let productsJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'), {encoding: "utf-8"});
        let products = JSON.parse(productsJSON);

        res.render('home', {products: products});
    },
}

module.exports = controller;