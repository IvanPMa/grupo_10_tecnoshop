const Product = require('../models/Product');
const { validationResult } = require('express-validator');

const controller = {
    index: (req, res) => {
        let products = Product.getData();
        res.render('./productManagement/listProducts', { products });
    },

    detailProduct: (req, res) => {
        let product = Product.findByField('id', req.params.id);
        res.render('./productManagement/productDetail', { product: product });
    },

    createForm: (req, res) => {
        req.session.ImageId = Product.generateId();
        res.render('./productManagement/createProduct');
    },

    createProduct: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){ // Crear producto
            let product = {
                id: Product.generateId(),
                name: req.body.name,
                description: req.body.description,
                image: req.file.filename,
                category: req.body.category,
                price: parseFloat(req.body.price)
            }

            Product.create(product);
            res.redirect('/products');
        }
        else{
            res.render('./productManagement/createProduct', { errors: errors.mapped(), old: req.body});
        }
    },

    editForm: (req, res) => {
        let product = Product.findByField('id', req.params.id);
        req.session.ImageId = product.id;
        res.render('./productManagement/editProduct', { product: product });
    },

    editProduct: (req, res) => {
        let errors = validationResult(req);
        let product = Product.findByField('id', req.params.id);

        if(errors.isEmpty()){ // Editar producto
            let image = user.image;

            // Si se cambio la foto
            if(req.file){
                image = req.file.filename;
            }

            let productEdited = {
                id: product.id,
                name: req.body.name,
                description: req.body.description,
                image: image,
                category: req.body.category,
                price: parseFloat(req.body.price)
            }

            Product.edit(productEdited);
            res.redirect('/products/' + product.id);
        }
        else{
            res.render('./productManagement/editProduct', { errors: errors.mapped(), old: req.body, product: product});
        }
    },
    deleteProduct: (req, res) => {
        let product = Product.findByField('id', req.params.id);
        Product.delete(product);
        res.redirect('/products');
    }
}

module.exports = controller;