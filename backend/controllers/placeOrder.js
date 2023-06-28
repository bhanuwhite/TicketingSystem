const Order = require('../models/orderSchema');
let k;
exports.getOrderPlaced = async (req, res) => {
    try {
        // let promise = req.body.map(element => {
        //     let order = new Order(element)
        //     return order.save();
        // });
        // let result = await Promise.all(promise);
        let result = await Order.find();
        if (result.length == 0) {
            k = 1;
        }
        else {
            let updateCount = result[result.length - 1].id;
            k = updateCount + 1;
        }
        let order = new Order({
            id: k,
            custName: req.body.custName,
            mobile: req.body.mobile,
            itemsList: req.body.itemsList
        })
        await order.save();
        let data = {
            message: "Orders added successfully",
            status: '201',
            orderDetails: order
        }
        return res.status(201).send({ data });
    }
    catch (err) {
        return res.status(400).send(err);
    }
} 
