const db = require('../database/models');

const controller = {
    index: (req, res) => {
        res.render('./manage/index');
    },

    checks: async (req, res) => { // YA
        let checks = await db.Check.findAll({ include: [{ association: 'user' }, { association: 'products' }] });
        res.render('./manage/checks', { checks });
    },

    shoppingCarts: async (req, res) => {
        let usersWithShoppingCart = await db.User.findAll({
            include: [{ association: 'shoppingcart',
                        required: true,
                        include: [{ association: 'product', attributes: ['name', 'price'] }],
                        attributes: ['quantity', [db.Sequelize.literal('price*quantity'), 'total']],
                        
                    }],
            order: [['id', 'ASC']],
        });
        
        let usersShoppingTotal = await db.User.findAll({
            include: [{ association: 'shoppingcart',
                        required: true,
                        include: [{ association: 'product' }]
                    }],
            group: 'user.id',
            order: [['id', 'ASC']],
            attributes: [[db.Sequelize.fn('SUM', db.Sequelize.literal('quantity*price')), 'total']]
        });

        res.render('./manage/shoppingcarts', { users: usersWithShoppingCart, usertotal: usersShoppingTotal });
    },

    models: async (req, res) => {
        let models = await db.Model.findAll();

        res.send(models);
    },

    categories: async (req, res) => {
        let productCategories = await db.ProductCategory.findAll();
        let userCategories = await db.UserCategory.findAll();

        res.send(userCategories);
    }
}

module.exports = controller;