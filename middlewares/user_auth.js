require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

module.exports = function authenticateToken(req, res, next) {
  try {
    let authToken = req.cookies["accessToken"];

    if (!authToken) {
      res.redirect('/');
      return res.status(503);
    } else {
      const verified = jwt.verify(authToken, SECRET_KEY);
      console.log("Verified", verified);
      req.user = verified.user;
      req.authToken = authToken;
    }
    next();
  } catch (error) {
    res.redirect('/');
    res.status(401);
  }
};