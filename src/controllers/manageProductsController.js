const db = require('../database/models');
const { validationResult } = require('express-validator');

const controller = {
    index: async (req, res) => {
        let products = await db.Product.findAll();
        res.render('./manage/products/listProducts', { products });
    },

    detailProduct: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id, { include: [{ association: "category" }] });
        res.render('./manage/products/productDetail', { product: product });
    },

    createForm: async (req, res) => {
        let categories = await db.ProductCategory.findAll();
        res.render('./manage/products/createProduct', { categories: categories });
    },

    createProduct: async (req, res) => {
        let errors = validationResult(req);
        let categories = await db.ProductCategory.findAll();
        let active = (req.body.active) ? true : false;
        let categoryId;
        let [status, number] = await verifyCategories(req.body);

        // Validación de las categoría
        const responseCategory = {
            'blank': () => errors.errors.push({ msg: 'Debes escribir un nombre para la nueva categoría', param: 'category' }),
            'exists': () => errors.errors.push({ msg: 'La categoría ya existe', param: 'category' }),
            'notexists': () => errors.errors.push({ msg: 'La categoría no existe', param: 'category' }),
            'id': () => {
                categoryId = number;
            }
        }
        responseCategory[status].call();

        if(errors.isEmpty()){
            // Crear producto         
            let product = {
                name: req.body.name,
                description: req.body.description,
                category_id: categoryId,
                active: active,
                price: parseFloat(req.body.price)
            }
    
            await db.Product.create(product);
            res.redirect('/manage/products');
        }
        else{
            res.render('./manage/products/createProduct', { errors: errors.mapped(), old: req.body, categories: categories });
        }
    },

    editForm: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id, { include: [{ association: "category" }] });
        let categories = await db.ProductCategory.findAll();

        req.session.ProductIdImage = product.id;  // Para poner el id en el nombre de la foto
        res.render('./manage/products/editProduct', { product: product, categories: categories });
    },

    editProduct: async (req, res) => {
        let errors = validationResult(req);
        let product = await db.Product.findByPk(req.params.id, { include: [{ association: "category" }] });
        let categories = await db.ProductCategory.findAll();
        let categoryId;
        let [status, number] = await verifyCategories(req.body);

        // Validación del formato de la foto
        if(req.fileValidationError) {
            errors.errors.push({ msg: 'La imagen debe tener un formato válido', param: 'image' });
        }

        // Validación de las categoría
        const responseCategory = {
            'blank': () => errors.errors.push({ msg: 'Debes escribir un nombre para la nueva categoría', param: 'category' }),
            'exists': () => errors.errors.push({ msg: 'La categoría ya existe', param: 'category' }),
            'notexists': () => errors.errors.push({ msg: 'La categoría no existe', param: 'category' }),
            'id': () => {
                categoryId = number;
            }
        }
        responseCategory[status].call();

        if(errors.isEmpty()){
            // Editar producto
            await db.Product.update(
                {
                    name: req.body.name,
                    description: req.body.description,
                    price: parseFloat(req.body.price),
                    image: (req.file) ? req.file.filename : product.image,
                    category_id: categoryId
                },
                { where: { id: req.params.id } }
            );
            res.redirect('/manage/products/' + product.id);
        }
        else{
            res.render('./manage/products/editProduct', { errors: errors.mapped(), old: req.body, product: product, categories: categories });
        }
    },
    deleteProduct: async (req, res) => {
        await db.Product.destroy({ where: { id: req.params.id } });
        res.redirect('/manage/products');
    }
}

async function verifyCategories(body){
    let inputCategory = body.category;

    // Comprobar si se creó una nueva categoría
    if(body.category == 'addcategory'){
        if(body.newcategory && body.newcategory.trim().length > 0){ // Tiene nombre la nueva categoría
            let exists = await db.ProductCategory.findOne({ where: { name: body.newcategory } });
            // Comprobar si ya existe una categoría con el mismo nombre
            if(exists){
                return ['exists'];
            }
            else{
                await db.ProductCategory.create({ name: body.newcategory });
                inputCategory = body.newcategory;
            }
        }else{ // Está en blanco la nueva categoría
            return ['blank'];
        }
    }

    let category = await db.ProductCategory.findOne({ where: { name: inputCategory } });

    if(category){ // Categoría existente correcta
        return ['id', category.id];
    }else{ // La categoría no existe en la base de datos
        return ['notexists'];
    }
}

module.exports = controller;