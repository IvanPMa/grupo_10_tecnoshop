const db = require('../database/models');
const Op = db.Sequelize.Op;

const controller = {
    detail: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id);

        req.session.currentUrl = '/products/' + req.params.id;
        res.render('./products/productDetail', {product: product});
    },

    search: async (req, res) => {
        let searchedProducts = await db.Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.query.search}%`
                }
            }
        });

        req.session.currentUrl = '/products?search=' + req.query.search;
        res.render('./products/productSearch', { products: searchedProducts, search: req.query.search });
    }
}

module.exports = controller;