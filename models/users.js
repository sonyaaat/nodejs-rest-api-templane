const {Schema,model}=require("mongoose")
 const userSchema=Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: String,
        avatarURL: String,
        verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
          required: [true, 'Verify token is required'],
        },
        confirmed:{
          type: Boolean,
          default: false,
        },
        confirmationToken:{
          type: String,
        }
      }
 )

 const User=model("user",userSchema)
 module.exports=User