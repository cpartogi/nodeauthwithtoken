const mongoose = require('mongoose');


const connect = () => {
    console.log('MongoDB connection ....')
    mongoose.connect("mongodb://root:1234@localhost:27017/").then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection failed');
    })
};

connect();

exports.mongoose = mongoose;