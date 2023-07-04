const Product = require('../models/productSchema');

exports.getQuantityDetails = async (req, res) => {
    try {
        const { productName, quantity } = req.body;
        const actualQuantity = await Product.find({ productName }).select('quantity');

        if (actualQuantity.length!=0 && actualQuantity[0].quantity >= quantity ) 
        {
            const remainingQuantity = actualQuantity[0].quantity - quantity;
            const updatedQuantity = await Product.updateOne({ productName: productName }, { $set: { quantity: remainingQuantity } });
            const data = {
                message: "success",
                status: '200',
                result: updatedQuantity
            }
            return res.status(200).json(data);
        }
        return res.status(400).json({
            message: `Either product doesn't exist or quantity out of the stock!`,
            status: "400"
        })

    }
    catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message);
    }
}