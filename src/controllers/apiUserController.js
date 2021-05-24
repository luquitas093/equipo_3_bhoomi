const path = require('path');
let db = require ("../../../database/models")
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { detail } = require('./apiProductController');


module.exports={
    list: (req,res)=>{
       db.User
       .findAll()
       .then(users=>{
        let userUpdate = users.map((users)=>{
               return users.dataValues;
           
       });

       userUpdate.forEach((users)=>{
        delete users.passwordHash;
        delete users.roleId;
        delete users.date;
        delete users.phone;
        delete users.avatar;
        delete users.addressId;
       
     });

     return res.status(200).json({
        total: users.length,
        data: {users:userUpdate, url:`http://localhost:3001/api/users/id`},
        status: 200
    })
})
       
},

    detail: (req,res)=>{
        db.User
        .findByPk(req.params.id)
         
        .then(users => {
           detailUser=users.dataValues;
           delete detailUser.passwordHash;
           delete detailUser.roleId;
            
           let respuesta = {
                meta: {
                    status : 200,
                    url: 'api/users/:id'
                },
                data: {users:detailUser, url: `/public/img/users/${detailUser.avatar}`}
            }
                res.json(respuesta);
            })
    },
 

  

    }

