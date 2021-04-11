module.exports = function (sequelize, dataTypes) {
    let alias = "Category";
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
        tableName: "categories",
        timestamps: false
    }
    let category = sequelize.define (alias, cols, config);

    category.associate = function (models) {
        category.hasMany (models.Product, {
            as: "products",
            foreignKey: "category_id"
        })
    };

    return category;
}