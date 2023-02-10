const User=require("../../models/users")
const confirmedToken=async(req,res)=>{
const {confirmationToken}=req.params
const user=await User.findOne({confirmationToken})
if(!user){
    throw new Error("There isn`t such contact");
  }
  user.confirmed=true
  user.confirmationToken=null
  user.save()
  res.status(200).json({ message:"Success. You confirmed your account" });
}
module.exports=confirmedToken