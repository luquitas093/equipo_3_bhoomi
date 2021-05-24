const express = require ("express");
const router = express.Router ();
const path = require ("path");

const apiProductController = require("../../controllers/api/apiProductController.js");


router.get ("/", apiProductController.list);
router.get ("/:id", apiProductController.detail);
router.get ("/lastProduct", apiProductController.lastProduct);


module.exports = router;