
const { Unauthorized } = require("http-errors");
const getCurrent=async(req,res,next)=>{
    const user=req.user
if(!user)
{
throw new Unauthorized()
}
const{email,subscription}=user
res.status(200).json({data:email,subscription})
}
module.exports=getCurrent