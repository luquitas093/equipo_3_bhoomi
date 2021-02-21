const express = require ("express");
const router = express.Router ();
const path = require ("path");

const newProductController = require ("../controllers/newProductController.js");

router.get ("/", newProductController.newProduct);

module.exports = router;