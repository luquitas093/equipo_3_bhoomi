function authMiddleware (req, res, next) {
    if(!req.session.userLogged){
        return res.redirect('/usuarios/ingresar');
    }
    next();
    }
    
    module.exports = authMiddleware;