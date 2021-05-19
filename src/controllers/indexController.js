const express = require ("express");
const path = require ("path");
const fs = require('fs');
const db = require ("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    index : (req,res) => {
        db.Product.findAll ({
            include: [{association: "category"}]
        })
        .then (products => {
            return res.render (path.resolve (__dirname, "../views/web/index.ejs"), {products, titulo: 'Bhoomi - Cosmetica Natural'});
        });
    },
    error404 : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/web/404.ejs"), {titulo: 'Error-404'});
    },
    search : (req,res) => {
        db.Product.findAll({
              where:  {
                    name : {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                },
            include: [ {association: 'category'} ]
        })
        .then(results => {
            return res.render (path.resolve (__dirname, "../views/web/index.ejs"), {results, titulo: 'Bhoomi - Cosmetica Natural'})
        })
        .catch(error => res.send(error))
    }
}