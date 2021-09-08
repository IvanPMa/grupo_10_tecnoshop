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
            include: [{
                association: 'shoppingcart',
                attributes: [[db.Sequelize.fn('SUM', db.Sequelize.literal('quantity')), 'cantidad'], [db.Sequelize.fn('SUM', db.Sequelize.literal('price*quantity')), 'total']],
                include: [{ association: 'product' }, { association: 'model' }],
                required: true,
            }],
            group: ['product_id', 'model_id'],
            order: [['id', 'ASC']]
        });
        
        let usersShoppingTotal = await db.User.findAll({
            include: [{
                association: 'shoppingcart',
                required: true,
                include: [{ association: 'product' }]
            }],
            attributes: [[db.Sequelize.fn('SUM', db.Sequelize.literal('quantity*price')), 'total']],
            group: ['id'],
            order: [['id', 'ASC']]
        });

        res.render('./manage/shoppingcarts', { users: usersWithShoppingCart, usertotal: usersShoppingTotal });
    },

    models: async (req, res) => {
        let models = await db.Model.findAll();

        res.render('./manage/models', { models });
    },

    addModel: async (req, res) => {
        let models = await db.Model.findAll();
        let modelName = req.body.newmodel;
        let modelss = await db.Model.findAll({ where: { name: modelName } });

        if(modelss.length > 0){
            res.render('./manage/models', { models, errors: { delete: { msg: 'No se puede crear el modelo porque ya existe ese nombre' }}});
        }
        else{
            await db.Model.create({ name: req.body.newmodel });
            res.redirect('/manage/models');
        }
    },

    deleteModel: async (req, res) => {
        let modelToDelete = await db.Model.findByPk(req.params.id, { include: [{ association: 'products' }] });
        if(modelToDelete.products.length > 0){
            let models = await db.Model.findAll();
            res.render('./manage/models', { models, errors: { delete: { msg: 'No se puede borrar el modelo porque hay productos usándolo' }}});
        }
        else{
            await db.Model.destroy({ where: { id: req.params.id } });
            res.redirect('/manage/models');
        }
    },

    categories: async (req, res) => {
        let productCategories = await db.ProductCategory.findAll();
        let userCategories = await db.UserCategory.findAll();

        res.send(userCategories);
    }
}

module.exports = controller;