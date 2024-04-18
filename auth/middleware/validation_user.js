const UserModel = require('../../users/models/user_model');
const crypto = require('crypto');
const utcDate = new Date(Date.now()).toISOString()


exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.userName) {
            errors.push('userName required');
        }
        if (!req.body.password) {
            errors.push('password required');
        }

        if (errors.length) {
            return res.status(400).json({
                status: "Bad Request",
                statusCode: 400,
                message: errors.join(','),
                timeStamp: utcDate,
                data : null,
             });
    
        } else {
            return next();
        }
    } else {
        return res.status(400).json({
            status: "Bad Request",
            statusCode: 400,
            message: "userName and password required",
            timeStamp: utcDate,
            data : null,
         });
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByUserName(req.body.userName)
        .then((user)=>{
            if(!user[0]){
                res.status(404).json({
                    status: "Not Found",
                    statusCode: 404,
                    message: "userName not found",
                    timeStamp: utcDate,
                    data : null,
                 });

            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user[0]._id,
                        email: user[0].email,
                        permissionLevel: user[0].permissionLevel,
                        provider: 'email',
                        name: user[0].firstName + ' ' + user[0].lastName,
                    };
                    return next();
                } else {
                    return res.status(400).json({
                        status: "Bad Request",
                        statusCode: 404,
                        message: "Invalid userName or password",
                        timeStamp: utcDate,
                        data : null,
                     });
                }
            }
        });
};