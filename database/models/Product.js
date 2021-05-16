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
        quantity: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.FLOAT
        },
        categoryId: {
            type: dataTypes.INTEGER
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
            foreignKey: "categoryId"
        })
    };

    return product;
}