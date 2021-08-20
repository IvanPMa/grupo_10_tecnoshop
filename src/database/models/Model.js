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

    return Model;
}