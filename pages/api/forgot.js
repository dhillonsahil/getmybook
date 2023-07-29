import Forgot from "@/models/Forgot";
import connectDb from "@/middleware/mongoose"
const forgot = async (req, res) => {

  // create tokenId

  const crypto = require('crypto')
  // Generate a buffer with random bytes
  const buffer = crypto.randomBytes(32);
  const resetToken = buffer.toString('hex');
  const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds


  console.log("Step 1 : ******************************************")
  let forgot = Forgot({
    token: resetToken,
    resetTokenExpiration: expirationTime,
    email: req.body.email
  })


  await forgot.save()
  console.log("Step 2 : ******************************************")

  await mail(req.body.email)

  res.status(200).json({success:true})

}


const mail = async (email,token) => {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'sahil2002427@gmail.com',
      pass:'bgkjgwxltvmmncco'
    }
  })


  const option = {
    from :'sahil2002427@gmail.com',
    to:email,
    subject :'Reset Password - Get My Book',
    text:`To Reset Your Password Click on the Link https://localhost:3000/forgot?id=${token}`
  }


  transporter.sendMail(option,function(error,info){
    if(error){
      console.log("error" , error)
      
    }else{
      console.log('mail sent',info)
    }
  })
}
export default connectDb(forgot)