const express = require ("express");
const app = express();
const path = require ("path");

//Ruta Absoluta de la carpeta Public

const publicPath = path.resolve (__dirname, "../public");
app.use (express.static (publicPath));

//Rutas HTML

app.get ("/", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./views/index.html"))
})

app.get ("/products", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./views/productDetail.html"))
})

app.get ("/cart", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./views/productCart.html"))
})

app.get ("/login", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./views/login.html"))
})

app.get ("/register", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./views/register.html"))
})