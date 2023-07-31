import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"
const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            for(let i=0;i<req.body.length;i++){
                let p = new Product({
                    title : req.body[i].title,
                    slug  : req.body[i].slug,
                    description  : req.body[i].description,
                    img  : req.body[i].img,
                    category  : req.body[i].category,
                    price  : Number.parseInt(req.body[i].price),
                    availableQty : Number.parseInt(req.body[i].availableQty),
                })
                await p.save()
            }
            res.status(200).json({ success: true })
        } catch (error) {
            res.status(200).json({ success: false })
            
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" })
    }

}

export default connectDb(handler)
