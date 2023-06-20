const Order = require('../models/orderSchema');

exports.displayAllOrders = async (req, res) => {
    try {
        let result = await Order.find();
        let data = {
            message: 'Success',
            status: '200',
            data: result
        }
        return res.status(200).send({ data });
    }

    catch (err) {
        return res.status(400).send({ err });
    }
}