const express = require ("express");
const path = require ("path");

module.exports = {
    list : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/products/productList.ejs"), {titulo: 'Bhoomi - Catálogo'});
    },
}