require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

module.exports = function authenticateToken(req, res, next) {
  try {
    let authToken = req.cookies["accessToken"];

    if (!authToken) {
      return res.json({ error: "token unavailable" });
    } else {
      const verified = jwt.verify(authToken, SECRET_KEY);
      console.log("Verified", verified);
      req.user = verified.user;
      req.authToken = authToken;
    }
    next();
  } catch (error) {
    // res.status(401).send("Token Invalid");
    res.redirect('/login&signup')
  }
};