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

        model_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
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

    Check_Product.associate = function(models){
        Check_Product.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id'
        });

        Check_Product.belongsTo(models.Model, {
            as: 'model',
            foreignKey: 'model_id'
        });
    }

    return Check_Product;
}