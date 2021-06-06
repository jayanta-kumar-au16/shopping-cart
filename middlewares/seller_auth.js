require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SELLER_KEY } = process.env;

module.exports = function authenticateToken(req, res, next) {
  try {
    let authToken = req.cookies["AccessToken"];

    if (!authToken) {
      return res.json({ error: "token unavailable" });
    }
    const verified = jwt.verify(authToken, SELLER_KEY);
    console.log("Verified", verified);
    req.user = verified.seller;
    req.authToken = authToken;
    next();
  } catch (error) {
    // res.status(401).send("Token Invalid");
    res.redirect('/login&signup')
  }
};
