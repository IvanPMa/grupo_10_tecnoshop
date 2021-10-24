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
            allowNull: false,
        }
    };

    let config = {
        timestamps: false
    };

    const UserCategory = sequelize.define('UserCategory', cols, config);

    UserCategory.associate = function(models){
        UserCategory.hasMany(models.User, {
            as: "users",
            foreignKey: "category_id"
        });
    }

    return UserCategory;
}