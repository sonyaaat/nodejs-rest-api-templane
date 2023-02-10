const sgMail = require('@sendgrid/mail')
require("dotenv").config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendMain=(data)=>{
    const msg = {
       ...data,
       from:"sofiatkach2004@gmail.com"
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}
module.exports=sendMain