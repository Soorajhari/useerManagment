const isLogin = (req, res, next) => {
  try {
    if (req.session.user1) {
      // res.redirect("/login")
      next();
    } else {
      res.redirect("/login");
    }
    
  } catch (error) {
    console.log(error.message);
  }
};

const log =  (req, res, next) => {
  try {
    if(req.session.user_id){
        res.redirect('/login')
    }else{
      next()
    }
  } catch (error) {
    console.log(error);
  }
};

const isLogout = (req, res, next) => {
  try {
    if (req.session.user1) {
      res.redirect("/home");
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  isLogin,
  isLogout,
  log
};
