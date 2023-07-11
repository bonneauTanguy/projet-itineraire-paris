exports.allowOnly = function (accessLevel, callback) {
    function checkUserRole(req, rep) {
        if (req.user) {
            if (req.user.isAdmin < accessLevel) {
                rep.sendStatus(403);
            } else {
                callback(req, rep);
            }
        } else {
            rep.sendStatus(401);
        }
    }

    return checkUserRole;
};