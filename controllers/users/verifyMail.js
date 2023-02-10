const User=require("../../models/users")
const verifyMail= async(req,res)=>{
const {verificationToken}=req.params
const user=await User.findOneAndUpdate({verificationToken},{verificationToken:" ",verify:true})
if(!user){
    return res.status(404).json({ message: "Your verify token is incorrect" });
}
res.status(200).json({ message: 'Verification successful',});
}
module.exports=verifyMail