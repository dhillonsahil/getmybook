import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler= async (req, res) =>{
    
    let update =await Product.findOne({slug:req.body.slug},{price:req.body.price})
    await update.save()

    res.status(200).json({success:true })
}
  
export default connectDb(handler)