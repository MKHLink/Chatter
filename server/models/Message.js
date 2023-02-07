const {Schema, model} = require('mongoose');

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
            default: Date.now
        }
    }
);

const Message = model('Message', messageSchema);

module.exports = Message;