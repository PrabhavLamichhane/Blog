const cors = require("cors");

module.exports = function(app) {
    app.use(cors({
        exposedHeaders: ['Content-Length', 'x-auth-token'],
    }));
};