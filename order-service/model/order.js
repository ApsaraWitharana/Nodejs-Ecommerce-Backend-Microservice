const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: String,
    items: [{ itemId: String, quantity: Number }],
    totalAmount: Number
});

module.exports = mongoose.model('Order', OrderSchema);
