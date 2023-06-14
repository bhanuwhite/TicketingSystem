const Tax = require('../models/taxSchema');
const TaxList = require('../models/taxListSchema')
exports.getTaxList = async (req, res) => {
    try {

        let k = 1;
        let taxList = [];
        const distinctTax = await Tax.distinct('name');
        await TaxList.deleteMany();
        for (let i = 0; i < distinctTax.length; i++) {
            let taxName = new TaxList({
                name: distinctTax[i],
                id: k
            })
            taxList.push(taxName);
            k++;
            await taxName.save();
        }
        return res.status(200).json({ taxList });
    }
    catch (err) {
        return res.status(400).send({ err });
    }
}