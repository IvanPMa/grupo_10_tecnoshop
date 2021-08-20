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

    const ProductCategory = sequelize.define('ProductCategory', cols, config);

    return ProductCategory;
}