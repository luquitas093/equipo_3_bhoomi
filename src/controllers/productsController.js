const express = require ("express");
const path = require ("path");

module.exports = {
    detail : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/products/productDetail.ejs"), {titulo: 'Bhoomi - Detalle del Producto'});
    },
}