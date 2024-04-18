const UserModel = require('../models/user_model');
const crypto = require('crypto');
const utcDate = new Date(Date.now()).toISOString()


exports.isUserNameExist = (req, res, next) => {
    UserModel.findByUserName(req.body.userName)
        .then((user)=>{
            if(user[0]){
                res.status(409).json({
                    status: "Conflict",
                    statusCode: 409,
                    message: "userName already exist",
                    timeStamp: utcDate,
                    data : null,
                 });
            }else{
                return next();
             
            }
    });
};

exports.isAccountumberExist = (req, res, next) => {
    UserModel.findByAccountNumber(req.body.accountNumber)
        .then((user)=>{
            if(user){
                res.status(409).json({
                    status: "Conflict",
                    statusCode: 409,
                    message: "account number already exist",
                    timeStamp: utcDate,
                    data : null,
                 });
            }else{
                return next();
             
            }
    });
};