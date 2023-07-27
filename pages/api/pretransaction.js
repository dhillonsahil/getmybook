
import Order from '@/models/Order'
import connectDb from "@/middleware/mongoose";

const handler = async(req,res) =>{
    if(req.method!="POST"){
        res.status(400).json({status : "Invalid Request"})
    }

    let order= new Order({
        email :req.body.email,
        orderId:req.body.oid,
        address:req.body.address,
        amount :req.body.subTotal,
    })

    await order.save()

    return res.status(200).json({success:true})
}

export default connectDb(handler)