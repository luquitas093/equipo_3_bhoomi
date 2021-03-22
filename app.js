// Configuracion de Express

const express = require ("express");
const app = express();
const path = require ("path");
const methodOverride = require ("method-override");
const session = require('express-session');
const cookies = require('cookie-parser');

//Ruta Absoluta de la carpeta Public

const publicPath = path.resolve (__dirname, "./public");
app.use (express.static (publicPath));


// Configuracion template engine - EJS

app.set("view engine", "ejs");

// Configuración Metodo POST

app.use (express.urlencoded ({ extended: false}));
app.use (express.json ());

// Middleware Method-Override

app.use (methodOverride("_method"));

//Ruta session
app.use(session({
    secret:'BhoomiIsASecret',
    resave: false,
    saveUninitialized: false,
}))

//Ruta cookies
app.use(cookies());

//Middleware de Logueo
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
app.use(userLoggedMiddleware);

// Llamado a las Rutas

const adminRoutes = require ("./src/routes/adminRouter.js");
app.use ("/administrador", adminRoutes);

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