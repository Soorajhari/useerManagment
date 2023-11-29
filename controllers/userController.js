const User = require("../models/user");
const bcrypt = require("bcrypt");


const register = (req, res) => {
  try {
    res.render("user/registeration.ejs");
  } catch (err) {
    console.log("error.message");
  }
};

const securepassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.log("error.message");
  }
};

const insertUser = async (req, res) => {
  try {
    const secpassword = await securepassword(req.body.password);
    console.log(secpassword)
    // console.log(req.body);
    const user = new User({
      name: req.body.namesu,
      email: req.body.emailsu,
      mobile: req.body.number,
      password: secpassword,
      is_admin: 0,
    });
    console.log(req.body.namesu)
    const userData = await user.save();
    if (userData) {
      res.render("user/registeration.ejs", {
        message: "your registeration successful",
      });
    } else {
      res.render("user/registeration.ejs", {
        message: "your registeration unsuccessful",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const login = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("user/login.ejs");
  }
};

const verifyUser = async (req, res) => {
  try {
    const email = req.body.email;
    console.log("1")
    const password = req.body.password;
    console.log(password)
    console.log("2")

    const userData = await User.findOne({ email: email, is_admin: 0 });
    // console.log("user:" + userData);
    console.log("3")

    if (!userData) {
      return res.render("user/login.ejs", {
        message: "invalid user or password",
      });
    }
    console.log("4")
    const passwordMatch = await bcrypt.compare(password, userData.password);
    console.log("5")
    if (!passwordMatch) {
      return res.render("user/login.ejs", {
        message: "Invalid username or password",
      });
    }

    if (passwordMatch) {
      req.session.user_id = userData._id;
      req.session.user=userData.name;
       req.session.user1 = true
      
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    if (req.session.user_id) {
      res.render("user/home.ejs", { user: req.session.user_id });
    } else {
      res.redirect("/login");
    }

  
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error destroying session");
    } else {
      res.clearCookie("connect.sid");
      res.redirect("/login");
    }
  });
};

module.exports = {
  register,
  insertUser,
  loadHome,
  verifyUser,
  login,
  userLogout,
};
