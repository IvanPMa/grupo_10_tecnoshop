const db = require('../database/models');

const controller = {
    getAllUsers: async (req, res) => {
        let url = req.protocol + '://' + req.get('host') + '/api/users/';
        let page = req.query.page;
        let users = await db.User.findAll({
            attributes: [
                'id',
                [db.Sequelize.fn('concat', db.Sequelize.col("first_name"), ' ', db.Sequelize.col("last_name")), 'name'],
                'email',
                [db.Sequelize.fn('concat', url, db.Sequelize.col('id')), 'detail']
            ]
        });
        let count = await db.User.count();
        let data = {
            count,
            users
        }

        if(!isNaN(page) && page > 0){
            res.json(page);
        }
        res.json(data);
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
        let products = await db.Product.findAll();
        res.json(products);
    },

    getProduct: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id);
        res.json(product);
    }
}

module.exports = controller;