// import Forgot from "@/models/Forgot";
// import connectDb from "@/middleware/mongoose";
// import User from "@/models/User";


// const handler = async (req, res) => {

//     let password = await Forgot.findOne({ token: req.body.token })
//     if (password.resetTokenExpiration > req.body.resetTokenExpiration) {
//         var CryptoJS = require("crypto-js");
//         let user = await User.findOneAndUpdate({ email: password.email }, { password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString() })
//         await user.save()
//         res.status(200).json({ success: true })
//     }

// }
// export default connectDb(handler)
import Forgot from "@/models/Forgot";
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  try {
    const token = req.body.token;
    const tokenRecord = await Forgot.findOne({ token });

    if (!tokenRecord) {
      // If no token record is found, the provided token is invalid or expired.
      return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }

    const currentTime = Date.now();
    if (tokenRecord.resetTokenExpiration < currentTime) {
      // If the reset token has already expired, return an error.
      return res.status(400).json({ success: false, message: "Token has already expired." });
    }

    // If the reset token is valid and not expired, proceed to update the user's password.
    const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    const user = await User.findOneAndUpdate({ email: tokenRecord.email }, { password: encryptedPassword });
    await user.save();

    return res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export default connectDb(handler);
