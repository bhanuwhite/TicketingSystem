const Product = require('../models/productSchema');
const path = require('path');

var k = 1000;
exports.addProductsList = async (req, res) => {
    try {
        let productList = new Product({
            id: k,
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productCode: req.body.productCode,
            price: req.body.price,
            category: req.body.category.split(","),
            inventoryStatus: req.body.inventoryStatus,
            quantity: req.body.quantity,
        });
        k++;
        let details = await Product.find();

        if (req.files) {
            const url = 'http://localhost:3000/';
            const paths = req.files.map((file) => url + file.path);
            const concat = paths.join(', ');

            productList.images = concat;
        }

        for (let i = 0; i < details.length; i++) {
            let code = details[i].productCode;
            let data = {
                message: "Product code already exists",
                status: '400'
            }
            if (code === req.body.productCode) {
                return res.status(400).send({ data })
            }
        }
        await productList.save();
        let data = {
            message: "Product added successfully",
            status: '201',
            productDetails: productList
        }

        return res.status(201).json({ data })
    }
    catch (err) {
        return res.status(400).send(err);
    }
}
