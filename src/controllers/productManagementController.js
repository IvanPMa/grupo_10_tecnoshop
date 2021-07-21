const fs = require('fs');
const path = require('path');
const dataProduct = fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf-8');
let products = JSON.parse(dataProduct);
const controller = {
    index: (req, res) => {
        
        res.render('./productManagement/listProducts', { products });
    },
    detailProduct: (req, res) => {
        res.send('detalles no disponibles por el momento');
    },
    createForm: (req, res) => {
        res.render('./productManagement/createProduct');
    },
    createProduct: (req, res) => {
        if (req.file) {
            //console.log(req.file);
            // console.log(req.body)
            let product = {
                id: products.length,
                name: req.body.productName,
                description: req.body.productDescription,
                image: req.file.filename,
                category: req.body.productCategory,
                prince : parseFloat(req.body.productPrice)
            }
            products.push(product);

            let productsJSON = JSON.stringify(products);
            fs.writeFileSync(path.join(__dirname, '../data/products.json'),productsJSON);
            res.redirect('/');
        }
        else{
            res.redirect('/products/create');
        }
    },
    editProduct: (req, res) => {
        res.render('./productManagement/editProduct');
    }
}

module.exports = controller;