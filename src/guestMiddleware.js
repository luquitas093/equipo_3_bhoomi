function guestMiddleware(req,res, next){
if(req.session.userLogged){
    //hay que poner la ruta del perfil!!!
    return res.redirect('/user/profile');
}
next();

}

module.exports=guestMiddleware;