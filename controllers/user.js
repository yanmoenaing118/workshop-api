const User = require("./../models/user");

exports.updateMe = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    error: false,
    message: "User profile updated",
    data: {
      user,
    },
  });
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    error: false,
    data: {
      user,
    },
  });
};
