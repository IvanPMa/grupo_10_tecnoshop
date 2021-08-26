const { sequelize } = require('../database/models');
const db = require('../database/models');

const controller = {
    index: async (req, res) => {
        let productsInAGroup = 12;

        let recomendados = await db.Product.findAll({
            include: [{ association: "category" }, { association: "models" }],
            order: sequelize.random(),
            limit: productsInAGroup
        });
        
        let masVendidos = await db.Product.findAll({
            include: [{ association: "shoppingcarts", attributes: [] }],
            group: ['id'],
            order: [[sequelize.fn('SUM', sequelize.col('shoppingcarts.quantity')), 'DESC']],
            limit: productsInAGroup,
            subQuery: false
        });

        let recientes = await db.Product.findAll({
            order: [['id', 'DESC']],
            limit: productsInAGroup
        });
        
        let homeProducts = [{
            name: "Productos recomendados",
            products: recomendados
        },
        {
            name: "Los más vendidos",
            products: masVendidos
        },
        {
            name: "Agregados recientemente",
            products: recientes
        }];

        res.render('home', { productGroup: homeProducts });
    },
}

module.exports = controller;