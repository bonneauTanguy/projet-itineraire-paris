const models    = require('../models');
const Op        = require('sequelize').Op;
const jwt       = require('jsonwebtoken');

let Controller = {
    signin: async function (req, rep) {
        try {
            const user = req.user.dataValues;
            const secret = user.pseudo + '-' + user.createdAt;

            const tokenExist = await models.tokens.findOne({ where: { utilisateurId: user.id } });

            if (tokenExist) {
                rep.json({ result: true, token: tokenExist.token, error: '' });
            } else {
                const token = jwt.sign(user, secret, { expiresIn: '24h' });

                await models.tokens.create({
                    token: token,
                    deletedAt: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
                    utilisateurId: user.id
                });

                rep.json({ result: true, token: token, error: '' });
            }
        } catch (error) {
            rep.json({ result: false, error: 'Erreur interne' });
        }
    },

    logout: function (req, rep, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            rep.status(200).json({ result: true, error: '' });
        });
    },

    userInfo: async function (req, rep) {
        try {
            const user = req.user;
            const token = await models.tokens.findOne({ where: { utilisateurId: user.id } });

            if (token) {
                rep.status(200).json({
                    id: req.user.id,
                    pseudo: req.user.pseudo,
                    admin: req.user.isAdmin,
                    token: token.token
                });
            } else {
                rep.status(404).json({ error: 'Aucun token trouvé pour cet identifiant.' });
            }
        } catch (error) {
            rep.status(500).json({ error: 'Erreur interne' });
        }
    },

    register: async function (req, rep) {
        let { pseudo, password } = req.body;

        if (!pseudo || !password) {
            rep.status(400).json({ result: false, error: 'Veuillez renseigner les champs obligatoires.' });
        } else {
            try {
                const exist = await models.utilisateurs.count({ where: { pseudo: pseudo, password: { [Op.ne]: null } } });
                
                if (!exist) {
                    let newUser = {
                        pseudo: pseudo,
                        password: password
                    };

                    await models.utilisateurs.create(newUser);
                    rep.status(201).json({ result: true, error: '' });
                } else {
                    rep.status(409).json({ result: false, error: 'Le pseudo est déjà utilisé.' });
                }
            } catch (error) {
                console.log(error);
                rep.status(500).json({ result: false, error: 'Erreur interne' });
            }
        }
    }
}

module.exports = Controller;