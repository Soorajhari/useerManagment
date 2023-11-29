const User = require("../models/user");
const bcrypt = require("bcrypt");

const loadLogin = (req, res) => {
  try {
    res.render("admin/login.ejs");
  } catch (error) {
    console.log(error.message);
  }
};

// const backtologin = (req, res) => {
//   try {
//     res.redirect("user/login");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email, is_admin: 1 });
    console.log(userData);

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        req.session.admin_id = userData._id;

        res.redirect("/admin/home");
      } else {
        res.render("admin/login.ejs", {
          message: "email and password is incorrect",
        });
      }
    } else {
      res.render("admin/login.ejs", {
        message: "email and password is incorrect",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const dashboard = async (req, res) => {
  try {
    const userData = await User.findById({ _id: req.session.admin_id });
    res.render("admin/home.ejs", { admin: userData });
  } catch (error) {
    console.log(error.message);
  }
};
const logout = async (req, res) => {
  try {
    req.session.admin_id = null;
    res.redirect("/admin");
  } catch (error) {
    console.log(error.message);
  }
};

const adminDashboard = async (req, res) => {
  try {
    var search = "";
    if (req.query.search) {
      // console.log("re"+req.query);
      search = req.query.search;
      // console.log("search:"+search);
    }
    const userData = await User.find({
      is_admin: 0,
      $or: [
        { name: { $regex: ".*" + search + ".*" } },
        { email: { $regex: ".*" + search + ".*" } },
        { mobile: { $regex: ".*" + search + ".*" } },
      ],
    });
    res.render("admin/dashboard.ejs", { users: userData });
  } catch (error) {
    console.log(error.message);
  }
};

const newUserLoad = async (req, res) => {
  try {
    res.render("admin/newuser.ejs");
  } catch (error) {
    console.log(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    // const password = randomstring.generate(8);
    const password = req.body.pass;
    const spassword = await securePassword(password);

    const user = new User({
      name: name,
      email: email,
      mobile: mobile,
      password: spassword,
      is_admin: 0,
    });

    const userData = await user.save();
    if (userData) {
      res.redirect("/admin/dashboard");
    } else {
      res.render("admin/newuser.ejs", { message: "Something Wrong" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const editUserLoad = async (req, res) => {
  try {
    const id = req.query.id;
    const userData = await User.findById({ _id: id });
    if (userData) {
      res.render("admin/edit.ejs", { user: userData });
    } else {
      res.redirect("/admin/dashboard");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
        },
      }
    );
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;
    await User.deleteOne({ _id: id });
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  loadLogin,
  verifyLogin,
  dashboard,
  logout,
  adminDashboard,
  newUserLoad,
  addUser,
  editUserLoad,
  updateUser,
  deleteUser,
  // backtologin,
};
