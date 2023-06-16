const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
},
    { timestamps: true });

const Period = mongoose.model('Period', periodSchema);
module.exports = Period;