const mongoose = require('../../lib/service/mongoose').mongoose;
const Schema = mongoose.Schema;
const redis = require('redis');
const client = redis.createClient();

console.log("redis connection ....")
client.on('error', err => console.log('Redis Client Error', err));

client.connect().then(()=>{
    console.log('redis is connected')
}).catch(err=>{
    console.log('redis connection failed');
})


const userSchema = new Schema({
    userName: String,
    accountNumber: Number,
    emailAddress: String,
    password: String,
    identityNumber: Number
});


userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {       
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);

exports.findByUserName = (userName) => {
    return User.find({userName: userName});
};

exports.findByAccountNumber = (accountNumber) => {
   return User.findOne({accountNumber: accountNumber});
};

exports.findByIdentitytNumber = (identityNumber) => {
    return User.find({identityNumber: identityNumber});
};


exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            if(!result){
                return result;
            } else {
                result = result.toJSON();
                delete result._id;
                delete result.__v;
                return result;
            }
        });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    const jsonData = JSON.stringify(userData);
    client.set('redis_cpartogi_betest_accnumber_'+user.accountNumber, jsonData);
    client.set('redis_cpartogi_betest_idnumber_'+user.identityNumber, jsonData);
    return user.save();
};

exports.updatehUser = (id, userData) => {
    client.del('redis_cpartogi_betest_accnumber_'+userData.accountNumber, jsonData);
    client.del('redis_cpartogi_betest_idnumber_'+userData.identityNumber, jsonData);
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return  User.deleteOne({_id: userId});
};