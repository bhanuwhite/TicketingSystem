const Invoice = require('../models/invoiceSchema');

let count=1;
exports.detailsOfInvoice = async(req,res)=> {
 try{
   let c = await Invoice.find();
   if(c.length==0)
   {
    
   }
  let invoice = new Invoice({
     invoiceId: id,
     totalPrice: price,
     totalAmount: amount,
     totalTax: tax,
     counter: count
   })
 }
 catch(err)
 {
    return res.status(400).send(err);
 }
}