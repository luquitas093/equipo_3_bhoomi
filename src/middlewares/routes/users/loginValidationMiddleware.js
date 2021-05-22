const {body} = require('express-validator');
const path = require('path');
const db = require ("../../../../database/models")
const bcrypt = require('bcryptjs');

const loginValidation = [
    body('email').notEmpty().withMessage('Ingresá el email con el que te registraste'),
    body('email').isEmail().withMessage('Ingresá un tipo de email válido'),
    body('email').custom( (value) => {
      return new Promise ((resolve, reject) => {
        db.User.findOne({
          where: {
            email: value }
          })
          .then(emailExist => {
            if(emailExist === null) {
              reject(new Error('El email no se encuentra registrado.'))
              } else {
                resolve(true)
              }
            })
        })
    }),
    body('password').notEmpty().withMessage('La contraseña es obligatoria').bail()
                    .isLength({min: 8 }).withMessage('La contraseña tiene que tener un mínimo de 8 caracteres'),
]

  module.exports = loginValidation;