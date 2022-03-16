const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("./../models/user");

const sendToken = (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    error: false,
    message: message,
    data: {
      token,
      user,
    },
  });
};

exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(newUser);
    sendToken(res, newUser, "Register success");
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        error: true,
        message: "Incorrect email or password",
      });
    }
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user || !(await user.correctPassword(req.body.password))) {
      return res.status(400).json({
        error: true,
        message: "Incorrect email or password",
      });
    }

    sendToken(res, user, "Login success");
  } catch (error) {
    res.status(200).json(error);
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];
  }

  if (!token) {
    return res.status(403).json({
      error: true,
      message: "Unauthenticated user fuck off :(",
    });
  }
  let user;
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
    user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User doesn't exists",
      });
    }
  } catch (error) {
    return res.status(200).json(error);
  }

  req.user = user;

  next();
};
