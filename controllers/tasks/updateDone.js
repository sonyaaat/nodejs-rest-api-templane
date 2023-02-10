const Joi = require("joi");
const Task = require("../../models/tasks");
const { Unauthorized } = require("http-errors");
const doneSchema = Joi.object({
  done: Joi.boolean().required(),
});
const updateDone = async (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: "missing fields" });
  }
  const { error } = doneSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
  }
  const user = req.user;
  if (!user) {
    throw new Unauthorized();
  }
  const { _id } = user;
  const taskId = req.params.taskId;
  const { done } = req.body;
  const result = await Task.findOneAndUpdate({_id:taskId,owner:_id}, { done }, { new: true });
  if (!result) {
    res.status(404).json({ message: `Contact with id ${taskId} not found` });
  }
  res.status(200).json({ data: result });
};
module.exports = updateDone;
