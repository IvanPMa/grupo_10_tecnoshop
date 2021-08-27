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
        req.session.ImageId = Product.generateId();  // Para poner el id en el nombre de la foto
        res.render('./productManagement/createProduct');
    },

    createProduct: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            if(!req.file){
                // No hay foto
                res.render('./productManagement/createProduct', { errors: { image: { msg: 'No hay imagen para subir' } }, old: req.body });
            }
            else{
                // Crear producto
                let product = {
                    id: Product.generateId(),
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file.filename,
                    category: req.body.category,
                    price: parseFloat(req.body.price)
                }
    
                Product.create(product);
                res.redirect('/productManagement');
            }
            
        }
        else{
            res.render('./productManagement/createProduct', { errors: errors.mapped(), old: req.body});
        }
    },

    editForm: (req, res) => {
        let product = Product.findByField('id', req.params.id);
        req.session.ImageId = product.id;  // Para poner el id en el nombre de la foto
        res.render('./productManagement/editProduct', { product: product });
    },

    editProduct: (req, res) => {
        let errors = validationResult(req);
        let product = Product.findByField('id', req.params.id);

        if(errors.isEmpty()){ // Editar producto
            let image = product.image;

            // Si se cambio la foto
            if(req.file){
                image = req.file.filename;
            }

            let productEdited = {
                ...product,
                name: req.body.name,
                description: req.body.description,
                image: image,
                category: req.body.category,
                price: parseFloat(req.body.price)
            }

            Product.edit(productEdited);
            res.redirect('/productManagement/' + product.id);
        }
        else{
            res.render('./productManagement/editProduct', { errors: errors.mapped(), old: req.body, product: product});
        }
    },
    deleteProduct: (req, res) => {
        let product = Product.findByField('id', req.params.id);
        Product.delete(product);
        res.redirect('/productManagement');
    }
}

module.exports = controller;