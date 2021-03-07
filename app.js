// Configuracion de Express

const express = require ("express");
const app = express();
const path = require ("path");
const methodOverride = require ("method-override");

//Ruta Absoluta de la carpeta Public

const publicPath = path.resolve (__dirname, "./public");
app.use (express.static (publicPath));


// Configuracion template engine - EJS

app.set("view engine", "ejs");

// Configuración Metodo POST

app.use (express.urlencoded ({ extended: false}));
app.use (express.json ());

// Configuracion Method-Override

app.use (methodOverride("_method"));

// Llamado al Router

const indexRoutes = require ("./src/routes/indexRouter.js");
app.use ("/", indexRoutes);

const cartRoutes = require ("./src/routes/cartRouter.js");
app.use ("/cart", cartRoutes);

const loginRoutes = require ("./src/routes/loginRouter.js");
app.use ("/login", loginRoutes);

const productsRoutes = require ("./src/routes/productsRouter.js");
app.use ("/admin/detailProduct", productsRoutes);

const registerRoutes = require ("./src/routes/registerRouter.js");
app.use ("/register", registerRoutes);

const newProductRoutes = require ("./src/routes/newProductRouter.js");
app.use ("/admin/newProduct", newProductRoutes);

const editProductRoutes = require ("./src/routes/editProductRouter.js");
app.use ("/admin/editProduct", editProductRoutes);

const productsList = require ("./src/routes/productListRouter.js");
app.use ("/products", productsList);

const adminRoutes = require ("./src/routes/adminRouter.js");
app.use ("/admin", adminRoutes);

//Levantar el Servidor

app.set('puerto', process.env.PORT || 3000);

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