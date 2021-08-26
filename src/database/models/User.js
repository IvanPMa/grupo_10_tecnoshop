module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        first_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        last_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
            unique: true
        },

        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        promotion: {
            type: dataTypes.BOOLEAN,
            allowNull: false
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

    const User = sequelize.define('User', cols, config);

    User.associate = function(models){
        // Categoría del usuario (usuario normal, administrador, etc)
        User.belongsTo(models.UserCategory, {
            as: "category",
            foreignKey: "category_id"
        });

        // Productos que ha comprado el usuario
        User.hasMany(models.ShoppingCart, {
            as: "shoppingcarts",
            foreignKey: "user_id"
        });
    }

    return User;
}