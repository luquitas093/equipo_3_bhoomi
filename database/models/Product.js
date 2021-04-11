module.exports = function (sequelize, dataTypes) {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.NUMERIC
        },
        price: {
            type: dataTypes.FLOAT
        }
    };
    let config = {
        tableName: "products",
        timestamps: false
    }
    let product = sequelize.define (alias, cols, config);

    product.associate = function (models) {
        product.belongsTo (models.Category, {
            as: "category",
            foreignKey: "category_id"
        })
    };

    return product;
}