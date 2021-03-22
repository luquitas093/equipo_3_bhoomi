const User=require('../../models/Users');

function userLoggedMiddleware(req,res,next){

res.locals.logged=false;

let cookieEmail=req.cookies.emailUser;
let userCookie=User.findByField('email',cookieEmail);
if(userCookie){
    req.session.userLogged=userCookie;
}
if(req.session.userLogged){
    res.locals.logged=true; 
    res.locals.userLogged=req.session.userLogged;
}


 next();

}

module.exports=userLoggedMiddleware;