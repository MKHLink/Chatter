const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true
        },

        email: {
            type: String,
            require: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },

        password: {
            type: String,
            require: true
        },

        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
);

const User = model('User', userSchema);

module.exports = User;