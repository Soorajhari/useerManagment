const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },

  password: {
    type: String,
  },
  is_admin: {

    type: Number,
    default:0
  },
});

module.exports = mongoose.model("user", userSchema);
// Using bcrypt to hash user password before saving to the database
// userSchema.pre("save", async function (next) {
//   //   const user = this;
//   //   if (!user.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(user.password, salt);
//   next();
// });
