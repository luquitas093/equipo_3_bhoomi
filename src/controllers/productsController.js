const express = require ("express");
const path = require ("path");
const fs = require('fs');
let db = require ("../../database/models");

let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json' )));

module.exports = {
    list: (req,res) => {
        db.Product.findAll()
        .then (function(products) {
            return res.render(path.resolve(__dirname, '../views/products/productList.ejs'), {
                titulo: 'Bhoomi - Listado de Productos',
                products: products
            });
        });
    },
    detail: (req,res) => {
        db.Product.findByPk(req.params.id, {
            include: [{association: "category"}]
        })
        .then (function(product) {
            return res.render(path.resolve(__dirname,'../views/products/productDetail.ejs'), {
                titulo: 'Bhoomi - Detalle Producto',
                product: product
            })
        })
    }
}

// Controladores para archivos data .JSON

/* module.exports = {
    list : (req,res) => {
        return res.render (path.resolve (__dirname, "../views/products/productList.ejs"), {products, titulo: 'Bhoomi - Catálogo'});
    },
    detail : (req,res) => {
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );

        let myProduct;
        products.forEach(product => {
            if (product.id == req.params.id){
                myProduct = product;
            }
        });

        res.render(path.resolve(__dirname,'../views/products/productDetail.ejs'), {myProduct, titulo: "Bhoomi - Detalle del Producto"});
    },
} */