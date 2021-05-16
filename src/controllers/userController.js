const express = require ("express");
const path = require ("path");
const fs= require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { name } = require("ejs");
let db = require ("../../database/models")

// Requerir el modelo de users
const User = require ("../models/User.js")

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
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          date: req.body.date,
          phone: req.body.phone,
          avatar:  req.file ? req.file.filename : '',
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          category: 2
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
      db.User.findAll()
      .then ((users) => {
        let errors = validationResult(req);
        let userLogged;

        userLogged = users.filter (function (user) {
          return user.email == req.body.email &&
          bcrypt.compareSync (req.body.password, user.password)
        });

        if (userLogged == "") {
          return res.render (path.resolve (__dirname, "../views/users/login.ejs"), 
          {
            titulo: 'Bhoomi - Ingresá a tu cuenta',
            errors: errors.mapped(),
            old: req.body
          });
        } else {
          req.session.user = userLogged[0];
          }
          if (req.body.remember) {
            res.cookie ('email', userLogged[0].email, {
              maxAge: 1000 * 60 * 60 * 24
              })
          }
          return res.redirect ("/")
          })
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
      first_name: req.body.first_name,
        last_name: req.body.last_name,
        date: req.body.date,
        address: req.body.address,
        phone: req.body.phone,
        avatar:  req.file ? req.file.filename : '',
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        category: "user"
    },{
      where:{
        id:req.params.id
      }
    });
    res.redirect("/profile/"+req.params.id);

    
    

  },

  logout: (req, res) => {
    res.clearCookie ('userEmail');
    req.session.destroy();
    return res.redirect ("/");
  },
  //Ver detalle Usuario
  detail: (req,res)=>{
    db.User.findByPk(req.params.id)
  .then (function(User) {
      return res.render(path.resolve(__dirname,'../views/users/detailUser.ejs'), {
          titulo: 'Bhoomi - Detalle Usuario',
          users: User,
          
      })
  })

  }
}

/* EJEMPLO DE DANI EN CLASE:
      const errors = validationResult(req);
      if(errors.isEmpty()){
        let jsonUsers =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
        let loggedUser = jsonUsers.find(user => user.email == req.body.email)
        delete loggedUser.password;
        req.session.user = loggedUser;
        if(req.body.remember){
          res.cookie('email',loggedUser.email,{maxAge: 1000 * 60 * 60 * 24})
        }
        return res.redirect('/');
      }else{
        res.render(path.resolve(__dirname, '../views/users/login.ejs'),{errors:errors.mapped(),old:req.body});        
      }
    }, */