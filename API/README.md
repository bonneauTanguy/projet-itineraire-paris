# Itinéraire Paris - API

## Fichier d'environnement dev
Créer un fichier .env à la racine du dossier API avec le contenu ci-dessous.
```
DATABASE_HOST=
DATABASE_USERNAME='' (le nom d'utilisateur de la BDD)
DATABASE_NAME='ItineraireParis'
DATABASE_PASSWORD='' (le mot de passe de la BDD)
DATABASE_PORT=5432
NODE_ENV='dev'
```

## Base de données
Créer une base de données nommées ItineraireParis. Sequelize s'occupera de créer automatiquement les tables. Il peut être nécessaire de devoir adapter le fichier config.js (/config/config.js) car fait pour PostgreSQL.

## Lancement
Taper `node index.js` pour démarrer l'API.