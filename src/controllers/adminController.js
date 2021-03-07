const express = require ("express");
const path = require ("path");
const fs= require('fs');
const { name } = require("ejs");

module.exports = {
    admin : (req,res) => {
        let products=JSON.parse(fs.readFileSync(path.resolve(__dirname,__dirname, '../data/products.json' )));
        return res.render (path.resolve (__dirname, "../views/admin/admin.ejs"), {products, titulo: 'Bhoomi - Cosmetica Natural'});
    },
    create: (req,res)=> {
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
            );
        res.render(path.resolve(__dirname, '../views/admin/newProduct'));    
    },
    save: (req,res)=>{
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
            );
        let lastproduct= products.pop();
        products.push(lastproduct);
        let newProduct={
        id: lastproduct.id+1,
        name: req.body.name,
        description: req.body.description,
        imagenEdit: req.file.filename,
        category:req.body.category,
        qunatity:req.body.qunatity,
        price:req.body.price,
        keywords:req.body.keywords,      



        } 
        products.push(newProduct);
        let saveProduct= JSON.stringify(products,null,2); 
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'),saveProduct);
        res.redirect ('/admin');
    },
    show: (req,res)=>{
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );
        let myProduct;
        products.forEach(product => {
            if(product.id== req.params.id){
                myProduct=product;
            }

        }); 
        res.render(path.resolve(__dirname,'../views/admin/productDetail',{myProduct}));
    },
    edit: (req,res)=>{
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );
        const productId=req.params.id;
        let productEdit=products.find(product=>product.id==productId);
        res.render(path.resolve(__dirname, '../views/admin/editProduct'), {productEdit}); 
    },
    update: (req,res) =>{
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );
        req.body.id = req.params.id;
        
        let productsUpdate = products.map(product =>{
            if(product.id == req.body.id){
                return product = req.body;
            }
            return product;
        })
        let productUpdate = JSON.stringify(productsUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'),productUpdate)
        res.redirect('/admin');
    },
    destroy: (req,res) =>{
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );
        const deleteProduct = req.params.id;
        const listProduct = products.filter(product => product.id != deleteProduct);
        let saveProducts = JSON.stringify(listProduct,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'),saveProducts);
        res.redirect('/admin');
    }

}