const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const mongoose = require("mongoose");

router.get("/home", async (req, res) => {
  try {
    const _id = req.user.id;
    console.log(_id);
    const get_user = await User.findOne({ _id }).lean();
    console.log(get_user);
    res.render("Home", { layout: "home", get_user });
  } catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
});

module.exports = router;
