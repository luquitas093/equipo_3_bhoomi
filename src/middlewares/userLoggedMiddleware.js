const fs = require ('fs');
const path = require ('path');

const db = require('../../database/models');

function userLoggedMiddleware (req, res, next) {

res.locals.isLogged = false;

if (req.session.userLogged) {
    res.locals.isLogged = true; 
    res.locals.userLogged = req.session.userLogged;
    return next ();
} else if (req.cookies.email) {
    db.User.findOne ({
        where: {
            email: req.cookes.email
        }
    })
    .then (user => {
        req.session.userLogged = user;
        req.locals.isLogged = user;
        return next ()
    })
} else {
    return next ()
}
}

module.exports = userLoggedMiddleware;