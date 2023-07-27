// import Product from "@/models/Product"
// import connectDb from "@/middleware/mongoose"
// const handler = async (req, res) =>{
//     let products=await Product.find()
//     res.status(200).json({ products })

// }

// export default connectDb(handler)
import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
    let products = await Product.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
    res.status(200).json({ products })
}

export default connectDb(handler)


