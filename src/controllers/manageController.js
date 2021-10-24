const db = require('../database/models');

const controller = {
    index: (req, res) => {
        res.render('./manage/index');
    },

    checks: async (req, res) => { // YA
        //let checks2 = await db.Check.findAll({ include: [{ association: 'user' }, { association: 'products', include: [{ association:'check_product'}] }, { association: 'model' }] });
        let checks = await db.Check.findAll({
            include: [
                {
                    association: 'user'
                },
                {
                    association: 'check_product',
                    attributes: ['quantity', [db.Sequelize.literal('quantity*price'), 'total']],
                    include: [{ association: 'product' }, { association: 'model' }]
                }
            ]
        });
        //res.send(checks);
        console.log(checks[0]);
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
    
    categories: async (req, res) => {
        let productCategories = await db.ProductCategory.findAll();
        let userCategories = await db.UserCategory.findAll();
        res.render('./manage/categories', { productCategories, userCategories });
    },

    addModel:               (req, res) => createModel(req.body.newmodel, db.Model, '/manage/models', res),
    addUserCategory:        (req, res) => createModel(req.body.newcategory, db.UserCategory, '/manage/categories', res),
    addProductCategory:     (req, res) => createModel(req.body.newcategory, db.ProductCategory, '/manage/categories', res),
    deleteModel:            (req, res) => deleteModel(req.params.id, 'products', db.Model, '/manage/models', res),
    deleteUserCategory:     (req, res) => deleteModel(req.params.id, 'users', db.UserCategory, '/manage/categories', res),
    deleteProductCategory:  (req, res) => deleteModel(req.params.id, 'products', db.ProductCategory, '/manage/categories', res)
}

async function createModel(name, model, route, res){
    let modelExists = await model.findAll({ where: { name: name } });

    if(modelExists.length > 0){
        let models = await db.Model.findAll();
        let productCategories = await db.ProductCategory.findAll();
        let userCategories = await db.UserCategory.findAll();

        res.render('.' + route, {
            models,
            productCategories,
            userCategories,
            errors: { delete: { msg: 'No se puede crear porque ya existe ese nombre' }}
        });
    }
    else{
        await model.create({ name: name });
        res.redirect(route);
    }
}

async function deleteModel(pk, association, model, route, res){
    let modelToDelete = await model.findByPk(pk, { include: [{ association: association }] });

    if(modelToDelete[association].length > 0){
        let models = await db.Model.findAll();
        let productCategories = await db.ProductCategory.findAll();
        let userCategories = await db.UserCategory.findAll();

        res.render('.' + route, {
            models,
            productCategories,
            userCategories,
            errors: { delete: { msg: 'No se puede borrar porque hay otras tablas usándolo' }}});
    }
    else{
        await model.destroy({ where: { id: pk } });
        res.redirect(route);
    }
}

module.exports = controller;