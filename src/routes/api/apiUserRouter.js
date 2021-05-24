const express = require ("express");
const router = express.Router ();
const path = require ("path");

const apiUserController = require("../../controllers/api/apiUserController.js");


router.get ("/", apiUserController.list);
router.get ("/:id", apiUserController.detail);


module.exports = router;