const fs = require('fs');
const path = require('path');

const Product = {
    getData: function(){
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), {encoding : 'utf-8'}));
    },

    generateId: function(){
        let products = this.getData();

        if(products){
            let lastProduct = products[products.length - 1];
            return id = lastProduct.id + 1;
        }
        else{
            return 0;
        }
    },

    create: function(newProduct){
        let products = this.getData();
        products.push(newProduct);
        let productsJSON = JSON.stringify(products, null, 1);
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsJSON);
    },

    edit: function(product){
        let products = this.getData();
        let index = products.indexOf(products.find(p => p.id == product.id));

        products[index] = {
            ...product
        }
        
        let productsJSON = JSON.stringify(products, null, 1);
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsJSON);
    },

    delete: function(product){
        let products = this.getData();
        let index = products.indexOf(products.find(p => p.id == product.id));
        products.splice(index, 1);
        let productsJSON = JSON.stringify(products, null, 1);
        fs.writeFileSync(path.join(__dirname, '../data/products.json'), productsJSON);
    },

    findByField: function(field, text){
        let products = this.getData();
        let product = products.find(p => p[field] == text);
        return product;
    }
}

module.exports = Product;