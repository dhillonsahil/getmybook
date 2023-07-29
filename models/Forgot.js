const mongoose = require('mongoose');
const { Schema } = mongoose;

const ForgotSchema = new Schema({
    email:{type:String , required:true},
    token : {type:String , required:true},
    expirationTime:{},
    resetTokenExpiration: {
        type: Date,
        default: null
      },
})


// mongoose.models={}
// export default mongoose.model("Order",OrderSchema)
export default mongoose.models.Order || mongoose.model("Forgot",ForgotSchema)