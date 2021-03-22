const express = require ("express");
const path = require ("path");
const{validationResult}=require('express-validator');
const User=require('../../models/Users');

module.exports = {
    login : (req,res) => {
        
        return res.render (path.resolve (__dirname, "../views/users/login.ejs"), {titulo: 'Bhoomi - Ingresá a tu cuenta'});
    },
    save:(req,res)=>{
        let errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.render(path.resolve(__dirname,'../src/views/users/login'),{errores:errores.mapped()})
    }

    },
    loginProcess: (req, res)=>{
     
      let usertoLog=User.findByField('email', req.body.email); 
      if(usertoLog){
          let rightPassword= bcryptjs.compareSync(req.body.password,usertoLogin.password);
         
          if(rightPassword){
              delete usertoLog.password;
              req.session.userLogged=usertoLog;
            if(req.body.remember_user){
                res.cookie('emailUser', req.body.email,{maxAge: (1000**120)*1})
            }
 //hay que poner la ruta del perfil !!!!
              return res.redirect('users/profile');
          }
          return res.render('login',{
            errores:{
                email:{
                    msg:'El usuario o la contraseña son incorrectos'
                }
            }
        });

      }
      return res.render('login',{
          errores:{
              email:{
                  msg:'No se encuentra este email registrado'
              }
          }
      });
    },
       //hay que poner el nombre del perfil!!!
    profile:(req,res)=>{
        return res.render('Profile',{
            user: req.session.userLogged
        });
    },
    logout: (req,res)=>{
        res.clearCookie('emailUser');
        req.session.destroy();
        return res.redirect('/');
    }
}