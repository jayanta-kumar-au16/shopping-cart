const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("AccessToken");
    console.log("logout successfully");
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
