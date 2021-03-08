const express = require ("express");
const path = require ("path");
const fs = require('fs');

let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json' )));

module.exports = {
    list : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/products/productList.ejs"), {products, titulo: 'Bhoomi - Catálogo'});
    },
    detail : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/products/productDetail.ejs"), {products, titulo: 'Bhoomi - Detalle del Producto'});
    },
}