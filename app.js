const path = require('path');
require("dotenv").config({path: path.resolve(__dirname, './.env')});
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");


const signup = require("./routes/users/signup");
const login = require("./routes/users/login");
const logout = require("./routes/users/logout");
const home = require("./routes/users/home");
const profile = require("./routes/users/profile");
const cart = require('./routes/users/cart');
const address = require('./routes/users/address');
const checkout= require('./routes/users/checkout');

const Signup = require("./routes/sellers/signup");
const Login = require("./routes/sellers/login");
const Logout = require("./routes/sellers/logout");
const Home = require("./routes/sellers/home");
const Profile = require("./routes/sellers/profile");

const Sellerauth = require("./middlewares/seller_auth");
const Userauth = require("./middlewares/user_auth");

const update = require("./routes/sellers/update");
const add_products = require("./routes/sellers/add_product");
const product_update = require('./routes/sellers/product_update');
const product_delete = require('./routes/sellers/product_delete');
const products = require('./routes/users/products')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.engine("hbs", exphbs({ extname: "hbs" }));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname , '/public/')));
const { DATABASE_URL } = process.env;
mongoose.connect(
  DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  async (err) => {
    if (err) throw err;

    console.log("Connected");
  }
);

app.get("/", (req, res) => {
  res.render("login", { layout: "main" });
});
app.use("/user", signup);
app.use("/user", login);
app.use("/user", Userauth, home);
app.use("/user", Userauth, profile);
app.use("/user", Userauth, logout);
app.use('/user',Userauth,products);
app.use('/user',Userauth,cart);
app.use('/user',Userauth,address);
app.use('/user',Userauth,checkout);

app.use("/seller", Signup);
app.use("/seller", Login);
app.use("/seller", Sellerauth, Home);
app.use("/seller", Sellerauth, Profile);
app.use("/seller", Sellerauth, Logout);
app.use("/seller", Sellerauth, add_products);
app.use("/seller", Sellerauth, update);
app.use("/seller",Sellerauth, product_update);
app.use("/seller",Sellerauth, product_delete);

app.listen(process.env.PORT || 8000, () => {
  console.log("server started");
});
