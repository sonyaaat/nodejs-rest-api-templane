const { Conflict } = require("http-errors");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const User = require("../../models/users");
const { v4: uuidv4 } = require('uuid');
const sendGrid=require("../../helpers/sendGrid")

const usersSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(5).max(20).required(),
  subscription: Joi.string(),
  avatar: Joi.string(),
});

const register = async (req, res, next) => {
  const { error } = usersSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
    return;
  }
  const { password, email, subscription } = req.body;
  const user = await User.find({ email });
  if (!user) {
    throw new Conflict(`User with email ${email}  already exists`);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken=uuidv4();
  const mail={
    to:email,
    subject:"Email confirmation",
    html:`<a target="_blanc" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify</a>`
  }
  sendGrid(mail)
  
  await User.create({ subscription, email, password: hashPassword, avatarURL,verificationToken });
  if (!subscription) {
    res.status(201).json({ user: email, subscription: "starter" });
    return;
  }
  res.status(201).json({ user: email, subscription });
};
module.exports = register;
