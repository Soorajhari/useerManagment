const express = require("express");
const router = express.Router();

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));
// router.use(nocache());

// console.log(sessionSecret);

const auth = require("../midddleware/auth");

// router.set("view engine", "ejs");
// router.set("views", "./views/user");

const userController = require("../controllers/userController.js");

router.get("/", userController.loadHome);

router.get("/login",  userController.login);
router.post("/login", userController.verifyUser);

router.get("/home", auth.isLogin, userController.loadHome);

router.get("/logout", auth.isLogin, userController.userLogout);

router.get("/register", auth.log, userController.register);

router.post("/register", userController.insertUser);

module.exports = router;
