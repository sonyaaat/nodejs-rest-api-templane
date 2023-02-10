const Joi = require("joi");
const User = require("../../models/users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(5).max(50).required(),
});
const login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
    return;
  }
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email or password is incorrect");
  }
  if (!user.verify) {
    throw new Unauthorized(`Your account is not athorized`);
  }
  const { password: userPassword, subscription: userSubscription } = user;
  const passCompare = bcrypt.compareSync(password, userPassword);
  if (!passCompare) {
    throw new Unauthorized("Email or password is incorrect");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res
    .status(201)
    .json({ token, user: { email, subscription: userSubscription } });
};
module.exports = login;
