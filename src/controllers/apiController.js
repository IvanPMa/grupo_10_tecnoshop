const db = require('../database/models');

const controller = {
    getAllUsers: async (req, res) => {
        let url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
	    let order = (req.query.order && req.query.order.toUpperCase() == 'DESC') ? 'DESC' : 'ASC';
        let page = (req.query.page && parseInt(req.query.page) > 0) ? parseInt(req.query.page) : null;
        let limit = (page) ? 10 : null;
        let offset = (page) ? limit * (page - 1) : null;
        let next = null;
        let previous = null;
        let count = await db.User.count();

        if(page && count > (limit * page)){
            url.searchParams.set('page', page + 1);
            next = url.href;
        }
        if(page && page > 1){
            url.searchParams.set('page', page - 1);
            previous = url.href;
        }

        try {
            let users = await db.User.findAll({
                attributes: [
                    'id',
                    [db.Sequelize.fn('concat', db.Sequelize.col('first_name'), ' ', db.Sequelize.col('last_name')), 'name'],
                    'email',
                    [db.Sequelize.fn('concat', url.origin + '/api/users/', db.Sequelize.col('id')), 'detail']
                ],
                order: [['id', order]],
                limit,
                offset
            });
            res.json({ count, next, previous, users });
        } catch (error) {
            res.json(error);
        }
    },

    getUser: async (req, res) => {
        let url = req.protocol + '://' + req.get('host') + '/images/users/';

        try {
            let user = await db.User.findByPk(req.params.id, {
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    [db.Sequelize.fn('concat', url, db.Sequelize.col('image')), 'image'],
                    'promotion',
                    'dark_mode'
                ]
            });
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },

    getAllProducts: async (req, res) => {
        let url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
	    let order = (req.query.order && req.query.order.toUpperCase() == 'DESC') ? 'DESC' : 'ASC';
        let page = (req.query.page && parseInt(req.query.page) > 0) ? parseInt(req.query.page) : null;
        let limit = (page) ? 10 : null;
        let offset = (page) ? limit * (page - 1) : null;
        let next = null;
        let previous = null;
        let count = await db.Product.count();
        let countByCategory = {};
        
        if(page && count > (limit * page)){
            url.searchParams.set('page', page + 1);
            next = url.href;
        }
        if(page && page > 1){
            url.searchParams.set('page', page - 1);
            previous = url.href;
        }

        try {
            // Get all products
            let products = await db.Product.findAll({
                include: [{ association: 'category', attributes: [] }],
                attributes: [
                    'id',
                    'name',
                    'description',
                    [db.Sequelize.col('category.name'), 'categoryName'],
                    [db.Sequelize.fn('concat', url.origin + '/api/products/', db.Sequelize.col('product.id')), 'detail']
                ],
                order: [['id', order]],
                limit,
                offset
            });
            // Get all categories
            let categories = await db.ProductCategory.findAll({
                include: [{ association: 'products', attributes: [] }],
                attributes: ['name', [db.Sequelize.fn('count', 'products'), 'count']],
                group: 'id'
            });
            // Count products by categories
            categories.forEach(c => {
                countByCategory[c.name] = c.dataValues.count
            });
            res.json({ count, countByCategory, next, previous, products });
        } catch (error) {
            res.json(error);
        }
    },

    getProduct: async (req, res) => {
        let url = req.protocol + '://' + req.get('host') + '/images/products/';

        try {
            let product = await db.Product.findByPk(req.params.id, {
                include: [
                    { association: 'category', attributes: [] },
                    { association: 'models', through: { attributes: [] } }
                ],
                attributes: [
                    'id',
                    'name',
                    'description',
                    'price',
                    [db.Sequelize.fn('concat', url, db.Sequelize.col('image')), 'image'],
                    'active',
                    [db.Sequelize.col('category.name'), 'categoryName']
                ]
            });
            res.json(product);
        } catch (error) {
            res.json(error);
        }
    },

    createProduct: async (req, res) => {
        let product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category,
            active: req.body.active
        }
        res.json(product);

        try {
            //let category = await db.ProductCategory.findOne({ where: { name: req.body.category } });
            //product.category_id = category.id;
            await db.Product.create(product);
            res.json(product);
        } catch (error) {
            res.json(error);
        }
    },

    updateProduct: async (req, res) => {
        let productUpdated = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category_id: req.body.category_id,
            active: req.body.active
        }

        try {
            await db.Product.update(productUpdated, { where: { id: req.body.id } });
            res.json(productUpdated);
        } catch (error) {
            res.json(error);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            let status = await db.Product.destroy({ where: { id: req.body.id }});
            res.json(status);
        } catch (error) {
            res.json(error);
        }
    },

    sales: async (req, res) => {
        let url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        let urlimg = req.protocol + '://' + req.get('host') + '/images/products/';

        try {
            // Total de ventas
            let totalSales = await db.Check.count();

            // Total de productos vendidos
            let totalProductsSold = await db.Check_Product.sum('quantity');

            // Los cinco productos más vendidos
            let bestSellers = await db.Product.findAll({
                include: [
                    { association: 'check_product', attributes: [] },
                    { association: 'category', attributes: [] }],
                attributes: [
                    'id', 
                    'name',
                    'description',
                    [db.sequelize.col('category.name'), 'categoryName'],
                    [db.Sequelize.fn('concat', urlimg, db.Sequelize.col('image')), 'image'],
                    [db.sequelize.fn('SUM', db.sequelize.col('check_product.quantity')), 'sold'],
                    [db.Sequelize.fn('concat', url.origin + '/api/products/', db.Sequelize.col('product.id')), 'detail']
                ],
                group: ['id'],
                order: [[db.sequelize.fn('SUM', db.sequelize.col('check_product.quantity')), 'DESC']],
                limit: 5,
                subQuery: false
            });

            // Todos los productos vendidos ordenados por fecha de venta
            let allProductsSold = await db.Product.findAll({
                include: [
                    { association: 'checks', required: true, attributes: [] },
                    { association: 'category', attributes: [] }],
                attributes: [
                        'id', 
                        'name',
                        'description',
                        [db.sequelize.col('category.name'), 'categoryName'],
                        [db.Sequelize.fn('concat', urlimg, db.Sequelize.col('image')), 'image'],
                        [db.sequelize.col('checks.date'), 'date'],
                        [db.Sequelize.fn('concat', url.origin + '/api/products/', db.Sequelize.col('product.id')), 'detail']
                    ],
                order: [[db.sequelize.col('date'), 'DESC']],
                subQuery: false
            });

            // Últimos cinco productos vendidos
            let lastSold = [];
            for(let i = 0; i < 5; i++){
                if(allProductsSold[i]) lastSold.push(allProductsSold[i]);
            }
            
            res.json({ totalSales, totalProductsSold, lastSold, bestSellers });
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = controller;