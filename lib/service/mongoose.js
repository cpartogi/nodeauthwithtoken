const mongoose = require('mongoose');
let count = 0;

const options = {
    autoIndex: false, 
    poolSize: 10, 
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
 //   useNewUrlParser: true,
 //   useUnifiedTopology: true
    
};
const connect = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect("mongodb://localhost:27017/db_cpartogi_betest", options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
    })
};

connect();

exports.mongoose = mongoose;