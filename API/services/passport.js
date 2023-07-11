const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models        = require('../models');
const bcryptUtils   = require('../utils/bcrypt');
const Op            = require('sequelize').Op;

exports.hookLocalStrategy = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'pseudo'
    },
        function (pseudo, password, cb) {
            models.utilisateurs.findOne({ where: { pseudo: pseudo, password: { [Op.ne]: null } } }).then(function (user) {
                if (!user) {
                    return cb(null, false);
                } else {
                    bcryptUtils.comparePasswords(password, user.password, function (error, isMatch) {
                        if (isMatch && !error) {
                            return cb(null, user);
                        } else {
                            return cb(null, false);
                        }
                    });
                }
            }).catch(function (error) {
                return cb(null, false);
            });
        }));
}

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
    await models.utilisateurs.findOne({ where: { id: id } }).then(async function (user) {
        if (user) {
            cb(null, user);
        }
    }).catch(function (error) {
        return cb(error);
    });
});