const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tax: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
    },
},
    { timestamps: true ,versionKey: false}
);


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;