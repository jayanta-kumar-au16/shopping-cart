require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

module.exports = function generateJwt(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "5hr" });
};
