const Category = require('../models/categorySchema');

exports.deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let deletedCategory = await Category.deleteOne({ id });
        let data = {
            message: "Category deleted",
            status: '200',
        }
        return res.status(200).send({ data });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}