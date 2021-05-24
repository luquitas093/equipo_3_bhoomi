const path = require('path');
let db = require ("../../../database/models")
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports={
    list: (req,res)=>{
       db.Category
       .findAll()
       .then(categories => {
        let respuesta = {
            meta: {
                status : 200,
                total: categories.length,
                url: 'api/categories'
            },
            data: categories
        }
            res.json(respuesta);
        })
}
}
