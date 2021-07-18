const fs = require('fs');

const controller = {
    index: (req, res)=>{
        let productsJSON = fs.readFileSync("src/data/products.json", {encoding: "utf-8"});
        let products = JSON.parse(productsJSON);

        res.render('home', {products: products});
    },
}

module.exports = controller;