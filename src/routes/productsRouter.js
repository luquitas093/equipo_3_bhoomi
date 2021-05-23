const express = require ("express");
const router = express.Router ();
const path = require ("path");

const productsController = require ("../controllers/productsController.js")

//Ver todos los productos
router.get ("/", productsController.list)

//Ver productos por categoría
router.get ("/:id", productsController.categories)

//Ver detalle de los productos
router.get ("/detalleproducto/:id", productsController.detail)

module.exports = router;