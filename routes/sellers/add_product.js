const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const seller = require("../../models/seller");
const cloudinary = require("../../utils/cloudinary");
const Upload = require("../../utils/multer");
const addProduct = require("../../models/add_product");


router.get("/addproducts", (req, res) => {
  res.render("add_product", { layout: "Product" });
});

router.post("/addproducts", Upload.single("image"), async (req, res) => {
  console.log("seller id is", req.user);
  try {
    const { product, price, image, quantity, category, description } = req.body;
    const geturl = await cloudinary.uploader.upload(req.file.path);
    console.log("done");

    const add_product = new addProduct({
      productName: req.body.product,
      price: req.body.price,
      image: geturl.secure_url,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
      seller_id: req.user,
    });
    const saveproducts = await add_product.save();
    console.log(saveproducts);
    res.render("add_product", { layout: "Product" });
  } catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
});

module.exports = router;
