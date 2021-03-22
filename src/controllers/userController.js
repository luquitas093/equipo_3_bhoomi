const express = require ("express");
const path = require ("path");
const fs= require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');

// Requerir el modelo de users
const User = require ("../models/User.js")

//Validacion con Express-Validator
const { validationResult } = require('express-validator');

module.exports = {
    register : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/users/register.ejs"), {titulo: 'Bhoomi - Registro'});
    },
    login : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/users/login.ejs"), {titulo: 'Bhoomi - Ingresá a tu cuenta'});
    },
    create: (req, res) => {
      let resultValidation = validationResult (req);
      if (!resultValidation.isEmpty()) {
        return res.render (path.resolve (__dirname, "../views/users/register.ejs"), {
          titulo: 'Bhoomi - Registro',
          errors: resultValidation.mapped(),
          old: req.body
        });
      }
      let userInDB = User.findByField ("email", req.body.email);
      if (userInDB) {
        return res.render(path.resolve (__dirname, "../views/users/register.ejs"), {
          titulo: 'Bhoomi - Registro',
          errors: {
              email:{
                  msg: 'Este email ya esta registrado'
              }
          },
          old:req.body
      });
    };
      let userToCreate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date: req.body.date,
        address: req.body.address,
        phone: req.body.phone,
        avatar:  req.file ? req.file.filename : '',
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        category: "user"
      }
      let userCreated = User.create(userToCreate);
      return res.redirect ("/usuarios/ingresar")
    }, 
      /* EJEMPLO DE DANI EN CLASE:
      else {
        let user = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          date: req.body.date,
          address: req.body.address,
          phone: req.body.phone,
          avatar:  req.file ? req.file.filename : '',
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          category: "user"
        }
        let jsonUsers = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), {
          encoding: 'utf-8'
        });
        let users;
        if (jsonUsers == "") {
          users = [];
        } else {
          users = JSON.parse(jsonUsers);
        };
        users.push(user);
        usersJSON = JSON.stringify(users, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), usersJSON);
        res.redirect('/ingresar');
      } */

    save: (req,res) =>{
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render (path.resolve (__dirname, "../views/users/login.ejs"), {
          titulo: 'Bhoomi - Ingresá a tu cuenta',
          errors: errors.mapped(),
          old: req.body
        });
      }
        let userToLogin = User.findByField ('email', req.body.email);
        if (userToLogin) {
          let hashPassword = bcrypt.compareSync (req.body.password, userToLogin.password)
          if (hashPassword) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
            if (req.body.remember) {
              res.cookie ('userEmail', req.body.email, { maxAge: 1000 * 60 * 60 * 24})
            }
            return res.redirect ("/")
          }
        }
        return res.render (path.resolve (__dirname, "../views/users/login.ejs"), {
          titulo: 'Bhoomi - Ingresá a tu cuenta',
          errors: {
            email: {
              msg: "Las credenciales son erróneas"
            }
          }
        });
      },

    profile: (req, res) => {
      return res.render (path.resolve (__dirname, "../views/users/profile.ejs"), {
        titulo: 'Bhoomi - Perfil de Usuario',
        user: req.session.userLogged
      });
  },

  editprofile: (req, res) => {
    return res.render (path.resolve (__dirname, "../views/users/editProfile.ejs"), {
      titulo: 'Bhoomi - Editar Perfil',
      user: req.session.userLogged
    });
  },

  logout: (req, res) => {
    res.clearCookie ('userEmail');
    req.session.destroy();
    return res.redirect ("/");
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