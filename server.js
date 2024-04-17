const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use('/user', userRoutes);

const port = 3000;

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://root:1234@localhost:27017/');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});