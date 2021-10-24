module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },

        model_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }
    };

    let config = {
        tableName: 'Product_Model',
        timestamps: false
    };

    const Product_Model = sequelize.define('Product_Model', cols, config);

    return Product_Model;
}