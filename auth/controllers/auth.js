const jwtSecret = require('../../lib/config/config.js').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
const utcDate = new Date(Date.now()).toISOString()

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(200).json({
            status: "Success",
            statusCode: 200,
            message: "sucess login",
            timeStamp: utcDate,
            data : {accessToken: token, refreshToken: refresh_token},
         });

    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            statusCode: 500,
            message: err,
            timeStamp: utcDate,
            data : null,
         });
    }
};

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        //res.status(201).send({id: token});
        res.status(200).json({
            status: "Success",
            statusCode: 200,
            message: "success get refresh token",
            timeStamp: utcDate,
            data : {id: token},
         });
    } catch (err) {
        res.status(500).json({
            status: "Internal server error",
            statusCode: 500,
            message: err,
            timeStamp: utcDate,
            data : null,
         });
    }
};