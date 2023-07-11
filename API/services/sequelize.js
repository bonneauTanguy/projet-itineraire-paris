const config    = require('../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);

sequelize.sync({ alter: true });

module.exports = sequelize;