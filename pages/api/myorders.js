import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";


const handler = async (req,res) =>{
    if(req.method!="POST"){
        res.status(400).json('should be a POST request')
        return;
    }
    const jwt = require('jsonwebtoken')
    const token = req.body.token 
    const data =jwt.verify(token,process.env.JWT_SECRET)
    let orders = await Order.find({email:data.email }, { createdAt: 0, updatedAt: 0, __v: 0 })
    
    res.status(200).json({orders:orders})
}


export default connectDb(handler)