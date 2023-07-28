import Order from "@/models/Order"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
  const { paymentInfo} = req.body;
  console.log(req.body.paymentInfo , " order id :- ",paymentInfo.razorpay_order_id)
  // update  into orders table after checking update status
  // let order= await Order.findOneAndUpdate{{orderId:req.body.razorpay_order_id}}
  let order = await Order.findOneAndUpdate({ orderId: paymentInfo.razorpay_order_id }, { status: "PAID", paymentInfo: req.body.razorpay_payment_id })
  await order.save()
  // initiate shipping
  // reditect to order confirmation page
  res.status(200).json({ success:true})
}

export default connectDb(handler)
