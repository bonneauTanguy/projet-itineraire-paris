const express   = require('express');
const helmet    = require('helmet');
const morgan    = require('morgan');
const passport  = require('passport');
const cors      = require('cors');
const glob      = require('glob');
const path      = require('path');

const swaggerJsDoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

const session           = require('express-session');
const config            = require('./config/config');
const passportStrategy  = require('./services/passport');

const swaggerDocs = swaggerJsDoc({
    swaggerDefinition: {
        info: {
            title: 'Itinéraire Paris',
            description: 'API Itinéraire Paris'
        },
        basePath: `/${config.api.basePath}`
    },
    apis: ['./routes/*.js']
});

// Initialisations
let app = express();
app.use(session({ secret: config.keys.secret, resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// HTTP logger
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// CORS avec le backend
app.use(cors({ origin: config.api.backofficeUrl, credentials: true }));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passportStrategy.hookLocalStrategy(passport);

// Swagger
if (config.api.nodeEnv === 'dev') {
    app.use(`/${config.api.basePath}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// Routes de l'API
glob.sync('./routes/**/*.js').forEach(file =>
    app.use(`/${config.api.basePath}`, require(path.resolve(file))(passport)));

// Port de l'API
app.listen(config.api.port, function () {
    console.log(`Server started on port ${config.api.port}`);
});