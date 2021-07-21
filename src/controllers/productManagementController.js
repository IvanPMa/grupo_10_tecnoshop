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
                id: Date.now(),
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
        // let idProduct = req.params.id;
        if(req.file){
            for (let product of products){
                if(product.id == req.params.id){
                    product.name  = req.body.productName;
                    product.description = req.body.productDescription;
                    product.iamge = req.file.filename;
                    product.category = req.body.productCategory;
                    product.price = parseFloat(req.body.productPrice);
                }
            }
            let productsJSON = JSON.stringify(products);
            fs.writeFileSync(path.join(__dirname, '../data/products.json'),productsJSON);
            res.redirect('/products');
        } else{
            res.redirect('/products');
        }
    },
    deleteProduct : ( req, res) =>{
        let newProductsList = [];
        for (let product of products){

            if(product.id != req.params.id){
                newProductsList.push(product);
            }
        }
        let productsJSON = JSON.stringify(newProductsList);
        fs.writeFileSync(path.join(__dirname, '../data/products.json'),productsJSON);
        res.redirect('/products');
    }
}

module.exports = controller;