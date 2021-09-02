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

        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        model_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
        },

        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };

    let config = {
        timestamps: false
    };

    const ShoppingCart = sequelize.define('ShoppingCart', cols, config);

    ShoppingCart.associate = function(models){
        ShoppingCart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });

        ShoppingCart.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });

        ShoppingCart.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'model_id'
        });
    }

    return ShoppingCart;
}