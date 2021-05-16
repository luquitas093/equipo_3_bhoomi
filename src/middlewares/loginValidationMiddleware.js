const {body} = require('express-validator');
const path = require('path');

const loginValidation = [
    body('email').notEmpty().withMessage('Ingresá el mail con el que te registraste'),
    body('email').isEmail().withMessage('Ingresá un tipo de mail válido'),
    body('email').custom( (value, {req}) => {
        db.User.findOne ({
          where : {
            email : req.body.email
          }
        })
        .then ((email) => {
          if (email == req.body.email) {
            return true
          } else {
            return false
          }
        })
        .catch ((error) => {
          return res.send (error)
        })
      }).withMessage('El mail ingresado no está registrado'),
    body('password').isLength({min: 8 }).withMessage('La contraseña tiene que tener un mínimo de 8 caracteres'),
    body('password').custom((value, {req}) => {
        db.User.findOne ({
          where : {
            password : req.body.password
          }
        })
        .then ((password) => {
          if (password == req.body.password) {
            if (bcrypt.compareSync (value, password)) {
              return true
            } else {
              return false
            }
        }
      })
        .catch  ((error) => {
          return res.send (error)
        })
      }).withMessage('Las credenciales son erróneas')
  ]

  module.exports = loginValidation;