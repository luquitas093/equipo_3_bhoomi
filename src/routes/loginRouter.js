const express = require ("express");
const router = express.Router ();
const path = require ("path");

const loginController = require ("../controllers/loginController.js")

router.get ("/", loginController.login)

module.exports = router;