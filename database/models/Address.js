module.exports = function (sequelize, dataTypes) {
    let alias = "Address";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        street: {
            type: dataTypes.STRING
        },
        number: {
            type: dataTypes.STRING
        },
        floor: {
            type: dataTypes.STRING
        },
        cp:  {
            type: dataTypes.STRING
        },
        city: {
            type: dataTypes.STRING
        },
        province: {
            type: dataTypes.STRING
        },
        country: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: "address",
        timestamps: false
    }
    let address = sequelize.define (alias, cols, config);

    address.associate = function (models) {
        address.belongsTo (models.User, {
            as: "users",
            foreignKey: "addressId"
        })
    };

    return address;
}