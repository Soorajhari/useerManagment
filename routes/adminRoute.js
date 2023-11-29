const express = require("express");
const router = express.Router();

const auth = require("../midddleware/adminAuth");

const {
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
} =  require("../controllers/adminController");


router.get('/', auth.isLogout, loadLogin);

router.post('/', verifyLogin);

router.get('/home', auth.isLogin, dashboard);

router.get('/logout', auth.isLogin, logout);



router.get('/dashboard', auth.isLogin, adminDashboard);

router.get('/new-user', auth.isLogin, newUserLoad);
router.post('/new-user', addUser);

router.get('/edit-user', auth.isLogin, editUserLoad);

router.post('/edit-user', updateUser)
router.get('/delete-user', deleteUser);

router.get('*', function (req, res) {
    res.redirect('/admin');
})


module.exports = router;