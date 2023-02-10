const { Unauthorized } = require("http-errors");
const User = require("../../models/users");
const logout=async(req,res,next)=>{
const user=req.user
if(!user)
{
throw new Unauthorized()
}
const {_id}=user
await User.findByIdAndUpdate(_id,{token:null})
res.status(204).json("Logged out")
}
module.exports =logout