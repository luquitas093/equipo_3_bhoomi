const path = require('path');
let db = require ("../../../database/models")
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports={
list: (req, res) => {
        Product.findAll()
            .then(products => {
                
                let response = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: "/api/products"
                    },
                    data: products
                }
                return res.status(200).json(response)
            })
},
detail:(req,res)=>{
    db.Product.findByPk(req.params.id)
      
        .then(products => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: '/api/products/:id'
                },
                data: product
            }
            res.json(respuesta);
        });

},

lastProduct: (req, res) => {
    db.Product.findByPk(req.params.id)
        .then(products => {
         for(let i=0;i<products.length;i++){
             let lastProduct=products[i];
             if(lastProduct==product.indexOf(0)){
                 return lastProduct;
             }
         }
            
        });

            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: '/api/products/lastProduct'
                },
                data: lastProduct
            }
            res.json(respuesta);
       
}
}