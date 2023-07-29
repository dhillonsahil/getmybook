const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email:{type:String , required:true},
    orderId : {type:String , required:true},
    paymentInfo : {type:String , default: ''},
    products:{type :Object , required:true},
    address:{
        type : String,
        required:true
    },
    amount:{
        type : Number,
        required:true
    },
    status :{
        type:String,
        default : 'Pending',
        required:true
    },
    delivery :{
        type:String,
        default : 'unshipped',
        required:true
    }
},{timestamps:true,strict:false})


// mongoose.models={}
// export default mongoose.model("Order",OrderSchema)
export default mongoose.models.Order || mongoose.model("Order",OrderSchema)