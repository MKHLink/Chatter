const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema(
    {
        textBody:{
            type: String,
            max: 400
        },

        username:{
            type: String,
            required: true
        },

        createdAt:{
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON:{
            getters: true
        }
    }
);

const Message = model('Message', messageSchema);

module.exports = Message;