const Product = require('../models/productSchema');
const upload = require('../middlewares/upload');

exports.editProducts = async (req, res) => {
  try {
    let _id = req.params._id;
    let body = {};

    // Parse the form data and files using multer middleware
    upload.array('image', 10)(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err);
      }

      // Iterate over the keys of req.body and add them to the body object
      for (let i in req.body) {
        body[i] = req.body[i];
      }

      if (req.files && req.files.length > 0) {
        const url = 'http://192.168.0.237:3000/';
        const imageUrls = req.files.map((file) => url + file.path);
        body.image = imageUrls.join(',');
      }

      try {
        const updatedRecord = await Product.findByIdAndUpdate({ _id: _id }, { new: true });

        updatedRecord.productName = req.body.productName || updatedRecord.productName;
        updatedRecord.productDescription = req.body.productDescription || updatedRecord.productDescription;
        updatedRecord.productCode = req.body.productCode || updatedRecord.productCode;
        updatedRecord.price = req.body.price || updatedRecord.price;
        updatedRecord.category = req.body.category || updatedRecord.category;
        updatedRecord.inventoryStatus = req.body.inventoryStatus || updatedRecord.inventoryStatus;
        updatedRecord.images = body.image || updatedRecord.images;

        await updatedRecord.save();
        let data = {
          message: "Product edited successfully",
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
