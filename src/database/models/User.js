module.exports = (sequelize, dataTypes) => {
    let cols = {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: dataTypes.INTEGER
        },
        
        first_name: {
            allowNull: false,
            type: dataTypes.STRING(40)
        },

        last_name: {
            allowNull: false,
            type: dataTypes.STRING(40)
        }
    };

    let config = {
        timestamps: false
    };

    const User = sequelize.define("Users", cols, config);

    return User;
}