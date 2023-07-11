const bcrypt = require('bcryptjs');

function comparePasswords(password, hash, callback) {
    bcrypt.compare(password, hash, function (error, isMatch) {
        if (error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

function hashPassword(user) {
    if (user.changed('password') && (!user.password.startsWith('$') && user.password.length != 60)) {
        return bcrypt.hash(user.password, 10).then(function (password) {
            user.password = password;
        });
    }
}

module.exports = {
    comparePasswords,
    hashPassword
}