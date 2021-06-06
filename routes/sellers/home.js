const express = require("express");
const router = express.Router();
const seller = require("../../models/seller");
const mongoose = require("mongoose");

router.get("/home", async (req, res) => {
  try {
    console.log(req.user);
    const _id = req.user.id;
    const get_user = await seller.findOne({ _id }).lean();
    console.log(get_user);
    res.render("seller_home", { layout: "seller_home", get_user });
  } catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
});

module.exports = router;
