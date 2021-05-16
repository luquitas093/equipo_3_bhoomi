const express = require ("express");
const router = express.Router ();
const path = require ("path");
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcryptjs');

// Requerir el express-validator

const { body } = require('express-validator');

// Requerir el Controlador de Usuario

const userController = require ("../controllers/userController.js");

// Requerir Middlewares de Login

const guestMiddleware = require ("../middlewares/guestMiddleware.js");
const authMiddleware = require ("../middlewares/authMiddleware.js");

//Requerir Middlewares de Validacion

const loginValidation = require ("../middlewares/loginValidationMiddleware.js");
const registerValidation = require ("../middlewares/registerValidationMiddleware")

//Setear el Storage de Multer

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/img/users'));
    },
    filename: function (req, file, cb) {
      cb(null, "profile-" + Date.now() + path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage: storage })

// Requerir Rutas

router.get ("/registro", guestMiddleware, userController.register);
router.post ("/registro", upload.single ('avatar'), registerValidation, userController.create);
router.get ('/ingresar', guestMiddleware, userController.login);
router.post('/ingresar', loginValidation, userController.save);
router.get ('/perfil', authMiddleware, userController.profile);
router.get ('/perfil/editarperfil', userController.editprofile);
router.post('/perfil/editarperfil',userController.editprocess);
router.get('/perfil/detail/:id',userController.detail);
router.get('/cerrarsesion', userController.logout);

module.exports = router;