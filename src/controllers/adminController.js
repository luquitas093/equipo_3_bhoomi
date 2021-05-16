const express = require ("express");
const path = require ("path");
const fs= require('fs');
const { name } = require("ejs");

//Requerimos la Base de Datos
let db = require ("../../database/models")

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
    create: (req,res)=> {
        db.Category.findAll()
        .then (function(categories){
            return res.render(path.resolve(__dirname, '../views/admin/newProduct.ejs'), {
                titulo: 'Bhoomi - Crear Producto',
                categories: categories
            });
        });
    },
    save: (req,res)=> {
        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : '',
            category_id: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
        });
        res.redirect ('/administrador');
    },
    show: (req,res)=>{
        db.Product.findByPk(req.params.id, {
            include: [{association: "category"}]
        })
        .then (function(product) {
            return res.render(path.resolve(__dirname,'../views/admin/productDetail.ejs'), {
                titulo: 'Bhoomi - Detalle Producto',
                product: product
            })
        })
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
    },
    update: (req,res) => {
        db.Product.update({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : req.body.oldImagen,
            category_id: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect ('/administrador');
    },
    destroy: (req,res) =>{
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/administrador');
    },
    search: ( req, res) =>{
        db.Product.findAll({
            where:{
                name: {[Op.like]: `%${req.query.buscar}%`}
            }
        })
        .then(resultado => { res.render(path.resolve(__dirname, '..', 'views', 'admin', 'index'),{platos: resultado});})
        .catch(error => res.send(error))
    }
}

// Controladores para archivos data .JSON

/* module.exports = {
    admin : (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json' )));
        return res.render (path.resolve (__dirname, "../views/admin/admin.ejs"), {products, titulo: 'Bhoomi - Administrador'});
    },
    create: (req,res)=> {
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json')));
        res.render(path.resolve(__dirname, '../views/admin/newProduct.ejs'), {titulo: 'Bhoomi - Crear Producto'});
    },
    save: (req,res)=> {
        let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
            );
        
        let lastproduct = products.pop();
        products.push(lastproduct);

        let newProduct = {
        id: lastproduct.id+1,
        name: req.body.name,
        description: req.body.description,
        imagen: req.file.filename,
        category:req.body.category,
        quantity:req.body.quantity,
        price:req.body.price,
        } 
        products.push(newProduct);
        let saveNewProduct= JSON.stringify(products,null,2); 
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'),saveNewProduct);
        res.redirect ('/administrador');
    },
    show: (req,res)=>{
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );

        let myProduct;
        products.forEach(product => {
            if (product.id == req.params.id){
                myProduct = product;
            }
        });

        res.render(path.resolve(__dirname,'../views/admin/productDetail.ejs'), {myProduct, titulo: "Bhoomi - Detalle del Producto"});
    },
    edit: (req,res)=>{
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );

        const productId = req.params.id;

        let productEdit = products.find(product=>product.id==productId);
        res.render(path.resolve(__dirname, '../views/admin/editProduct.ejs'), {productEdit, titulo: "Bhoomi - Editar Producto"}); 
    },
    update: (req,res) => {
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        
        let productsUpdate = products.map(product =>{
            if (product.id == req.body.id) {
                return product = req.body;
            }
            return product;
        });

        let productUpdate = JSON.stringify(productsUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../data/products.json'),productUpdate)
        res.redirect('/administrador');
    },
    destroy: (req,res) =>{
        let products= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'))
        );

        const deleteProduct = req.params.id;

        const listProduct = products.filter(product => product.id != deleteProduct);

        let saveProducts = JSON.stringify(listProduct,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../data/products.json'),saveProducts);
        res.redirect('/administrador');
    }
} */