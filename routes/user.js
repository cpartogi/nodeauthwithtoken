const express = require('express');
const router = express.Router();
const user = require('../models/user.js');
const utcDate = new Date(Date.now()).toISOString()

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json({
            status: "Success",
            statusCode: 200,
            message: "Success get users",
            timeStamp: utcDate,
            data : users,
         });
    } catch (err) {
        res.status(500).json({
            status: "Internal Server Error",
            statusCode: 500,
            message: err.message,
            timeStamp: utcDate,
            data : null,
         });
    }
});

// Add user
router.post('/', async (req, res) => {
    const userData = new user({
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
    });

    try {
        const newUser = await userData.save();
        res.status(200).json({
            status: "Success",
            statusCode: 200,
            message: "Success register user",
            timeStamp: utcDate,
            data : {id: newUser._id},
         });
    } catch (err) {
        res.status(400).json({
            status: "Bad Request",
            statusCode: 400,
            message: err.message,
            timeStamp: utcDate,
            data : null,
         });
    }
});

// Edit user
router.post('/', async (req, res) => {
    const userData = new user({
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
    });

    try {
        const newUser = await userData.save();
        res.status(200).json({
            status: "Success",
            statusCode: 200,
            message: "Success update user data",
            timeStamp: utcDate,
            data : newUser,
         });
    } catch (err) {
        res.status(400).json({
            status: "Bad Request",
            statusCode: 400,
            message: err.message,
            timeStamp: utcDate,
            data : null,
         });
    }
});

module.exports = router;