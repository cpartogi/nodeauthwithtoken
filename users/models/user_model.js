const mongoose = require('../../lib/service/mongoose').mongoose;
const Schema = mongoose.Schema;

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
    return user.save();
};

exports.updatehUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return  User.deleteOne({_id: userId});
};