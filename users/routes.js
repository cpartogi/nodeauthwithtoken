const UsersController = require('./controllers/users');
const ValidationMiddleware = require('../lib/middleware/validation_middleware');
const UserValidationMiddleware = require('./middleware/validation');

exports.routesConfig = function (app) {
    app.post('/users', [
        UserValidationMiddleware.isUserNameExist,
        UserValidationMiddleware.isAccountumberExist,
        UsersController.insert
    ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.getById
    ]);
    app.get('/users/accountnumber/:number', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.getByAccountNumber
    ]);
    app.get('/users/identitynumber/:number', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.getByIdentitytNumber
    ]);
    app.put('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.updateById
    ]);
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.removeById
    ]);
};