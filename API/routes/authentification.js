let router          = require('express').Router();

const config        = require('../config/config');
const allowOnly     = require('../services/route').allowOnly;

const Controller    = require('../controllers/authentification');

let APIRoutes = function (passport) {
    /**
     * @swagger
     * /register:
     *   put:
     *     tags:
     *       - Authentification
     *     summary: Inscription
     *     description: Ajoute un utilisateur (pseudo & password sont obligatoires)
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: user
     *         description: Identifiants
     *         schema:
     *           type: object
     *           properties:
     *             pseudo:
     *               type: string
     *             password:
     *               type: string
     *     responses:
     *       201:
     *         description: Succès
     *       400:
     *         description: Champs manquants / Pseudo invalide
     *       409:
     *         description: Pseudo déjà utilisé
     *       500:
     *         description: Erreur
     */
    router.put('/register', Controller.register);

    /**
     * @swagger
     * /signin:
     *   post:
     *     tags:
     *       - Authentification
     *     summary: Connexion
     *     description: Connexion
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: user
     *         description: Identifiants
     *         schema:
     *           type: string
     *           properties:
     *             pseudo:
     *               type: string
     *             password:
     *               type: string
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Identifiants incorrects
     */
    router.post('/signin', passport.authenticate('local', { session: true }), Controller.signin);

    /**
     * @swagger
     * /userInfo:
     *   get:
     *     tags:
     *       - Authentification
     *     summary: Retourne les informations de l'utilisateur connecté
     *     description: Retourne les informations de l'utilisateur connecté
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Liste
     *       500:
     *         description: Erreur interne
     */
    router.get('/userInfo', allowOnly(config.userRoles.user, Controller.userInfo));

    /**
     * @swagger
     * /logout:
     *   get:
     *     tags:
     *       - Authentification
     *     summary: Déconnexion
     *     description: Déconnexion
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Utilisateur non connecté
     */
    router.get('/logout', allowOnly(config.userRoles.user, Controller.logout));
    
    return router;
}

module.exports = APIRoutes;