const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const signup = require("./routes/signup");
const login = require("./routes/login");
const imageUpload = require("./routes/userData");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  'allowedHeaders':['content-Type'],
  'origin': '*',
  'preflightContinue': true,
  'methods':"GET , POST , DELETE"
}))

const { DB_USER } = process.env;
const {DB_PASS} = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.17gaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` ,
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

app.use("/user", signup);
app.use("/user", login);
app.use("/user", imageUpload);

app.listen(process.env.PORT || 8000, () => {
  console.log("server started");
});
