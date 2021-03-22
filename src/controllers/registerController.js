const express = require ("express");
const path = require ("path");
const User=require('../../models/Users');
const{validationResult}=require('express-validator');

module.exports = {
    register : (req,res) => {
        res.cookie('testing',{maxAge:1000*30});
        return res.render (path.resolve (__dirname, "../views/users/register.ejs"), {titulo: 'Bhoomi - Registro'});
    },
    save:(req,res)=>{
        let errores=validationResult(req);
    if(!errores.isEmpty()){
        return res.render(path.resolver(__dirname,'../src/views/users/register'),{errores:errores.mapped()});
    
     
    }

    let userDB=User.findByField('email',req.body.email);
    if(userDB){
        return res.render('register',{
            errores: {
                email:{
                    msg: 'Este email ya esta registrado'
                }
            },
            oldData:req.body
        });  
    }
   
 
    let usertoCreate={
        ...req.body,
        password: bcryptjs.hashSync(req.body.password,10),

        avatar: req.file.filename
    }

    let userCreated= User.create(usertoCreate);
    
    return res.redirect('/users/register')


    }
}