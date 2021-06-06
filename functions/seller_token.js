require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SELLER_KEY } = process.env;

module.exports = function generateJwt(payload) {
  return jwt.sign(payload, SELLER_KEY, { expiresIn: "1hr" });
};
