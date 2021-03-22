// Configuracion de Express

const express = require ("express");
const app = express();
const path = require ("path");
const methodOverride = require ("method-override");
const session = require('express-session');
const cookieParser = require('cookie-parser');


//Ruta Absoluta de la carpeta Public

const publicPath = path.resolve (__dirname, "./public");
app.use (express.static (publicPath));


// Configuracion template engine - EJS

app.set("view engine", "ejs");

// Configuración Metodo POST

app.use(express.urlencoded({ extended: false })); //Esta configuración nos permite que nos llegue la información ingresada en el req.body
app.use (express.json ());

// Middleware Method-Override

app.use (methodOverride("_method"));

// Middleware de Session y Cookies


// Llamado a las Rutas

// Ruta del Adminstrador
const adminRoutes = require ("./src/routes/adminRouter.js");
app.use ("/administrador", adminRoutes);

// Ruta de los productos
const productsRoutes = require ("./src/routes/productsRouter.js");
app.use ("/productos", productsRoutes);

const indexRoutes = require ("./src/routes/indexRouter.js");
app.use ("/", indexRoutes);

const cartRoutes = require ("./src/routes/cartRouter.js");
app.use ("/carrito", cartRoutes);

const userRoutes = require ("./src/routes/userRouter.js");
app.use (userRoutes);

//Levantar el Servidor

app.set('puerto', process.env.PORT || 3001);
app.listen (app.get('puerto'), ()=> console.log(`Servidor corriendo de manera satisfactoria  ${app.get('puerto')}` ));

/*Rutas HTML

app.get ("/", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./src/views/index.html"))
})

app.get ("/products", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./src/views/productDetail.html"))
})

app.get ("/cart", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./src/views/productCart.html"))
})

app.get ("/login", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./src/views/login.html"))
})

app.get ("/register", (req,res) => {
    res.sendFile (path.resolve (__dirname, "./src/views/register.html"))
}) */