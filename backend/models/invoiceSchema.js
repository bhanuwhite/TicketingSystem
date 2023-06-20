const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String
    },
    orderId: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    totalTax: {
        type: Number
    },
    counter: {
        type: Number
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;