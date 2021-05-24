const express = require ("express");
const path = require ("path");
const fs = require('fs');
const db = require ("../../database/models");
const sequelize = db.sequelize;
const {Op} = require("sequelize");

module.exports = {
    list: (req,res) => {
        db.Product.findAll({
            order : [
                [req.query.order ? req.query.order : "name", 'ASC']               
            ],
            include : [{association: "category"}]
        })
        .then (function(products) {
            return res.render(path.resolve(__dirname, '../views/products/productList.ejs'), {
                titulo: 'Bhoomi - Listado de Productos',
                products: products,
                order: req.query.order
            })
        })
        .catch(error => res.send(error))
    },
    detail: (req,res) => {
        const products = db.Product.findAll({
            include: [{association: "category"}]
        })
        const product = db.Product.findByPk(req.params.id, {
            include: [{association: "category"}]
        })
        Promise.all ([products, product])
        .then (function([products, product]) {
            return res.render(path.resolve(__dirname,'../views/products/productDetail.ejs'), {
                titulo: 'Bhoomi - Detalle Producto',
                product: product,
                products: products

            })
        })
        .catch(error => res.send(error))
    },
    categories: (req, res) => {
       const categories = db.Category.findAll();
       const products = db.Product.findAll({
           where: {categoryId : req.params.id},
           order : [
            [req.query.order ? req.query.order : "name", 'ASC']               
        ],
           include: [{association: "category"}]
       })
       Promise.all([products,categories])
       .then(([products,categories]) => {
        return res.render(path.resolve(__dirname, '../views/products/productCategories.ejs'), {
            titulo: 'Bhoomi - Listado de Productos',
            products: products,
            categories: categories,
            order: req.query.order,
            id: req.params.id
       })   
    })
    },
}