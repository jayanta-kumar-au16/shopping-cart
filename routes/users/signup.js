require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Generate_token = require("../../functions/user_token");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.use(express.static("public"));

router.get("/signup", (req, res) => {
  res.render("signup", { layout: "sign" });
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
      res.render("signup", { layout: "sign" , alert});
     
    }
    const { firstname, lastname, email, password, contact } = req.body;
    try {
      let userdata = await User.findOne({ email });
      if (userdata) {
        exist = { msg: "User already exists"}
        res.render("signup", { layout: "sign" , exist});
        return res.status(400)
      }
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        contactNumber: req.body.contact,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      console.log(user);

      // create token
      const payload = {
        user: {
          id: user.id,
        },
      };
      const access_token = Generate_token(payload);
      res.cookie("accessToken", access_token);
      res.redirect("/user/home");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in saving");
    }
  }
);

module.exports = router;
