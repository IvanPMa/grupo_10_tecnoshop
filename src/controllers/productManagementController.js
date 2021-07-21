const fs = require('fs');
const path = require('path');
const dataProduct = fs.readFileSync(path.join(__dirname,'../data/products.json'),'utf-8');
let products = JSON.parse(dataProduct);
const controller = {
    index: (req, res)=>{
        res.redirect('/');
    },
    detailProduct: (req, res)=>{
        res.send('detalles no disponibles por el momento');
    },
    createForm: (req, res)=>{
        res.render('./productManagement/createProduct');
    },
    createProduct: (req, res)=>{
        res.send('Creando producto')
    },
    editProduct: (req, res)=>{
        res.render('./productManagement/editProduct');
    }
}

module.exports = controller;