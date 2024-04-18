const UserModel = require('../models/user_model');
const crypto = require('crypto');
const utcDate = new Date(Date.now()).toISOString()

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(200).json({
                status: "Success",
                statusCode: 200,
                message: "sucess add new user",
                timeStamp: utcDate,
                data : {id: result._id},
            });

        });
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            if(!result){
                res.status(404).json({
                    status: "Not Found",
                    statusCode: 404,
                    message: "data not found",
                    timeStamp: utcDate,
                    data : null,
                });
            } else {
                res.status(200).json({
                    status: "Success",
                    statusCode: 200,
                    message: "sucess get user data",
                    timeStamp: utcDate,
                    data : {userName:result.userName, accountNumber: result.accountNumber, emailAddress:result.emailAddress, identityNumber:result.identityNumber},
                });
           }
        });
};

exports.getByAccountNumber = (req, res) => {
    UserModel.findByAccountNumber(req.params.number)
        .then((result) => {
            if(!result){
                res.status(404).json({
                    status: "Not Found",
                    statusCode: 404,
                    message: "data not found",
                    timeStamp: utcDate,
                    data : null,
                });
            } else {
            res.status(200).json({
                status: "Success",
                statusCode: 200,
                message: "sucess get user data",
                timeStamp: utcDate,
                data :  {id: result._id, userName:result.userName, accountNumber: result.accountNumber, emailAddress:result.emailAddress, identityNumber:result.identityNumber},
            });
            } 
        });
};

exports.getByIdentitytNumber = (req, res) => {
    UserModel.findByIdentitytNumber(req.params.number)
        .then((result) => {
            if(!result){
                res.status(404).json({
                    status: "Not Found",
                    statusCode: 404,
                    message: "data not found",
                    timeStamp: utcDate,
                    data : null,
                });
            } else {      
            var response = new Object();
            result.forEach(obj => {
                console.log(`username = ${obj.userName}, accountNumber = ${obj.accountNumber}`);
                response["id"] = obj.id;
                response[`userName`] = obj.userName;
                response["accountNumber"] = obj.accountNumber;
                response["emailAddress"] = obj.emailAddress;
                response["identityNumber"] = obj.identityNumber;
            });
            res.status(200).json({
                status: "Success",
                statusCode: 200,
                message: "sucess get user data",
                timeStamp: utcDate,
                data : response,
            });
            } 
        });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};