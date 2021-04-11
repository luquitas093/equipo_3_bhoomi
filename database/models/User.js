module.exports = function (sequelize, dataTypes) {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        date: {
            type: dataTypes.DATE
        },
        address_id: {
            type: dataTypes.INTEGER
        },
        phone: {
            type: dataTypes.NUMERIC
        },
        avatar: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password_hash: {
            type: dataTypes.STRING
        },
        role_id: {
            type: dataTypes.INTEGER
        },
    };
    let config = {
        tableName: "users",
        timestamps: false
    }
    let user = sequelize.define (alias, cols, config);

    user.associate = function (models) {
        user.belongsTo (models.Address, {
            as: "address",
            foreignKey: "address_id"
        });
        user.belongsTo (models.Role, {
            as: "role",
            foreignKey: "role_id"
        });
    };

    return user;
}