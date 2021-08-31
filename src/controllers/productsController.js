const db = require('../database/models');
const Op = db.Sequelize.Op;

const controller = {
    detail: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id, { include: [{ association: 'category' }, { association: 'models' }] });

        res.render('./products/productDetail', { product: product });
    },

    search: async (req, res) => {
        let productsByPage = 2;
        let page = req.query.page > 0 ? parseInt(req.query.page) : 1;

        console.log('\n\n\\nQuery de los productos:');
        console.log(productsByPage);
        console.log(page);
        let searchedProducts = await db.Product.findAll({
            include: [{ association: 'category' }],
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${req.query.search}%` } },
                    { '$category.name$': { [Op.like]: `%${req.query.search}%` }}
                ]
            },
            limit: productsByPage,
            offset: productsByPage * (page - 1),
            subQuery: false
        });

        res.render('./products/productSearch', { products: searchedProducts, search: req.query.search, page });
    }
}

module.exports = controller;