import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler= async (req, res) =>{
    
    let update =await Product.findOne({slug:req.body.slug},{availableQty:req.body.qty})
    await update.save()

    res.status(200).json({success:true })
}
  
export default connectDb(handler)