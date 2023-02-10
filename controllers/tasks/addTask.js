const Joi = require("joi");
const User = require("../../models/users");
const Task = require("../../models/tasks");
const { Unauthorized } = require("http-errors");
const tasksSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  text: Joi.string().min(5).max(500).required(),
  done: Joi.boolean(),
});
const addTask = async (req, res) => {
  const { error } = tasksSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
    return;
  }
  const user = req.user;
  if (!user) {
    throw new Unauthorized();
  }
  const { _id } = user;
  const findedUser=await User.findOne({title:req.body.title,owner:_id})
  if(findedUser)
  {
    res.status(404).json({ message: `Task with title ${req.body.title} already exists` });
    return
  }
  const data = req.body;
  const result = await Task.create({ ...data, owner: _id });
  res.status(200).json({ data: result });
};
module.exports = addTask;
