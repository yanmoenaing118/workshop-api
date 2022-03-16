const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Admin",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email is invalid!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: 4,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (userPassword) {
  return await bcryptjs.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
