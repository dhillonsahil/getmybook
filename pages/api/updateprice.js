import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler= async (req, res) =>{
    
   try {
    let update =await Product.findOneAndUpdate({slug:req.body.slug},{price:req.body.price})
        await update.save()

    res.status(200).json({success:true })
} catch (error) {
       res.status(200).json({success:false })
    
   }
}
  
export default connectDb(handler)