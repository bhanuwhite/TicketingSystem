const Category = require('../models/categorySchema');

exports.editCategory = async (req, res) => {
    try {
        let id = req.params.id;
        const {name,status} = req.body;
        let editedCategory = await Category.updateOne({ id }, { $set: { name,status } });
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