const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'user must have a name']
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);