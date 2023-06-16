const Order = require('../models/orderSchema');
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
        }
        return res.status(201).send({ data });
    }
    catch (err) {
        return res.status(400).send(err);
    }
} 