const Customer = require('../models/custmoreDetailsSchema');

exports.customersListDetails = async(req,res)=> {
    try{
       let customerList= await Customer.find().sort({ createdAt: -1 });

       let data = {
        message: 'Successfully created',
        status: '200',
        data: customerList
    }
    return res.status(200).send({ data });
    }
    catch(err)
    {
        return res.status(400).send(err.message);
    }
}