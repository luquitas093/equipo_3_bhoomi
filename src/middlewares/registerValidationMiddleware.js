const {body} = require('express-validator');
const path = require('path');

const registerValidation = [
    body('first_name')
                      .notEmpty().withMessage('El campo nombre es obligatorio').bail()
                      .isAlpha().withMessage ('Por favor, ingrese sólo letras'),
    body('last_name')
                     .notEmpty().withMessage('El campo apellido es obligatorio').bail()
                     .isAlpha().withMessage ('Por favor, ingrese sólo letras'),
    body('date').notEmpty().withMessage('La fecha de nacimiento es obligatoria'),
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

  module.exports = registerValidation;