const Product = require('../models/productSchema');
const Customer = require('../models/custmoreDetailsSchema');
const Invoice = require('../models/invoiceSchema');
const Category = require('../models/categorySchema');

exports.getSaleActivity = async (req, res) => {
    try {
        const countProduct = await Product.aggregate([
            {
                $count: 'totalProducts'
            }
        ]);

        const countCustomer = await Customer.aggregate([
            {
                $count: 'totalCustomers'
            }
        ]);
        const countInvoice = await Invoice.aggregate([
            {
                $count: 'totalInvoices'
            }
        ]);

        const countCategory = await Category.aggregate([
            {
                $count: 'totalCategories'
            }
        ]);

        const totalCustomers = countCustomer.length > 0 ? countCustomer[0].totalCustomers : 0;
        const totalProducts = countProduct.length > 0 ? countProduct[0].totalProducts : 0;
        const totalInvoices = countInvoice.length > 0 ? countInvoice[0].totalInvoices : 0;
        const totalCategories = countCategory.length > 0 ? countCategory[0].totalCategories : 0;

        return res.status(200).json({
            message: "Success",
            status: '200',
            totalCustomers: totalCustomers,
            totalProducts: totalProducts,
            totalInvoices: totalInvoices,
            totalCategories: totalCategories
        });
    } catch (err) {
        return res.status(400).send(err.message);
    }
};
