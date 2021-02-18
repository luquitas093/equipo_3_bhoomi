const express = require ("express");
const path = require ("path");

module.exports = {
    register : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/users/register.ejs"))
    },
}