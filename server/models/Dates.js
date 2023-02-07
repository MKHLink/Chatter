const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const datesSchema = new Schema({

    dateName: {
        type: String,
        max: 100
    },

    dateOfOccasion: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
},
{
    toJSON:{
        getters: true
    }
});

const Dates = model('Dates', datesSchema);

module.exports = Dates;