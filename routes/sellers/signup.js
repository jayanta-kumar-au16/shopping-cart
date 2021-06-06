require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const seller = require("../../models/seller");
const Generate_token = require("../../functions/seller_token");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

router.use(express.static("public"));

router.get("/signup", (req, res) => {
  res.render("sign", { layout: "signup"});
});

router.post(
  "/signup",
  [
    check("firstname", "Invalid firstname").not().isEmpty(),
    check("lastname", "Invalid lastname").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password").isLength({
      min: 6,
    }),
    check("contact", "Invalid phone number").isMobilePhone(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array()
      res.render("sign", { layout: "signup" , alert});
    }
    const { firstname, lastname, email, password, contact } = req.body;
    try {
      let user = await seller.findOne({ email });
      if (user) {
        exist = { msg: "User already exists"}
        res.render("sign", { layout: "signup" , exist});
        return res.status(400)
      }
      const Seller = new seller({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        contactNumber: req.body.contact,
      });
      const salt = await bcrypt.genSalt(10);
      Seller.password = await bcrypt.hash(password, salt);
      await Seller.save();
      console.log(Seller);

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
  }
);

module.exports = router;
