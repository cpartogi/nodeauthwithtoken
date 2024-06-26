const UsersController = require('./controllers/users');
const ValidationMiddleware = require('../lib/middleware/validation_middleware');
const UserValidationMiddleware = require('./middleware/validation');


/**
 * @swagger
 * components:
 *   schemas:
 *     AddUser:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *         - accountNumber
 *       properties:
 *         userName:
 *           type: string
 *           description: user name
 *         password:
 *           type: string
 *           description: password
 *         accountNumber:
 *           type: integer
 *           description: account number
 *         emailAddress:
 *           type: string
 *           description: email address
 *         identityNumber:
 *           type: integer
 *           description: identity number
 *     UpdateUser:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           description: password
 *         emailAddress:
 *           type: string
 *           description: email address
 *         identityNumber:
 *           type: integer
 *           description: identity number
 *     AddUserResponse:
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
 *              id:
 *                 type: string
 *                 description: id user
 *     GetUserByIdResponse:
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
 *              userName:
 *                 type: string
 *                 description: user name
 *              accountNumber:
 *                 type: integer
 *                 description: account number
 *              emailAddress:
 *                 type: string
 *                 description: email address
 *              identityNumber:
 *                 type: integer
 *                 description: identity number           
 *     GetUserByNumberResponse:
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
 *              id:
 *                 type: string
 *                 description: id
 *              userName:
 *                 type: string
 *                 description: user name
 *              accountNumber:
 *                 type: integer
 *                 description: account number
 *              emailAddress:
 *                 type: string
 *                 description: email address
 *              identityNumber:
 *                 type: integer
 *                 description: identity number         
 */


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 * /users:
 *   post:
 *     summary: add a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUser'
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddUserResponse'
 *       400:
 *         description: bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: conflict
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
 * /users/{userId}:
 *   get:
 *     summary: get user data by userId
 *     security:
 *         - basicauth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: user id
 *         schema:
 *           type : string
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserByIdResponse'
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: forbidden
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
 *   put:
 *     summary: update user data
 *     security:
 *         - basicauth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: user id
 *         schema:
 *           type : string
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: forbidden
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
*   delete:
 *     summary: delete user data
 *     security:
 *         - basicauth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: user id
 *         schema:
 *           type : string
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: forbidden
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
 * /users/accountnumber/{accountNumber}:
 *   get:
 *     summary: get user data by account number
 *     security:
 *         - basicauth: []
 *     parameters:
 *       - name: accountNumber
 *         in: path
 *         required: true
 *         description: account number
 *         schema:
 *           type : integer
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserByNumberResponse'
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: forbidden
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
 * /users/identitynumber/{identityNumber}:
 *   get:
 *     summary: get user data by identity number
 *     security:
 *         - basicauth: []
 *     parameters:
 *       - name: identityNumber
 *         in: path
 *         required: true
 *         description: account number
 *         schema:
 *           type : integer
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserByNumberResponse'
 *       401:
 *         description: unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: forbidden
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
 */



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