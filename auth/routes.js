const VerifyUserMiddleware = require('./middleware/validation_user');
const AuthorizationController = require('./controllers/auth');
const AuthValidationMiddleware = require('../lib/middleware/validation_middleware');

exports.routesConfig = function (app) {

    app.post('/login', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/auth/refresh', [
        AuthValidationMiddleware.validJWTNeeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);
};