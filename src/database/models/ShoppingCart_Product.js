module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        shoppingcart_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };

    let config = {
        tableName: 'ShoppingCart_Product',
        timestamps: false
    };

    const ShoppingCart_Product = sequelize.define('ShoppingCart_Product', cols, config);

    
    ShoppingCart_Product.associate = function(models){
        ShoppingCart_Product.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        });
    }

    return ShoppingCart_Product;
}