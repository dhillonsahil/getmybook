import Forgot from "@/models/Forgot";
import User from "@/models/User";

import connectDb from "@/middleware/mongoose"
const forgot = async (req, res) => {
  // check if user exists
  let customerMail= req.body
  let user =await User.findOne({email:customerMail})
  if(!user){
    res.status(200).json({success:false, error:"User not exists"})
  }
  // create tokenId

  const crypto = require('crypto')
  const buffer = crypto.randomBytes(32);
  const resetToken = buffer.toString('hex');
  const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds


  let forgot = Forgot({
    token: resetToken,
    resetTokenExpiration: expirationTime,
    email: customerMail
  })


  await forgot.save()

  // await mail(req.body.email)

  // send mail
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'sahil2002427@gmail.com',
      pass:process.env.EMAIL_PASSWORD
    }
  })

  const option = {
    from :'sahil2002427@gmail.com',
    to:customerMail,
    subject :'Reset Password - Get My Book',
    text:`To Reset Your Password Click on the Link https://localhost:3000/forgot?id=${resetToken}`
  }

  transporter.sendMail(option,async function(error,info){
    if(error){
      res.status(200).json({success:false , error:"An error occurred"})
    }else{
      res.status(200).json({success:true})
    }
  })

  // res.status(200).json({success:true})
}

export default connectDb(forgot)