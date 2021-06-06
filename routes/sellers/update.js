const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const all_products = require("../../models/add_product")

router.get("/update", async (req, res) => {
  try {
    const seller_id = req.user;
    console.log(seller_id);
    const getproducts = await all_products.find({ seller_id}).lean();
    console.log(getproducts);
    res.render("seller_productUpdate", { layout: "update", getproducts });
  } catch (error) {
    res.send(`Internal Error Occurred: ${error._message}`);
  }
});

router.get("/electronics_update", async (req, res) => {
  try {
    const seller_id = req.user;
    console.log(seller_id);
    const getproducts = await all_products.find({ seller_id,category:"Electronics" }).lean();
    console.log(getproducts);
    res.render("seller_productUpdate", { layout: "update", getproducts });
  } catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
});

router.get("/grocery_update", async (req, res) => {
  try {
    const seller_id = req.user;
    console.log(seller_id);
    const getproducts = await all_products.find({ seller_id,category:"Grocery" }).lean();
    console.log(getproducts);
    res.render("seller_productUpdate", { layout: "update", getproducts });
  } catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
});

router.get("/homeEssentials_update", async (req, res) => {
 try {
  const seller_id = req.user;
  console.log(seller_id);
  const getproducts = await all_products.find({ seller_id ,category:"Home_Essentials"}).lean();
  console.log(getproducts);
  res.render("seller_productUpdate", { layout: "update", getproducts });
 } catch (error) {
  res.status(500).send(`Internal Error Occurred: ${error._message}`);
 }
});




module.exports = router;
