module.exports = function (sequelize, dataTypes) {
    let alias = "Country";
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
        tableName: "country",
        timestamps: false
    }
    let country = sequelize.define (alias, cols, config);

    country.associate = function (models) {
        country.hasMany (models.Country, {
            as: "address",
            foreignKey: "country_id"
        })
    };
    
    return country;
}