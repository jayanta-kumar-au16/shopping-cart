const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../models/user");
const Generate_token = require("../../functions/user_token");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");



router.post("/login",  [
  check("email", "Invalid email").isEmail(),
  check("password", "Invalid password").isLength({
    min: 6
  })
],
async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array()
    res.render("login", { layout: "main" , error})
  } 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const exist = {msg:"user not exists"};
      res.render("login", { layout: "main" , exist})
      return res.status(400)
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const errorpass = {msg:"Incorrect password !"};
      res.render("login", { layout: "main" , errorpass})
      return res.status(400)
    }
    // create token
    const payload = {
      user: {
        id: user.id,
      },
    };
    const access_token = Generate_token(payload);
    res.cookie("accessToken", access_token);
    res.redirect("/user/home");
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Error in saving");
  }
});

module.exports = router;