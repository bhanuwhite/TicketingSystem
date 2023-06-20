const Order = require('../models/orderSchema');
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
        }
        return res.status(201).send({ data });
    }
    catch (err) {
        return res.status(400).send(err);
    }
} 