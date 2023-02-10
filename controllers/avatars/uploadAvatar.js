const path = require("path");
const User = require("../../models/users");
const uploadAvatar = async (req, res, next) => {
  const { _id } = req.user._id;
  const { originalname } = req.file;
  const avatarURL = path.join("public", "avatars", originalname);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL }).status(200);
};
module.exports = uploadAvatar;
