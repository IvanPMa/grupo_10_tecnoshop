const fs = require('fs');
const path = require('path');
const dataProduct = fs.readFileSync(path.join(__dirname, '../data/products.json'), {encoding : 'utf-8'});
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
                price : parseFloat(req.body.productPrice)
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
    editForm: (req, res) => {
        let idProduct = req.params.id;
        let product = products.find(element =>{
            return element.id == idProduct;
        });
        res.render('./productManagement/editProduct', { product });
    },
    editProduct: ( req,res )=>{
        let idProduct = req.params.id;
        res.send(req.body)
    }
}

module.exports = controller;