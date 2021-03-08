const express = require ("express");
const path = require ("path");

module.exports = {
    login : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/users/login.ejs"), {titulo: 'Bhoomi - Ingresá a tu cuenta'});
    },
}