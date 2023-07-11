require('dotenv').config();

const dbHost        = process.env.DATABASE_HOST;
const dbUser        = process.env.DATABASE_USERNAME;
const dbName        = process.env.DATABASE_NAME;
const dbPassword    = process.env.DATABASE_PASSWORD;
const dbPort        = process.env.DATABASE_PORT || '5432';

const port          = process.env.PORT || '4000';
const nodeEnv       = process.env.NODE_ENV;
const backofficeUrl = process.env.BACKEND_URL || 'http://localhost:3000';

let config = module.exports;

config.api = {
    port: port,
    basePath: 'api',
    nodeEnv: nodeEnv,
    backofficeUrl: backofficeUrl
}

config.db = {
    user: dbUser,
    password: dbPassword,
    name: dbName
}

config.db.details = {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    timezone: '+01:00',
    dialectOptions: {
        encrypt: true
    },
    logging: false
}

config.userRoles = {
    user: 0,
    admin: 1
}

config.keys = {
    secret: 'Qg,E-M0?GE+IW2k|a58?ZFo!A#X/demvkNtA}4>K1+V<,G/Sa~y9t(1c4f:#)<.'
}