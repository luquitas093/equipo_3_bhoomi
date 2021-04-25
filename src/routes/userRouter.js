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

// Requerir Middlewares

const guestMiddleware = require ("../middlewares/guestMiddleware.js");
const authMiddleware = require ("../middlewares/authMiddleware.js")

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

  // Llamado al archivo Json donde está alojada la información de los usuarios

  let jsonUsers =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')))

  // Validaciones del Login

const loginValidation = [
  body('email').isEmail().withMessage('Ingresá el mail con el que te registraste'),
  body('password').isLength({min: 8 }).withMessage('La contraseña tiene que tener un mínimo de 8 caracteres'),
  body('email').custom( (value  ) =>{
    for (let i = 0; i < jsonUsers.length; i++) {
        if (jsonUsers[i].email == value) {
            return true    
        }
    }
    return false
  }).withMessage('El mail ingresado no está registrado'),
  body('password').custom( (value, {req}) =>{
      for (let i = 0; i < jsonUsers.length; i++) {
          if (jsonUsers[i].email == req.body.email) {
              if(bcrypt.compareSync(value, jsonUsers[i].password)){
                return true;
              }else{
                return false;
              }
          }
      }     
  }).withMessage('Las credenciales son erróneas')
]

//Validaciones del Registro

const registerValidation = [
    body('first_name')
                      .notEmpty().withMessage('El campo nombre es obligatorio').bail()
                      .isAlpha().withMessage ('Por favor, ingrese sólo letras'),
    body('last_name')
                     .notEmpty().withMessage('El campo apellido es obligatorio').bail()
                     .isAlpha().withMessage ('Por favor, ingrese sólo letras'),
    body('date').notEmpty().withMessage('La fecha de nacimiento es obligatoria'),
    body('address').notEmpty().withMessage('El campo domicilio es obligatorio'),
    body('phone')
                 .notEmpty().withMessage('El campo teléfono es obligatorio').bail()
                 .isNumeric().withMessage('Por favor, ingrese sólo números').bail()
                 .isLength({min: 10, max: 13 }).withMessage('Ingrese el prefijo sin el 0 más su número teléfonico'),
    body('avatar').custom((value, {req}) => {
     let file = req.file;
     let acceptedExtensions = [".jpg", ".jpeg"];

     if(!file){
       throw new Error ("Tenés que subir una imagen");
     } else {
      let fileExtension = path.extname(file.originalname);
      if(!acceptedExtensions.includes(fileExtension)) {
        throw new Error ("Las extensiones permitidas son .jpg y .jpeg")
      }
    }
     return true;
   }),
    body('email')
                .notEmpty().withMessage('El campo E-Mail es obligatorio').bail()
                .isEmail().withMessage('Agregar un email válido'),
    body('password').isLength({min: 8 }).withMessage('La contraseña tiene que tener un mínimo de 8 caracteres'),
    body('password2').isLength({min: 8 }).withMessage('La contraseña tiene que tener un mínimo de 8 caracteres'),
    body('password2').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true    
        }else{
            return false
        }    
    }).withMessage('Las contraseñas no coinciden'),
  ]

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