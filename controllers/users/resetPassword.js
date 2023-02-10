const User = require("../../models/users");
const Joi = require("joi");
const sendGrid = require("../../helpers/sendGrid");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required("missing required field email"),
});
const resetPassword = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(404).json({ message: "missing required field email" });
  }
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("There isn`t such contact");
  }
  if (!user.confirmed) {
    throw new Error("Verify your email");
  }
  const newPassword=uuidv4()
  const mail={
    to:email,
    subject:"Email confirmation",
    html:`<p>Your new password is ${newPassword}</p>`
  }
  sendGrid(mail)
  const hashedPass= bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
  user.password=hashedPass
  user.confirmed=false
  user.save()
  res.status(200).json(newPassword)
};
module.exports = resetPassword;
