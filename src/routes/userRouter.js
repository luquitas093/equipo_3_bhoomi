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

const guestMiddleware = require ("../middlewares/routes/users/guestMiddleware.js");
const authMiddleware = require ("../middlewares/routes/users/authMiddleware.js");

//Requerir Middlewares de Validacion

const loginValidation = require ("../middlewares/routes/users/loginValidationMiddleware.js");
const registerValidation = require ("../middlewares/routes/users/registerValidationMiddleware.js")
const editProfileValidation = require ("../middlewares/routes/users/editProfileValidationMiddleware.js")

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

//Formulario de Registro
router.get ("/registro", guestMiddleware, userController.register);
router.post ("/registro", upload.single ('avatar'), registerValidation, userController.create);

// Formulario de Login
router.get ('/ingresar', guestMiddleware, userController.login);
router.post('/ingresar', loginValidation, userController.save);

//Perfil del Usuario
router.get ('/perfil', authMiddleware, userController.profile);

//Formulario de Edición del Usuario
router.get ('/perfil/editarperfil', userController.editprofile);
router.put('/perfil/editarperfil', upload.single('avatar'), editProfileValidation, userController.editprocess);
router.post('/perfil/borrarperfil', userController.delete)

//Cerrar Sesión
router.get('/cerrarsesion', userController.logout);

module.exports = router;