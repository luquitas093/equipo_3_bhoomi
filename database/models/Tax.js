module.exports = function (sequelize, dataTypes) {
    let alias = "Tax";
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
            type: dataTypes.FLOAT
        }
    };
    let config = {
        tableName: "tax",
        timestamps: false
    }
    let tax = sequelize.define (alias, cols, config);

    return tax;
}