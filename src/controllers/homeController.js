const db = require('../database/models');

const controller = {
    index: async (req, res) => {
        let general = {
            where: { active: true },
            limit: 12,
        }

        let recomendados = await db.Product.findAll({
            ...general,
            include: [{ association: "category" }, { association: "models" }],
            order: db.sequelize.random()
        });

        let masVendidos = await db.Product.findAll({
            ...general,
            include: [{ association: 'check_product', attributes: [] }],
            group: ['id'],
            order: [[db.sequelize.fn('SUM', db.sequelize.col('check_product.quantity')), 'DESC']],
            subQuery: false
        });

        let recientes = await db.Product.findAll({
            ...general,
            order: [['id', 'DESC']]
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

    darkMode: async (req, res) => {
        let darkModeActive = Boolean(parseInt(req.params.darkmode));
        
        res.cookie('darkMode', darkModeActive, { maxAge: 60 * (1000 * 60) });

        if(req.session.userLogged){
            await db.User.update({ dark_mode: darkModeActive }, { where: { id: req.session.userLogged.id } });
        }
        res.redirect(req.session.previousPage);
    }
}

module.exports = controller;