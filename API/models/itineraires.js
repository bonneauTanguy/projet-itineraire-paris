const Sequelize = require('sequelize');
const db        = require('../services/sequelize');
const models    = require('./index');

let modelDefinition = {
    id: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    depart: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 250],
                msg: "Le point de départ de l'itinéraire doit faire entre 1 et 250 caractères."
            }
        }
    },
    arrivee: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1, 250],
                msg: "Le point d'arrivée de l'itinéraire doit faire entre 1 et 250 caractères."
            }
        }
    },
    pdf: {
        type: Sequelize.DataTypes.BLOB,
        allowNull: true
    }
}

let modelOptions = {
    freezeTableName: true,
    paranoid: true,
    timestamps: true
}

let itinerairesModel = db.define('itineraires', modelDefinition, modelOptions);

itinerairesModel.belongsTo(models.utilisateurs);

module.exports = itinerairesModel;