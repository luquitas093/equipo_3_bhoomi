const express = require ("express");
const router = express.Router ();
const path = require ("path");

const registerController = require ("../controllers/registerController.js")

router.get ("/", registerController.register)

module.exports = router;