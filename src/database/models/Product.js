const ProductCategory = require("./ProductCategory");

module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        description: {
            type: dataTypes.STRING(200),
            allowNull: false
        },

        price: {
            type: dataTypes.DECIMAL,
            allowNull: false,
        },

        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        timestamps: false
    };

    const Product = sequelize.define('Product', cols, config);

    Product.associate = function(models){
        // Categoría del producto (celulares, videojuegos, accesorios, etc)
        Product.belongsTo(models.ProductCategory, {
            as: "category",
            foreignKey: "category_id"
        });

        // Modelos del producto (colores, tallas, etc)
        Product.belongsToMany(models.Model, {
            as: 'models',
            through: 'Product_Model',
            foreignKey: 'product_id',
            otherKey: 'model_id',
            timestamps: false
        });

        /*
        // Carritos de compras que tienen el producto
        Product.belongsToMany(models.ShoppingCart, {
            as: 'shoppingcarts',
            through: 'ShoppingCart_Product',
            foreignKey: 'product_id',
            otherKey: 'shoppingcart_id',
            timestamps: false
        });
        */

        // Carritos de compras que tienen el producto
        Product.hasMany(models.ShoppingCart_Product, {
            as: "shoppingcarts",
            foreignKey: "product_id"
        });
    }

    return Product;
}