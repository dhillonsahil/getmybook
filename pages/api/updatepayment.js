import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";

const updatedel = async (req, res) => {
  try {
    console.log(req.body.delivery)
    let as = await Order.findOneAndUpdate({orderId:req.body.orderId},{status:req.body.status})
    await as.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ success: false });
  }
};

export default connectDb(updatedel);
