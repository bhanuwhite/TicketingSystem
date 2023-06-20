const Order = require('../models/orderSchema');
<<<<<<< HEAD
let k = 1;
exports.getOrderPlaced = async (req, res) => {
    try {
        let promise = req.body.map(element => {
            let order = new Order(element)
            return order.save();
        });
        let result = await Promise.all(promise);

        let data = {
            message: "Orders added successfully",
            status: '201',
            orderDetails: result
=======
let k=1;
exports.getOrderPlaced = async (req, res) => {
    try {
        // let result= req.body.orders.forEach(element => {
        //     let order = new Order(element)
        //     order.save();
        // });
        let order = new Order({
            id: k,
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            tax: req.body.tax,
            totalAmount: req.body.totalAmount
        });
        k++;
        await order.save();

        let data = {
            message: "Order added successfully",
            status: '201',
            orderDetails: order
>>>>>>> ce615f3ba361df9c4500e8fce349fd333e6a2c59
        }
        return res.status(201).send({ data });
    }
    catch (err) {
        return res.status(400).send(err);
    }
} 