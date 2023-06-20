// const Tax = require('../models/taxSchema');

// exports.deleteTheTaxes = async (req, res) => {
//     let { itemIds } = req.body;
// console.log(itemIds)
//     try {
//         let deletedTax = await Tax.deleteMany({ _id: { $in: itemIds } });
//         console.log(deletedTax)
//         let data = {
//             message: `${deletedTax.deletedCount} data deleted`,
//             status: '200',
//         }
//         return res.status(200).send({ data });
//     }
//     catch (err) {
//         return res.status(400).send({ err });
//     }
// }

const Tax = require('../models/taxSchema');
exports.deleteMultipleTaxes = async (req, res) => {
    const { itemIds } = req.body; // Array of item IDs to delete
    try {

        const result = await Tax.deleteMany({ _id: { $in: itemIds } });
        let data = {
            message: `${result.deletedCount} items deleted`,
            status: '200',
        }
        return res.status(200).json({ data });
    }
    catch (err) {
        return res.status(400).json({ err });
    }
};
