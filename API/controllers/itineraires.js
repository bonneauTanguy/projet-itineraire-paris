const models = require('../models');
const fs     = require('fs');

let Controller = {
    getAll: async function (req, rep) {
        try {
            let results = await models.itineraires.findAll({
                attributes: {
                    exclude: ['deletedAt']
                }
            });

            rep.status(200).json({ result: results, error: '' });
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    getItineraireById: async function (req, rep) {
        try {
            let result = await models.itineraires.findOne({
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
            let { depart, arrivee } = req.body;

            if (!depart || !arrivee) {
                rep.status(400).json({ result: false, error: 'L\'itinéraire doit avoir un point de départ et un point d\'arrivée.' });
            } else {
                let newItineraire = {
                    depart: depart,
                    arrivee: arrivee
                };

                if (req.files) {
                    if (req.files.length > 0) {
                        newItineraire.pdf = fs.readFileSync(req.files[0].path);
                        fs.unlinkSync(req.files[0].path);
                    }
                }

                await models.itineraires.create(newItineraire);
                rep.status(201).json({ result: true, error: '' });
            }
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    updateById: async function (req, rep) {
        try {
            if (!req.body.depart || !req.body.arrivee) {
                rep.status(400).json({ result: false, error: 'L\'itinéraire doit avoir un point de départ et un point d\'arrivée.' });
            }

            let data = await models.itineraires.findOne({ where: { id: req.params.id } });

            if (data) {
                if (req.body.depart) data.depart = req.body.depart;
                if (req.body.arrivee) data.arrivee = req.body.arrivee;

                if (req.files?.length > 0) {
                    data.pdf = fs.readFileSync(req.files[0].path);
                    fs.unlinkSync(req.files[0].path);
                }

                await data.save();
                rep.status(200).json({ result: true, error: '' });
            } else {
                rep.status(404).json({ result: false, error: 'Aucun résultat pour cet identifiant.' });
            }
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    deleteById: async function (req, rep) {
        try {
            let entry = models.itineraires.findOne({ where: { id: req.params.id } });

            if (entry) {
                await models.pdf.destroy({ where: { itineraireId: req.params.id } });
                const result = await models.itineraires.destroy({ where: { id: req.params.id } });

                if (result) {
                    rep.status(200).json({ result: true, error: '' });
                } else {
                    rep.status(404).json({ result: false, error: 'Aucun résultat pour cet identifiant.' });
                }
            }
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    getFile: async function (req, rep) {
        try {
            let fichier = await models.itineraires.findOne({ where: { id: req.params.id } });
            
            if (fichier) {
                //

                rep.status(200).json({ result: fichier, error: '' });
            } else {
                rep.status(200).json({ result: null, error: '' });
            }
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    },

    getItinerairesByUser: async function (req, rep) {
        try {
            let results = await models.itineraires.findAll({
                where: { utilisateurId: req.user.id },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['deletedAt']
                }
            });

            rep.status(200).json({ result: results, error: '' });
        } catch (error) {
            rep.status(500).json({ result: false, error: 'Erreur interne' });
        }
    }
}

module.exports = Controller;