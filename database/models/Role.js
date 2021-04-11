module.exports = function (sequelize, dataTypes) {
    let alias = "Role";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "role",
        timestamps: false
    }
    let role = sequelize.define (alias, cols, config);

    role.associate = function (models) {
        role.hasMany (models.User, {
            as: "users",
            foreignKey: "role_id"
        });
    };

    return role;
}