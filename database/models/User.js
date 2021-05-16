module.exports = function (sequelize, dataTypes) {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        date: {
            type: dataTypes.DATE
        },
        phone: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        passwordHash: {
            type: dataTypes.STRING
        },
        addressId: {
            type: dataTypes.INTEGER
        },
        roleId: {
            type: dataTypes.INTEGER
        },
    };
    let config = {
        tableName: "users",
        timestamps: false
    }
    let user = sequelize.define (alias, cols, config);

    user.associate = function (models) {
        user.hasMany (models.Address, {
            as: "addresses",
            foreignKey: "addressId"
        });
        user.belongsTo (models.Role, {
            as: "role",
            foreignKey: "roleId"
        });
    };

    return user;
}