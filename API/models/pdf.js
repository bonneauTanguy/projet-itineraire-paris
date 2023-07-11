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

let pdfsModel = db.define('pdfs', modelDefinition, modelOptions);

pdfsModel.belongsTo(models.itineraires);

module.exports = pdfsModel;