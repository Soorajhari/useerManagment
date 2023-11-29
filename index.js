const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/mydb")
  .then(console.log("connected to mongodb"))
  .catch((error) => {
    console.log("failed connect in mongodb", error);
  });

const express = require("express");
const crypto = require("crypto");
const session = require("express-session");
// const nocache = require("nocache");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});
// app.use(nocache());

const sessionSecret = crypto.randomBytes(16).toString("hex");
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.set("views", "./views");

//for user routes
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

// for admin routes
const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

// app.get("/register", (req, res) => {
//   res.render("registeration");
// });

app.listen(3000, () => {
  console.log("server is runing");
});
