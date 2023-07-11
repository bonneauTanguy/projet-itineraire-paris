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
    token: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
    }
}

const modelOptions = {
    freezeTableName: true,
    paranoid: true,
    timestamps: true
}

let tokensModel = db.define('tokens', modelDefinition, modelOptions);

tokensModel.belongsTo(models.utilisateurs);

module.exports = tokensModel;