module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        active: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        }
    };

    let config = {
        timestamps: false
    };

    const ShoppingCart = sequelize.define('ShoppingCart', cols, config);

    ShoppingCart.associate = function(models){
        // Usuario al que pertenece el carrito de compras
        ShoppingCart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });

        // Productos que contiene el carrito de compras
        ShoppingCart.belongsToMany(models.Product, {
            as: 'products',
            through: 'ShoppingCart_Product',
            foreignKey: 'shoppingcart_id',
            otherKey: 'product_id',
            timestamps: false
        });
    }

    return ShoppingCart;
}