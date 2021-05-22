const express = require ("express");
const path = require ("path");
const fs= require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { name } = require("ejs");
const db = require ("../../database/models")

const User = db.User;

//Validacion con Express-Validator
const { validationResult } = require('express-validator');

module.exports = {
    register : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/users/register.ejs"), {titulo: 'Bhoomi - Registro'});
    },
    create: (req, res) => {
      db.User.findOne ({
        where : {
          email : req.body.email
        }
      })
      .then ((userInDb) => {
        if (userInDb) {
          return res.render(path.resolve (__dirname, "../views/users/register.ejs"), {
            titulo: 'Bhoomi - Registro',
            errors: {
                email : {
                    msg : 'Este email ya esta registrado'
                }
            },
            old : req.body
        });
        }

      let resultValidation = validationResult (req);

      if (!resultValidation.isEmpty()) {
        return res.render (path.resolve (__dirname, "../views/users/register.ejs"), {
          titulo: 'Bhoomi - Registro',
          errors: resultValidation.mapped(),
          old: req.body
        });
      } else {
        db.User.create ({
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          date: req.body.date,
          phone: req.body.phone,
          avatar:  req.file ? req.file.filename : '',
          email: req.body.email,
          passwordHash: bcrypt.hashSync(req.body.password, 10),
          roleId: 2
        })
        .then (() => {
          return res.redirect ("/usuarios/ingresar")
        })
        .catch ((error) => {
          return res.send (error);
        })
      };
    })
    .catch ((error) => {
      return res.send (error)
    })
    },
    login : (req,res) => {
      return res.render (path.resolve (__dirname, "../views/users/login.ejs"), {titulo: 'Bhoomi - Ingresá a tu cuenta'});
    },
    save: (req,res) => {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.render (path.resolve (__dirname, "../views/users/login.ejs"), 
          {
            titulo: 'Bhoomi - Ingresá a tu cuenta',
            errors: errors.mapped(),
            old: req.body
          })
        }

        db.User.findAll()
        .then (users => {
          let userLogged;

          userLogged = users.filter(function (user) {
            return user.email == req.body.email && 
            bcrypt.compareSync(req.body.password, user.passwordHash)
          });

          if (userLogged == "") {
            return res.render (path.resolve (__dirname, "../views/users/login.ejs"), {
              titulo: 'Bhoomi - Ingresá a tu cuenta',
              errors: {
                password: {
                  msg: "Credenciales inválidas"
                }
              }
            })
          } else {
            delete userLogged.passwordHash
            req.session.userLogged = userLogged[0]
          }

          if (req.body.remember) {
            res.cookie ('email', userLogged[0].email, {
              maxAge: 1000 * 60 * 60 * 24
              })
            }

            return res.redirect ("/")
        })
        .catch ((error) => {
          return res.send (error)
        })
      },
      logout: (req, res) => {
        req.session.destroy();
        res.clearCookie ('email', null, {maxAge: -1});
        return res.redirect ("/");
      },
      profile: (req, res) => {
      return res.render (path.resolve (__dirname, "../views/users/profile.ejs"), {
        titulo: 'Bhoomi - Perfil de Usuario',
        user: req.session.userLogged
      });
      },
      editprofile: (req, res) => {
        let profile = db.User.findByPk(req.session.userLogged.id,{include:["role"]});
        //console.log(req.session.userLogged);
        Promise.all([profile])
        .then(function([users]) {
            return res.render(path.resolve(__dirname, '../views/users/editProfile.ejs') ,{
                titulo: "Bhoomi - Editar Perfil",
                user: req.session.userLogged,
                profile: users                
            })
        })
      },
      editprocess: (req,res)=>{
        db.User.update({
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          date: req.body.date,
          phone: req.body.phone,
          avatar:  req.file ? req.file.filename : '',
          email: req.body.email,
          passwordHash: bcrypt.hashSync(req.body.password, 10),
          roleId: 2
        }, {
          where: {
            id:req.params.id
            }
          });
          res.redirect("/profile/"+req.params.id);
      },
}