const fs = require ('fs');
const path = require ('path');

const db = require('../../../database/models');

function userLoggedMiddleware (req, res, next) {

res.locals.isLogged = false;

let emailInCookie = req.cookies.email

db.User.findOne ({
    where : {
        email : emailInCookie
    }
})
.then (user => {
        req.session.userLogged = user;
    })
    .catch (error => console.log (error))

if (req.session && req.session.userLogged) {
    res.locals.isLogged = true
    res.locals.userLogged = req.session.userLogged;
}
next();
}



module.exports = userLoggedMiddleware;