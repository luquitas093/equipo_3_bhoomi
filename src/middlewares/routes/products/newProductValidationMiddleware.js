const {body} = require('express-validator');
const path = require('path');

const newProductValidation = [
    body('name')
                      .notEmpty().withMessage('El campo nombre es obligatorio').bail()
                      .isAlpha().withMessage ('Por favor, ingrese sólo letras').bail()
                      .isLength({min: 5}).withMessage ('Por favor, ingrese un nombre de más de cinco letras'),
    body('description')
                     .isLength({min: 20}).withMessage ('Por favor, ingrese una descripción de al menos 20 caracteres'),
    body('imagen').custom((value, {req}) => {
     let file = req.file;
     let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

     if(!file){
       throw new Error ("Tenés que subir una imagen");
     } else {
      let fileExtension = path.extname(file.originalname);
      if(!acceptedExtensions.includes(fileExtension)) {
        throw new Error ("Las extensiones permitidas son .jpg, .jpeg, .png y .gif")
      }
    }
     return true;
   }),
   body('category').notEmpty().withMessage('Elija una categoría'),
   body('quantity')
                .notEmpty().withMessage('El campo cantidad es obligatorio').bail()
                .isNumeric().withMessage('Por favor, ingrese sólo números').bail(),
   body('price')
                .notEmpty().withMessage('El campo precio es obligatorio').bail()
                .isNumeric().withMessage('Por favor, ingrese sólo números').bail(),
  ]

  module.exports = newProductValidation;