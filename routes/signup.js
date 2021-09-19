require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Generate_token = require("../functions/user_token");
const { check, validationResult } = require("express-validator");


router.post(
  "/signup",
  [
    check("firstname", "Invalid firstname").not().isEmpty(),
    check("lastname", "Invalid lastname").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Invalid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array()
      return res.json(error.map(({msg})=> msg)).status(400)
     
    }
    const { firstname, lastname, email, password, } = req.body;
    try {
      let userdata = await User.findOne({ email });
      if (userdata) {
        res.json({ msg: "User already exists"}).status(403);
      }else{
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
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
        res.json({"token": access_token , "user": user});
      }
     
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in saving");
    }
  }
);

module.exports = router;
