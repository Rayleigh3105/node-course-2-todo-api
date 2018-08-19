const validator = require('validator')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


var UserSchema = new mongoose.Schema(
{
    email: {
        required: true,
            trim: true,
            type: String,
            minLength: 1,
            unique: true,
            validate: {
            validator: validator.isEmail,
                message: `{VALUE} is not a valid email`
        },
        password: {
            type: String,
            require: true,
            minLength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
    }
});

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign( {_id: user._id.toHexString(), access}, 'abc123').toString();

    // user.tokens = user.tokens.concat([{access, token}]);
    user.tokens.push({access, token})

    return user.save().then( () => {
        return token;
    })
};

var User = mongoose.model('User', UserSchema);

module.exports = { User }