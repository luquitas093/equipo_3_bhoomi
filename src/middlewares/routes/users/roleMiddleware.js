function roleMiddleware(req, res, next) {
    if (res.locals.isLogged && res.locals.userLogged.user != 1) {
        return next();
    }
    return res.redirect ("/404")
    }
    
    module.exports = roleMiddleware;