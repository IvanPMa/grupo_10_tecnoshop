const db = require('../database/models');
const Op = db.Sequelize.Op;

const controller = {
    detail: async (req, res) => {
        let product = await db.Product.findByPk(req.params.id, { include: [{ association: 'category' }, { association: 'models' }] });
        
        // Si el producto no existe o no esta activo redireccionar al home
        if(!product || !product.active) res.redirect('/');
        else res.render('./products/productDetail', { product: product });
    },

    search: async (req, res) => {
        let limit = 2;
        let text = req.query.search;

        let params = {
            include: [{ association: 'category' }],
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${text}%` } },
                    { '$category.name$': { [Op.like]: `%${text}%` }}
                ]
            }
        }
        
        let numberOfProducts = await db.Product.count(params);
        let page;
        let pages = Math.ceil(numberOfProducts/limit);
        
        // Validaciones para que 'pages' sea un número entre el 1 y el número de páginas
        if(req.query.page < 0 || isNaN(req.query.page)) page = 1;
        else if(req.query.page > numberOfProducts) page = pages;
        else page = parseInt(req.query.page);

        let offset = limit * (page - 1);

        let searchedProducts = await db.Product.findAll({
            ...params,
            subQuery: false,
            limit,
            offset
        });

        let search = {
            text,
            page,
            pages,
            firstPage: function(){ return this.page == 1 },
            lastPage: function(){ return this.page == this.pages }
        }

        // Para que no aparezca el url con page=1
        if(page == 1 && req.url.includes('&page=1')) res.redirect('products?search=' + text);
        else res.render('./products/productSearch', { products: searchedProducts, search });
    }
}

module.exports = controller;