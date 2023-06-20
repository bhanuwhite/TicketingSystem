const Tax = require('../models/taxSchema');
const upload = require('../middlewares/upload');

exports.taxEdit = async (req, res) => {
    try {
        let _id = req.params._id;
        // Parse the form data and files using multer middleware
        upload.none()(req, res, async (err) => {
            if (err) {
                return res.status(400).send(err);
            }
            try {
                    console.log(typeof(req.body.period));
                const updatedRecord = await Tax.findByIdAndUpdate({ _id: _id }, { new: true });
                updatedRecord.id = req.body.id || updatedRecord.id;
                updatedRecord.name = req.body.name || updatedRecord.name;
                // updatedRecord.period = req.body.period || updatedRecord.period;
                updatedRecord.period = req.body.period ? JSON.parse(req.body.period) : updatedRecord.period;
                updatedRecord.percentage = req.body.percentage || updatedRecord.percentage;

                await updatedRecord.save();
                let data = {
                    message: "Tax form edited successfully",
                    status: '200',
                    edited: updatedRecord
                };

                return res.status(200).send(data);
            } catch (err) {
                return res.status(400).send(err);
            }
        });
    } catch (err) {
        return res.status(400).send(err);
    }
};
