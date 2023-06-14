const mongoose = require('mongoose');

const taxListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
    }
},
    { timestamps: true ,versionKey: false });
const TaxList = mongoose.model('TaxList', taxListSchema);
module.exports = TaxList;