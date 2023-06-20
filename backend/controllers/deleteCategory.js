const Category = require('../models/categorySchema');

exports.deleteCategories = async (req, res) => {
    let { itemIds } = req.body;
    try {
        // let id = req.params.id;
        let result = await Category.deleteMany({ _id: { $in: itemIds } });
        let data = {
            message: `${result.deletedCount} items deleted`,
            status: '200',
        }
        return res.status(200).send({ data });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}