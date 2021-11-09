const express = require('express');
const winston = require('winston');
const config = require('config');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}

require('./startup/logging')();
require("./startup/cors")(app);
require('./startup/routes')(app);
require('./startup/db')();
require("./startup/config")();
require('./startup/validation')();

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () => {
    winston.info(`Listening on port ${port}... `);
});

module.exports = server;