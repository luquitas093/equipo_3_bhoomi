const express = require ("express");
const path = require ("path");

module.exports = {
    newProduct : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/admin/newProduct.ejs"), {titulo: 'Bhoomi - Ingresar Producto'});
    },
}