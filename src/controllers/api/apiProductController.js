const path = require('path');
let db = require ("../../../database/models")
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports={
list: (req, res) => {
        db.Product.findAll({
            include:["category"]
        })
            .then(products => {

            let productUpdate = products.map((products)=>{
                    return products.dataValues;
                
            });
     
            productUpdate.forEach((products)=>{
             delete products.description;
          
            
          });
     
                
                let response = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: "/api/products"
                    },
                    data: {products:productUpdate, url:`http://localhost:3001/api/products/id`}
                }
                return res.status(200).json(response)
            })
},
detail:(req,res)=>{
    db.Product.findByPk(req.params.id,{
        include:["category"]
    })
      
        .then(products => {
            detailsProducts=products.dataValues;
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: '/api/products/:id'
                },
                data: {products:detailsProducts, url: `/public/img/products/${detailsProducts.image}`}
            }
            res.json(respuesta);
        });

},

lastProduct: (req, res) => {
    db.Product.findByPk(req.params.id)
        .then(products => {
         for(let i=0;i<products.length;i++){
             let lastProduct=products[i];
             if(lastProduct==products.indexOf[0]){
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