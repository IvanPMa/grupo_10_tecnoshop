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

        date: {
            type: dataTypes.DATE,
            allowNull: false,
        },

        total: {
            type: dataTypes.DECIMAL,
            allowNull: false,
        }
    };

    let config = {
        timestamps: false
    };

    const Check = sequelize.define('Check', cols, config);

    Check.associate = function(models){
        Check.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });

        Check.hasMany(models.Check_Product, {
            as: 'check_product',
            foreignKey: 'check_id'
        })

        Check.belongsToMany(models.Product, {
            as: 'products',
            through: 'Check_Product',
            foreignKey: 'check_id',
            otherKey: 'product_id',
            timestamps: false
        });

        Check.belongsToMany(models.Model, {
            as: 'model',
            through: 'Check_Product',
            foreignKey: 'check_id',
            otherKey: 'model_id',
            timestamps: false
        });
    }

    return Check;
}