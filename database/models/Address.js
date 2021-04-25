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
            type: dataTypes.NUMERIC
        },
        floor: {
            type: dataTypes.STRING
        },
        cp:  {
            type: dataTypes.NUMERIC
        },
        city: {
            type: dataTypes.STRING
        },
        province: {
            type: dataTypes.STRING
        },
        country_id: {
            type: dataTypes.INTEGER
        },
    };
    let config = {
        tableName: "address",
        timestamps: false
    }
    let address = sequelize.define (alias, cols, config);

    address.associate = function (models) {
        address.belongsTo (models.Country, {
            as: "country",
            foreignKey: "country_id"
        });
        address.belongsTo (models.User, {
            as: "users",
            foreignKey: "address_id"
        })
    };

    return address;
}