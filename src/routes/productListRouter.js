const express = require ("express");
const router = express.Router ();
const path = require ("path");

const productsListController = require ("../controllers/productsListController.js")

router.get ("/", productsListController.list)

module.exports = router;