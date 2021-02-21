const express = require ("express");
const path = require ("path");

module.exports = {
    newProduct : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/products/newProduct.ejs"), {titulo: 'Bhoomi - Ingresar Producto'});
    },
}