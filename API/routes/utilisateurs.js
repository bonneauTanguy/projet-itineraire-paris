let router          = require('express').Router();

const config        = require('../config/config');
const allowOnly     = require('../services/route').allowOnly;

const Controller    = require('../controllers/utilisateurs');

let APIRoutes = function (passport) {
    /**
     * @swagger
     * /users:
     *   get:
     *     tags:
     *       - Utilisateurs
     *     summary: Retourne tous les utilisateurs
     *     description: Retourne tous les utilisateurs
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Liste
     *       401:
     *         description: Administrateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       500:
     *         description: Erreur interne
     */
    router.get('/users', allowOnly(config.userRoles.admin, Controller.getAll));

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     tags:
     *       - Utilisateurs
     *     summary: Retourne les infos d'un utilisateur
     *     description: Retourne les infos d'un utilisateur
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Identifiant de l'utilisateur
     *         in: body
     *         required: true
     *         type: int
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Administrateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       404:
     *         description: Aucun résultat pour cet utilisateur
     *       500:
     *         description: Erreur interne
     */
    router.get('/users/:id', allowOnly(config.userRoles.admin, Controller.getUserById));

    /**
     * @swagger
     * /users/add:
     *   put:
     *     tags:
     *       - Utilisateurs
     *     summary: Ajoute un utilisateur
     *     description: Ajoute un utilisateur
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: entry
     *         description: Utilisateur à ajouter
     *         schema:
     *           type: object
     *           properties:
     *             pseudo:
     *               type: string
     *             password:
     *               type: string
     *     responses:
     *       200:
     *         description: Succès
     *       400:
     *         description: Champs obligatoires manquants
     *       401:
     *         description: Administrateur non connecté
     *       403:
     *         description: Permissions insuffisantes
     *       500:
     *         description: Erreur interne
     */
    router.put('/users/add', allowOnly(config.userRoles.admin, Controller.add));

    /**
     * @swagger
     * /users/update/{userId}:
     *   post:
     *     tags:
     *       - Utilisateurs
     *     summary: Met à jour un utilisateur
     *     description: Met à jour un utilisateur
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: entry
     *         description: Utilisateur à modifier
     *         schema:
     *           type: object
     *           properties:
     *             pseudo:
     *               type: string
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Utilisateur non connecté
     *       404:
     *         description: Aucun résultat pour cet utilisateur
     *       500:
     *         description: Erreur interne
     */
    router.post('/users/update/:userId', allowOnly(config.userRoles.user, Controller.updateById));

    /**
     * @swagger
     * /users/password/update:
     *   post:
     *     tags:
     *       - Utilisateurs
     *     summary: Met à jour le mot de passe de l'utilisateur
     *     description: Met à jour le mot de passe de l'utilisateur
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: entry
     *         description: Utilisateur à modifier
     *         schema:
     *           type: object
     *           properties:
     *             password:
     *               type: string
     *             newPwd:
     *               type: string
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Utilisateur non connecté
     *       404:
     *         description: Aucun résultat pour cet utilisateur
     *       500:
     *         description: Erreur interne
     */
    router.post('/users/updatepwd/', allowOnly(config.userRoles.user, Controller.updatePwd));

    /**
     * @swagger
     * /users/delete/{userId}:
     *   delete:
     *     tags:
     *       - Utilisateurs
     *     summary: Supprime l'utilisateur connecté
     *     description: Supprime l'utilisateur connecté
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: params
     *         name: entry
     *         description: Utilisateur à supprimer
     *         type: integer
     *     responses:
     *       200:
     *         description: Succès
     *       401:
     *         description: Utilisateur non connecté
     *       404:
     *         description: Aucun résultat pour cet utilisateur
     *       500:
     *         description: Erreur interne
     */
    router.delete('/users/delete/:userId', allowOnly(config.userRoles.admin, Controller.deleteById));

    return router;
}

module.exports = APIRoutes;