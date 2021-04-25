const User = require ('../models/User.js');
const db= require('../../database/models');

function userLoggedMiddleware (req, res, next) {
res.locals.isLogged = false;
let cookieEmail = req.cookies.emailUser;
let userCookie = db.User.findOne({
    where: {
       email: req.cookies.email
    }
});

if(userCookie){
    req.session.userLogged = userCookie;
}
if (req.session.userLogged) {
    res.locals.isLogged = true; 
    res.locals.userLogged = req.session.userLogged;
}
 next();
}

module.exports = userLoggedMiddleware;