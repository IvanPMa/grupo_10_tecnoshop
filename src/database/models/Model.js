module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };

    let config = {
        timestamps: false
    };

    const Model = sequelize.define('Model', cols, config);

    Model.associate = function(models){
        Model.belongsToMany(models.Product, {
            as: 'products',
            through: 'Product_Model',
            foreignKey: 'model_id',
            otherKey: 'product_id',
            timestamps: false
        });

        Model.hasMany(models.ShoppingCart, {
            as: "shoppingcarts",
            foreignKey: "model_id"
        });
    }

    return Model;
}