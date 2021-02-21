const express = require ("express");
const router = express.Router ();
const path = require ("path");

const editProductController = require ("../controllers/editProductController.js")

router.get ("/", editProductController.editProduct)

module.exports = router;