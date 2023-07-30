import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const {name,normalEm}=req.body
      const existingUser = await User.findOne({ email: req.body.normalEm });

      if (existingUser) {
        // User with the given email already exists
        return res.status(200).json({ success: "Account Already Exist" });
      }

      const newUser = new User({name,email:normalEm,password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()});
      await newUser.save();
      return res.status(200).json({ success: true });
    } catch (error) {
      // Handle any errors that might occur during the database operation
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    return res.status(400).json({ success: false, error: "Bad request" });
  }
};

export default connectDb(handler);
