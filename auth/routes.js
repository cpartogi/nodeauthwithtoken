const VerifyUserMiddleware = require('./middleware/validation_user');
const AuthorizationController = require('./controllers/auth');
const AuthValidationMiddleware = require('../lib/middleware/validation_middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: user name
 *         password:
 *           type: string
 *           description: password
 *       example:
 *         userName: abcdef
 *         password: 121211password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: status
 *         statusCode:
 *           type: integer
 *           description: status code
 *         message:
 *           type: string
 *           description: error message
 *         timestamp:
 *           type: string
 *           description: timestamp
 *         data:
 *           type: object
 *           properties:
 *              accessToken:
 *                  type: string
 *                  description: access token
 *              refreshToken:
 *                  type: string
 *                  description: refresh token
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: status
 *         statusCode:
 *           type: integer
 *           description: status code
 *         message:
 *           type: string
 *           description: error message
 *         timestamp:
 *           type: string
 *           description: timestamp
 *         data:
 *           type: object
 *           description: data
 *   securitySchemes:
 *     basicauth:
 *       type: http
 *       scheme: bearer
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 * /login:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

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
        AuthorizationController.refresh_token
    ]);
};