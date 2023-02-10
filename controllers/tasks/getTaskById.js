const Task=require("../../models/tasks")
const { Unauthorized } = require("http-errors");
const getTaskById=async(req,res)=>{
  const user=req.user
    if(!user)
    {
        throw new Unauthorized()
    }
    const{_id}=user
    const taskId=req.params.taskId
    const result=await Task.findOne({_id:taskId,owner:_id})
    console.log("res",res)
    if(!result)
    {
      res.status(404).json({message: `Contact with id ${taskId} not found`})
      return
    }
    res.status(200).json({ data: result });
}

module.exports=getTaskById