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
        let shoppingcarts = await db.ShoppingCart.findAll({
            include: [{ association: 'user'}]
        });

        res.send(shoppingcarts);
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