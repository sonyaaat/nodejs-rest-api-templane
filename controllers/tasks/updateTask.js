const Task=require("../../models/tasks")
const { Unauthorized } = require("http-errors");
const updateTask=async(req,res)=>{
  const user = req.user;
  if (!user) {
    throw new Unauthorized();
  }
  const { _id } = user;
    const taskId=req.params.taskId
    const data=req.body
  const result=await Task.findOneAndUpdate({_id:taskId,owner:_id},data,{new:true})
  if(!result)
    {
      res.status(404).json({message: `Contact with id ${taskId} not found`})
      return
    }
  res.status(200).json({ data: result });
}
module.exports=updateTask