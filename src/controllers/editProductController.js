const express = require ("express");
const path = require ("path");

module.exports = {
    editProduct : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/admin/editProduct.ejs"), {titulo: 'Bhoomi - Editar Producto'});
    },
}