module.exports = function(handler) {
    return async(req, res, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    };
}


/*
express-async-errors
if it doenot work in future do it manually
*/