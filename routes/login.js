const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Generate_token = require("../functions/user_token");
const { check, validationResult } = require("express-validator");




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
    return res.json(error.map(({msg})=> msg)).status(400)
  } 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(403).json({msg:"user not exists"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(409).json({msg:"Incorrect password !"})
    }
    // create token
    const payload = {
      user: {
        id: user.id,
      },
    };
    const access_token = Generate_token(payload);
    res.json({"token": access_token , "user": user});;
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in saving");
  }
});

module.exports = router;

