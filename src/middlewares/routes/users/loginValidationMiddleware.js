const {body} = require('express-validator');
const path = require('path');
const db = require ("../../../../database/models")
const bcrypt = require('bcryptjs');

const loginValidation = [
    body('email').notEmpty().withMessage('Ingresá el mail con el que te registraste'),
    body('email').isEmail().withMessage('Ingresá un tipo de mail válido'),
    /*body('email').custom( (value, {req}) => {
      db.User.findOne( {
        where : {
          email : req.body.email
        }
      })
      .then ((user) => {
          if (user) {
              throw ("El mail ingresado no está registrado")
            }
        })
    }),*/
    body('password').isLength({min: 8 }).withMessage('La contraseña tiene que tener un mínimo de 8 caracteres'),
    /*body('password').custom((value, {req}) => {
      db.User.findAll()
      .then ((users) => {
        for (let i = 0; i < users.length; i++) {
          if (users[i].email == req.body.email) {
            if (bcrypt.compareSync(value, users[i].passwordHash)) {
              console.log ("Ok")
          } else {
            Console.log ("No")
          }
        }
      }
      })
  }).withMessage('Las credenciales son erróneas'),*/
  ]

  module.exports = loginValidation;