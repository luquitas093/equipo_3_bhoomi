const express = require ("express");
const router = express.Router ();
const path = require ("path");

const indexController = require ("../controllers/indexController.js")

//Home
router.get ("/", indexController.index)

//Busqueda
router.get ("/buscar")

//404
router.get ("/404")

module.exports = router;