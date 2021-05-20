const fs = require ('fs');
const path = require ('path');

const db = require('../../../database/models');

function userLoggedMiddleware (req, res, next) {

res.locals.userLogged = false;

if (req.session.userLogged) {
    res.locals.userLogged = req.session.userLogged
    return next();
    } else if (req.cookies.email) {
        db.User.findOne({
            where: {
                email: req.cookies.email
                }
            })
            .then(user => {
                req.session.userLogged = user;
                res.locals.userLogged = user;
                return next();
            })
            .catch (error => {
                res.send(error)
            })
        } else {
            return next()
        }
    }

module.exports = userLoggedMiddleware;