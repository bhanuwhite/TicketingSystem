const Invoice = require('../models/invoiceSchema');

let count = 1, price = 0, tax = 0, amount = 0;
exports.detailsOfInvoice = async (req, res) => {
  try {
    let result = await Invoice.find();
    if (result.length == 0) {
      count = 1;
    }
    else {
      let updateCount = result[result.length - 1].counter;
      count = updateCount + 1;
    }
    let currentDate = new Date();

    let day = String(currentDate.getDate()).padStart(2, '0');
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let year = String(currentDate.getFullYear());
    let invoiceId = `${year}${month}${day}-${String(count).padStart(4, '0')}`;
    let date = `${year}-${month}-${day}`;
    let due_month = String(Number(month) + 1);
    let due_date = `${year}-${due_month}-${day}`;

    for (let i = 0; i < req.body.items.length; i++) {
      price = price + req.body.items[i].price;
      amount = amount + req.body.items[i].amount;
      tax = tax + req.body.items[i].tax
    }

    let invoice = new Invoice({
      invoiceId: invoiceId,
      totalPrice: price,
      totalAmount: amount,
      totalTax: tax,
      counter: count,
      invoice_date: date,
      due_date: due_date,
      custName: req.body.name,
      mobile_no: req.body.mobile_no,
      status: req.body.status,
      items: req.body.items
    })
    await invoice.save();
    let data = {
      message: 'Invoice created successfully ',
      status: '201',
      data: invoice

    }
    return res.status(201).send({ data });
  }
  catch (err) {
    return res.status(400).send(err);
  }
}