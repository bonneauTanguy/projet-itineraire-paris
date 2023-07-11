const Sequelize = require('sequelize');
const bcrypt    = require('../utils/bcrypt');
const db        = require('../services/sequelize');

let modelDefinition = {
    id: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: Sequelize.DataTypes.UUIDV1,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    pseudo: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: {
                args: [1, 250],
                msg: "Le pseudo doit faire entre 1 et 250 caractères."
            }
        }
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [1, 250],
                msg: "Le mot de passe doit faire entre 1 et 250 caractères."
            }
        }
    },
    isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}

let modelOptions = {
    instanceMethods: {
        comparePasswords: bcrypt.comparePasswords
    },
    hooks: {
        beforeValidate: bcrypt.hashPassword
    },
    freezeTableName: true,
    paranoid: true,
    timestamps: true
}

let utilisateursModel = db.define('utilisateurs', modelDefinition, modelOptions);

module.exports = utilisateursModel;