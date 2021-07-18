const fs = require('fs');

const controller = {
    productDetail : (req, res) =>{
        let productsJSON = fs.readFileSync("src/data/products.json", {encoding: "utf-8"});
        let products = JSON.parse(productsJSON);
        let product = products.find(p => p.id == req.params.id);

        res.render('./products/productDetail', {product: product});
    }
}

module.exports = controller;