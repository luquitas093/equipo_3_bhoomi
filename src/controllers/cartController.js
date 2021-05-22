const express = require ("express");
const path = require ("path");

module.exports = {
    cart : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/cart/productCart.ejs"), {titulo: 'Bhoomi - Carrito de Compras'});
    },
}