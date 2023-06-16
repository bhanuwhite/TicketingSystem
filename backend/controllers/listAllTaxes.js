const Tax = require('../models/taxSchema');

exports.getAllTaxDisplay = async (req, res) => {
    try {
        let formData = await Tax.find().populate('period', 'startDate endDate -_id');

        let data = {
            message: 'Successfully created',
            status: '201',
            data: formData
        }
        return res.status(201).send({ data });
    }

    catch (err) {
        return res.status(400).send({ err });
    }
}