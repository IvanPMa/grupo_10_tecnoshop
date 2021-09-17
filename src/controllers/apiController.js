const db = require('../database/models');

const controller = {
    getAllUsers: async (req, res) => {
        let users = await db.User.findAll();
        res.json(users);
    },

    getUser: async (req, res) => {
        let user = await db.User.findByPk(req.params.id);
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