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

        product_quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };

    let config = {
        timestamps: false
    };

    const ShoppingCart = sequelize.define('ShoppingCart', cols, config);

    return ShoppingCart;
}