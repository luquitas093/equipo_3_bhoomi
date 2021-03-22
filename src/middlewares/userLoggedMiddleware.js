const User = require ('../models/User.js');

function userLoggedMiddleware (req, res, next) {
res.locals.isLogged = false;
let cookieEmail = req.cookies.emailUser;
let userCookie = User.findByField('email', cookieEmail);
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