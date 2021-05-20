function roleMiddleware(req, res, next) {
    if (res.locals.userLogged && res.locals.userLogged.roleId===1) {
        return next();
    }
    return res.redirect ("/404")
    }
    
    module.exports = roleMiddleware;