const {Schema, model} = require('mongoose');

const datesSchema = new Schema({

    dateName: {
        type: String,
        max: 100
    },

    dateOfOccasion: {
        type: Date,
        default: Date.now
    }
});

const Dates = model('Dates', datesSchema);

module.exports = Dates;