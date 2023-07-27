
import Order from '@/models/Order'
import connectDb from "@/middleware/mongoose";

const handler = async(req,res) =>{
    if(req.method!="POST"){
        res.status(400).json({status : "Invalid Request"})
    }

    
    // Check if the cart is tempered


    //check if the cart items are out of stock
    
    // check if the details are valid

    //  then initiate the order

    let order= new Order({
        email :req.body.email,
        orderId:req.body.order_id,
        address:req.body.address,
        amount :req.body.subTotal,
        products:req.body.cart
    })

    await order.save()

    return res.status(200).json({success:true})
}

export default connectDb(handler)