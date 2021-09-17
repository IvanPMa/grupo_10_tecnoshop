const db = require('../database/models');

const controller = {
    getAllUsers: async (req, res) => {
        let url = req.protocol + '://' + req.get('host') + '/api/users/';
        let page = (isNaN(req.query.page) || req.query.page <= 0) ? 1 : parseInt(req.query.page);
        let offset = 10 * (page - 1);
        let count = await db.User.count();
        let next = (count > (10 * page)) ? `${url}?page=${page + 1}` : null;
        let previous = (page > 1) ? `${url}?page=${page - 1}` : null;
        let users = await db.User.findAll({
            attributes: [
                'id',
                [db.Sequelize.fn('concat', db.Sequelize.col('first_name'), ' ', db.Sequelize.col('last_name')), 'name'],
                'email',
                [db.Sequelize.fn('concat', url, db.Sequelize.col('id')), 'detail']
            ],
            limit: 10,
            offset
        });

        res.json({ count, next, previous, users });
    },

    getUser: async (req, res) => {
        let url = req.protocol + '://' + req.get('host') + '/images/users/';
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
    },

    getAllProducts: async (req, res) => {
        let url = req.protocol + '://' + req.get('host') + '/api/products/';
        let page = (isNaN(req.query.page) || req.query.page <= 0) ? 1 : parseInt(req.query.page);
        let offset = 10 * (page - 1);
        let count = await db.Product.count();
        let next = (count > (10 * page)) ? `${url}?page=${page + 1}` : null;
        let previous = (page > 1) ? `${url}?page=${page - 1}` : null;
        let countByCategory = {};

        let products = await db.Product.findAll({
            include: [{ association: 'category', attributes: [] }],
            attributes: [
                'id',
                'name',
                'description',
                [db.Sequelize.col('category.name'), 'categoryName'],
                [db.Sequelize.fn('concat', url, db.Sequelize.col('product.id')), 'detail']
            ],
            limit: 10,
            offset
        });

        let categories = await db.ProductCategory.findAll({
            include: [{ association: 'products', attributes: [] }],
            attributes: ['name', [db.Sequelize.fn('count', 'products'), 'count']],
            group: 'id'
        });
        
        categories.forEach(c => {
            countByCategory[c.name] = c.dataValues.count
        });

        res.json({ count, countByCategory, next, previous, products });
    },

    getProduct: async (req, res) => {
        let url = req.protocol + '://' + req.get('host') + '/images/products/';
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
    }
}

module.exports = controller;