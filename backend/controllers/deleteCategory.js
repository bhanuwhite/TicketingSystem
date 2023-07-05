const Category = require('../models/categorySchema');

exports.deleteCategories = async (req, res) => {
    const id = req.params.id;
    try {
        let updatedCategory = await Category.updateOne({ id }, { $set: { status: "block" } });

        let data = {
            message: `Category blocked`,
            status: '200',
            categoryStatus: "block"
        }
        return res.status(200).send(data);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
}