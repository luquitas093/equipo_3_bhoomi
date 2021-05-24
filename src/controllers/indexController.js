const express = require ("express");
const path = require ("path");
const fs = require('fs');
const db = require ("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    index : (req,res) => {
        const categories = db.Category.findAll();
        const products = db.Product.findAll ({
            include: [{association: "category"}]
        })
        Promise.all([products,categories])
        .then(([products,categories]) => {
         return res.render(path.resolve(__dirname, '../views/web/index.ejs'), {
             titulo: 'Bhoomi - Cosmetica Natural',
             products: products,
             categories: categories,
            });
        });
    },
    search : (req,res) => {
        db.Product.findAll({
              where:  {
                    name : {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                },
                order : [
                    [req.query.order ? req.query.order : "name", 'ASC']               
                ],
            include: [ {association: 'category'} ]
        })
        .then(results => {
            return res.render(path.resolve(__dirname, '../views/products/productSearch.ejs'), {
                titulo: 'Bhoomi - Listado de Productos',
                products: results,
                order: req.query.order,
                url: "?keyword=" + req.query.keyword
            })
        })
        .catch(error => res.send(error))
    }
}