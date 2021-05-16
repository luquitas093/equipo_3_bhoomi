module.exports = function (sequelize, dataTypes) {
    let alias = "Promo";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        value: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "promo",
        timestamps: false
    }
    let promo = sequelize.define (alias, cols, config);

    return promo;
}