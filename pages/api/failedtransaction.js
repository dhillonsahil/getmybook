import Order from "@/models/Order"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
  let order = await Order.findOneAndUpdate({ orderId: req.body.razorpay_order_id }, { status: "Failed" })
  await order.save()
  res.status(200).json({ success:true})
}

export default connectDb(handler)
