module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        check_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        quantity: {
            type: dataTypes.INTEGER,
            allowNull: true,
        }
    };

    let config = {
        tableName: 'Check_Product',
        timestamps: false
    };

    const Check_Product = sequelize.define('Check_Product', cols, config);

    return Check_Product;
}