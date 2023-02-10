const Task=require("../../models/tasks")
const { Unauthorized } = require("http-errors");

const listTasks=async(req,res)=>{
    let filter
    const{limit=10,page=1,done=false}=req.query
    const skip=(page-1)*limit
    const user=req.user
    if(!user)
    {
        throw new Unauthorized()
    }
    const{_id}=user
    if(done)
    {
        filter={ owner:_id,done}
    }
    else{
        filter={ owner:_id}
    }
    
    const result=await Task.find(filter,"",{skip,limit:Number(limit)});
    const countQuery = await Task.where(filter).countDocuments();
    console.log(result)
    res.status(200).json({ data: result, count:countQuery});
}
module.exports=listTasks