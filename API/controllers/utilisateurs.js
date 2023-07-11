const models = require('../models');
const bcrypt = require('../utils/bcrypt');

let Controller = {
    getAll: async function (req, rep) {
        try {
            let results = await models.utilisateurs.findAll({
                order: [['pseudo', 'ASC']],
                attributes: {
                    exclude: ['deletedAt']
                }
            });

            rep.status(200).json({ result: results, error: '' });
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    getUserById: async function (req, rep) {
        try {
            let result = await models.utilisateurs.findOne({
                where: { id: req.params.id },
                attributes: {
                    exclude: ['deletedAt']
                }
            });

            if (result) {
                rep.status(200).json({ result: result, error: '' });
            } else {
                rep.status(404).json({ result: false, error: 'Aucun résultat pour cet identifiant.' });
            }
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },
    
    add: async function (req, rep) {
        try {
            let instance = await models.utilisateurs.build(req.body);
            await instance.save();
            rep.status(201).json({ result: true, error: '' });
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    updateById: async function (req, rep) {
        try {
            let { pseudo } = req.body;
            let entry = await models.utilisateurs.findOne({ where: { id: req.user.id } });

            if (entry) {
                if (pseudo) {
                    const exist = await models.utilisateurs.count({ where: { pseudo: pseudo } });

                    if (!exist) {
                        entry.pseudo = pseudo;
                    } else {
                        return rep.status(409).json({ result: false, error: 'Le pseudo est déjà utilisé.' });
                    }
                }

                await entry.save();
                rep.status(200).json({ result: true, error: '' });
            } else {
                rep.status(404).json({ result: false, error: 'Aucun résultat pour cet identifiant.' });
            }
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    updatePwd: async function (req, rep) {
        try {
            let { password, newPwd } = req.body;
            let entry = await models.utilisateurs.findOne({ where: { id: req.user.id } });

            bcrypt.comparePasswords(password, entry.password, async function (error, isMatch) {
                if (isMatch && !error) {
                    entry.password = newPwd;
                    await entry.save();
                    rep.status(200).json({ result: true, error: '' });
                } else {
                    rep.status(400).json({ result: false, error: 'Le mot de passe actuel est incorrect.' });
                }
            });
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    deleteById: async function (req, rep) {
        try {
            let result = models.utilisateurs.destroy({ where: { id: req.user.id } });

            if (result) {
                rep.status(200).json({ result: true, error: '' });
            } else {
                rep.status(404).json({ result: false, error: 'Aucun résultat pour cet identifiant.' });
            }
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    }
}

module.exports = Controller;