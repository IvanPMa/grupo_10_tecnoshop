module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        description: {
            type: dataTypes.STRING(200),
            allowNull: false
        },

        price: {
            type: dataTypes.DECIMAL,
            allowNull: false,
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

    const Product = sequelize.define('Product', cols, config);

    return Product;
}