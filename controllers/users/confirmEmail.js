const Joi = require("joi");
const User = require("../../models/users");
const sendGrid = require("../../helpers/sendGrid");
const { v4: uuidv4 } = require("uuid");

const confirmationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required("missing required field email"),
});

const confirmEmail = async (req, res) => {
  const { error } = confirmationSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: "missing required field email" });
  }
  const { email } = req.body;
  const confirmationToken = uuidv4();
  const user=await User.findOne({email})
  if(!user){
    throw new Error("There isn`t such contact");
  }
  user.confirmed=true
  user.confirmationToken=confirmationToken
  user.save()
  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/confirmEmail/${confirmationToken}">Click to confirm your email</a>`,
  };
  sendGrid(mail)
  res.status(200).json({ confirmationToken });
};
module.exports = confirmEmail;
