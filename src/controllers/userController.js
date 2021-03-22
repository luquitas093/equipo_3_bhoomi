const express = require ("express");
const path = require ("path");
const fs= require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { name } = require("ejs");

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
      let errors = validationResult(req);
      if (errors.isEmpty()) {
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
      } else {
        return res.render(path.resolve(__dirname, '../views/users/register.ejs'), {
          errors: errors.mapped(), old: req.body
        });
      }
    },
    ingresar: (req,res) =>{
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
    },
    logout: (req,res) =>{
      req.session.destroy();
      res.cookie('email',null,{maxAge: -1});
      res.redirect('/')
    }
  }