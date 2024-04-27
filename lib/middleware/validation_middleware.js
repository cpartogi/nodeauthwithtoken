const jwt = require('jsonwebtoken'),
    secret = require('../config/config.js').jwt_secret,
    crypto = require('crypto');

const utcDate = new Date(Date.now()).toISOString()    

exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refreshToken) {
        return next();
    } else {
        return res.status(400).json({
            status: "Bqd Request",
            statusCode: 400,
            message: "refresh_token required'",
            timeStamp: utcDate,
            data : null,
         });
    }    
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = Buffer.from(req.body.refreshToken, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).json({
            status: "Bqd Request",
            statusCode: 400,
            message: "invalid refresh token'",
            timeStamp: utcDate,
            data : null,
         });
    }
};


exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).json({
                    status: "Unauthorized",
                    statusCode: 401,
                    message: "invalid format",
                    timeStamp: utcDate,
                    data : null,
                 });
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).json({
                status: "Forbidden",
                statusCode: 403,
                message: "not allowed to access",
                timeStamp: utcDate,
                data : null,
             });
        }
    } else {
        return res.status(401).json({
            status: "Unauthorized",
            statusCode: 401,
            message: "unauthorized",
            timeStamp: utcDate,
            data : null,
         });
    }
};