const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const seller = require("../../models/seller");
const Generate_token = require("../../functions/seller_token");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


router.post("/login",  [
  check("email", "Invalid email").isEmail(),
  check("password", "Invalid password").isLength({
    min: 6
  })
],
async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array()
    res.render("login", { layout: "main" , alert})
  }
  try {
    const { email, password } = req.body;
    const Seller = await seller.findOne({ email });
    if (!Seller) {
      const Exist= {msg:"Seller not exists"};
      res.render("login", { layout: "main" , Exist})
      return res.status(400)
    }
    const isMatch = await bcrypt.compare(password, Seller.password);
    if (!isMatch) {
      const passerror = {msg:"Incorrect password !"};
      res.render("login", { layout: "main" , passerror})
      return res.status(400)
    }
    // create token
    const payload = {
      seller: {
        id: Seller.id,
      },
    };
    const access_token = Generate_token(payload);
    res.cookie("AccessToken", access_token);
    res.redirect("/seller/home");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in saving");
  }
});

module.exports = router;