const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active","block"],
        default: "active"
    }
},
    { timestamps: true });
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;