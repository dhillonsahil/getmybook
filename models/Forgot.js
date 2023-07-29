const mongoose = require('mongoose');
const { Schema } = mongoose;

const ForgotSchema = new Schema({
    email:{type:String , required:true},
    token : {type:String , required:true},
    resetTokenExpiration: {
        type: Date,
        default: null
      },
})


// mongoose.models={}
// export default mongoose.model("Order",OrderSchema)
export default mongoose.models.Forgot || mongoose.model("Forgot",ForgotSchema)