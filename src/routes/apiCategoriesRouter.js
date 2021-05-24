const express = require ("express");
const router = express.Router ();
const path = require ("path");

const apiCategoriesController = require("../../controllers/api/apiCategoriesController.js");


router.get ("/", apiCategoriesController.list);


module.exports = router;