const express = require ("express");
const path = require ("path");
const fs = require('fs');

let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json' )));

module.exports = {
    index : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/web/index.ejs"), {products, titulo: 'Bhoomi - Cosmetica Natural'});
    }
}