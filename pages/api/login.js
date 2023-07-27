import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt= require('jsonwebtoken')

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        // User Don't Exist exists
        return res.status(200).json({ success: "Check Your Credentials" });
      } else {
        
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.email == user.email && req.body.password == decryptedData) {
          var token = jwt.sign({email:user.email,name:user.name},process.env.JWT_SECRET,{
            expiresIn:"2d"
          })
          return res.status(200).json({ success:true,token });
        } else {
          return res.status(200).json({ success: "Check Your Credentials" });
        }
      }
    } catch (error) {
      // Handle any errors that might occur during the database operation
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    return res.status(400).json({ success: false, error: "Bad request" });
  }
};

export default connectDb(handler);


