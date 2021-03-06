const express = require ("express");
const path = require ("path");
const fs= require('fs');
const { name } = require("ejs");
const { Op } = require("sequelize");

//Requerimos la Base de Datos
const db = require ("../../database/models")

//Validacion con Express-Validator
const { validationResult } = require('express-validator');

module.exports = {
    admin: (req,res) => {
        db.Product.findAll()
        .then (products => {
            return res.render(path.resolve(__dirname, '../views/admin/admin.ejs'), {
                titulo: 'Bhoomi - Administrador',
                products: products
            });
        })
        .catch(error => res.send (error))
    },
    create: (req,res) => {
        db.Category.findAll()
        .then (function(categories){
            return res.render(path.resolve(__dirname, '../views/admin/newProduct.ejs'), {
                titulo: 'Bhoomi - Crear Producto',
                categories: categories
            });
        })
        .catch(error => res.send (error))
    },
    save: (req,res)=> {
        let resultValidation = validationResult(req);

        if(!resultValidation.isEmpty()) {
            db.Category.findAll()
            .then (function(categories){
                return res.render(path.resolve(__dirname, '../views/admin/newProduct.ejs'), {
                    titulo: 'Bhoomi - Crear Producto',
                    categories: categories,
                    old: req.body,
                    errors: resultValidation.mapped()
                });
            })
            .catch(error => res.send (error))
            } else {
                let product = {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file ? req.file.filename : '',
                    quantity: req.body.quantity,
                    price: req.body.price,
                    categoryId: req.body.category,
                }
    
                db.Product.create (product)
                .then ((newProduct) => {
                    res.redirect ('/administrador')
                })
                .catch(error => res.send (error));
            }
    },
    show: (req,res)=>{
        db.Product.findByPk(req.params.id, {
            include: [{association: "category"}]
        })
        .then ((product) => {
            return res.render(path.resolve(__dirname,'../views/admin/productDetail.ejs'), {
                titulo: 'Bhoomi - Detalle Producto',
                product: product
            })
        })
        .catch(error => res.send (error))
    },
    edit: (req,res)=>{
        let productOrder = db.Product.findByPk(req.params.id);
        let categoryOrder = db.Category.findAll();

        Promise.all([productOrder, categoryOrder])
        .then(function([product, categories]) {
            return res.render(path.resolve(__dirname, '../views/admin/editProduct.ejs'), {
                titulo: "Bhoomi - Editar Producto",
                product: product,
                categories: categories
            })
        })
        .catch(error => res.send (error))
    },
    update: (req,res) => {

        let resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
            let productOrder = db.Product.findByPk(req.params.id);
            let categoryOrder = db.Category.findAll();
    
            Promise.all([productOrder, categoryOrder])
            .then(function([product, categories]) {
                return res.render(path.resolve(__dirname, '../views/admin/editProduct.ejs'), {
                    titulo: "Bhoomi - Editar Producto",
                    product: product,
                    categories: categories,
                    errors: resultValidation.mapped()
                })
            })
            .catch(error => res.send (error))
        } else {
            let product = {
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.filename : '',
                quantity: req.body.quantity,
                price: req.body.price,
                categoryId: req.body.category,
            }
    
            db.Product.update(product, {
                    where: {
                        id: req.params.id
                    }
                })
                .then (editProduct => {
                    res.redirect ('/administrador');
                })
                .catch(error => res.send (error))
        }
    },
    destroy: (req,res) =>{
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then (destroyProduct => {
            res.redirect('/administrador');
        })
        .catch(error => res.send (error))
        
    },
    users: (req,res) => {
        db.User.findAll({
            include: [{association: "role"}]
        })
        .then (users => {
            return res.render(path.resolve(__dirname, '../views/admin/adminUsers.ejs'), {
                titulo: 'Bhoomi - Administrador',
                users: users,
            });
        })
        .catch(error => res.send (error))
    },
    viewprofile : (req, res) => {
        let profile = db.User.findByPk(req.params.id,{include:["role"]});
        Promise.all([profile])
        .then(function([users]) {
            //return res.send (users)
            return res.render(path.resolve(__dirname, '../views/users/profile.ejs') ,{
                titulo: "Bhoomi - Ver Perfil",
                user: users,
            })
        })
    },
    banner: (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then (bannerUser => {
            res.redirect('/administrador/usuarios');
        })
        .catch(error => res.send (error))
    }
}