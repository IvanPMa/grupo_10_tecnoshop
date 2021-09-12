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
        let categories = await db.ProductCategory.findAll();            // Todas las categorías para mostrar en los filtros
        let limit = 8;                                                  // Número de productos a mostrar por página
        let text = req.query.search;                                    // Texto que buscó el usuario
        let category = req.query.category || '';                        // Filtro: Categoría
        let minPrice = req.query.min || 0;                              // Filtro: Precio mínimo
        let maxPrice = req.query.max || 999999;                         // Filtro: Precio máximo

        // Condiciones de busqueda
        let params = {
            include: [{ association: 'category' }],
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${text}%` } },
                    { '$category.name$': { [Op.like]: `%${text}%` }}
                ],
                '$category.name$': { [Op.like]: `%${category}%` },
                price: {
                    [Op.gte]: minPrice,
                    [Op.lte]: maxPrice
                }
            }
        }
        
        let numberOfProducts = await db.Product.count(params);          // Número de productos totales que cumplen con las condiciones
        let page;                                                       // Página actual
        let pages = Math.ceil(numberOfProducts/limit) || 1;             // Número de páginas que va mostrar (mínimo 1)
        
        // Validaciones para que 'pages' sea un número entre el 1 y el número de páginas
        if(req.query.page < 0 || isNaN(req.query.page)) page = 1;
        else if(req.query.page > numberOfProducts) page = pages;
        else page = parseInt(req.query.page);

        let offset = limit * (page - 1);

        // Buscar los productos en la base de datos con las condiciones de busqueda
        let searchedProducts = await db.Product.findAll({
            ...params,
            subQuery: false,
            limit,
            offset
        });
    
        // Variables para pasar a la página de busquedas
        let url = req.url.split('&page')[0];
        let search = {
            text,
            page,
            pages,
            firstPage: function(){ return this.page == 1 },
            lastPage: function(){ return this.page == this.pages }
        }

        // Para que no aparezca el url con page=1
        if(page == 1 && req.url.includes('&page=1')) res.redirect('/products' + url);
        else res.render('./products/productSearch', { products: searchedProducts, search, categories, url, old: req.query });
    }
}

module.exports = controller;