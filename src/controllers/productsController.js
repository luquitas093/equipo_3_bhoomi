const express = require ("express");
const path = require ("path");
const fs = require('fs');
const db = require ("../../database/models");
const sequelize = db.sequelize;
const {Op} = require("sequelize");

module.exports = {
    list: (req,res) => {
        db.Product.findAll({
            include : [{association: "category"}]
        })
        .then (function(products) {
            return res.render(path.resolve(__dirname, '../views/products/productList.ejs'), {
                titulo: 'Bhoomi - Listado de Productos',
                products: products
            });
        });
    },
    detail: (req,res) => {
        db.Product.findByPk(req.params.id, {
            include: [{association: "category"}]
        })
        .then (function(product) {
            return res.render(path.resolve(__dirname,'../views/products/productDetail.ejs'), {
                titulo: 'Bhoomi - Detalle Producto',
                product: product
            })
        })
    }
}