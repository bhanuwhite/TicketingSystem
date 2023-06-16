const Category = require('../models/categorySchema');

exports.editCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let editedCategory = await Category.updateOne({ id }, { $set: { name: req.body.name } });
        let data = {
            message: "Category edited successfully",
            status: '200',
            edited: editedCategory
        }
        return res.status(200).send({ data });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}