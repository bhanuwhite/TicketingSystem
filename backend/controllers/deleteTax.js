const Tax = require('../models/taxSchema');

exports.deleteTheTaxes = async (req, res) => {
    try {
        let id = req.params.id;
        let deletedTax = await Tax.deleteMany({ id });
        let data = {
            message: "Tax data deleted",
            status: '200',
        }
        return res.status(200).send({ data });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}