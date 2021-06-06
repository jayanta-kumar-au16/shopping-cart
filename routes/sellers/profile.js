const express = require("express");
const router = express.Router();
const seller = require("../../models/seller");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

router.get("/profile", async (req, res) => {
  try {
    const _id = req.user.id;
    const get_user = await seller.findOne({ _id }).lean();
    res.render("profile2", { layout: "profile", get_user });
  } catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
});

router.post("/profile/:id", async(req, res) => {
  try {
    const _id = { _id: req.params.id };
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(_id, req.body);
    await user.save();
    console.log(user);
    res.redirect('/seller/profile')
  } catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
});

module.exports = router;