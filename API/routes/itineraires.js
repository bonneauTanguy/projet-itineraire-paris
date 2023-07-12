let router          = require('express').Router();

const config        = require('../config/config');
const allowOnly     = require('../services/route').allowOnly;

const Controller    = require('../controllers/itineraires');

let APIRoutes = function (passport) {
    /**
     * @swagger
     * /itineraires:
     *   get:
     *     tags:
     *       - Itinéraires
     *     summary: Retourne tous les itinéraires
     *     description: Retourne tous les itinéraires
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Liste
     *       401:
     *         description: Utilisateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       500:
     *         description: Erreur interne
     */
    router.get('/itineraires', allowOnly(config.userRoles.user, Controller.getAll));

    /**
     * @swagger
     * /itineraires/{id}:
     *   get:
     *     tags:
     *       - Itinéraires
     *     summary: Retourne les infos d'un itinéraire
     *     description: Retourne les infos d'un itinéraire
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Identifiant de l'itinéraire
     *         in: body
     *         required: true
     *         type: int
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Utilisateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       404:
     *         description: Aucun résultat pour cet itinéraire
     *       500:
     *         description: Erreur interne
     */
    router.get('/itineraires/:id', allowOnly(config.userRoles.user, Controller.getItineraireById));

    /**
     * @swagger
     * /itineraires/getFile/{id}:
     *   get:
     *     tags:
     *       - Itinéraires
     *     summary: Retourne le pdf de l'itinéraire
     *     description: Retourne le pdf de l'itinéraire
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Identifiant de l'itinéraire
     *         in: body
     *         required: true
     *         type: int
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Utilisateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       404:
     *         description: Aucun résultat pour cet itinéraire
     *       500:
     *         description: Erreur interne
     */
    router.get('/itineraires/getFile/:id', allowOnly(config.userRoles.user, Controller.getFile));

    /**
     * @swagger
     * /itineraires/add:
     *   put:
     *     tags:
     *       - Itinéraires
     *     summary: Ajoute un itinéraire
     *     description: Ajoute un itinéraire
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: entry
     *         description: Itinéraire à ajouter
     *         schema:
     *           type: object
     *           properties:
     *             depart:
     *               type: string
     *             arrivee:
     *               type: string
     *     responses:
     *       200:
     *         description: Succès
     *       400:
     *         description: Champs obligatoires manquants
     *       401:
     *         description: Utilisateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       500:
     *         description: Erreur interne
     */
    router.put('/itineraires/add', allowOnly(config.userRoles.user, Controller.add));

    /**
     * @swagger
     * /itineraires/update/{itineraireId}:
     *   post:
     *     tags:
     *       - Itinéraires
     *     summary: Met à jour un itinéraire
     *     description: Met à jour un itinéraire
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: entry
     *         description: Itinéraire à modifier
     *         schema:
     *           type: object
     *           properties:
     *             depart:
     *               type: string
     *             arrivee:
     *               type: string
     *     responses:
     *       200:
     *         description: Succès
     *       400:
     *         description: Champs obligatoires manquants
     *       401:
     *         description: Utilisateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       404:
     *         description: Aucun résultat pour cet itinéraire
     *       500:
     *         description: Erreur interne
     */
    router.post('/itineraires/update/:itineraireId', allowOnly(config.userRoles.user, Controller.updateById));

    /**
     * @swagger
     * /itineraires/delete/{itineraireId}:
     *   delete:
     *     tags:
     *       - Itinéraires
     *     summary: Supprime l'itinéraire
     *     description: Supprime l'itinéraire
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: params
     *         name: entry
     *         description: Itinéraire à supprimer
     *         type: integer
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Utilisateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       404:
     *         description: Aucun résultat pour cet itinéraire
     *       500:
     *         description: Erreur interne
     */
    router.delete('/itineraires/delete/:itineraireId', allowOnly(config.userRoles.user, Controller.deleteById));

    /**
     * @swagger
     * /itineraires/user/{userId}:
     *   get:
     *     tags:
     *       - Itinéraires
     *     summary: Retourne tous les itinéraires de l'utilisateur connecté
     *     description: Retourne tous les itinéraires de l'utilisateur connecté
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Liste
     *       401:
     *         description: Utilisateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       500:
     *         description: Erreur interne
     */
    router.get('/itineraires/user/:userId', allowOnly(config.userRoles.user, Controller.getItinerairesByUser));

    return router;
}

module.exports = APIRoutes;