import { createHmac } from 'crypto';

export default function handler(req, res) {
  const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const keySecret = 'KfmAKyT7RCFo4XEvQ1gd3YTI'; // Replace with your actual Razorpay Key Secret

  const generatedSignature = createHmac('sha256', keySecret)
    .update(`${order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    // Signature verification successful
    res.status(200).json({ success: true });
  } else {
    // Signature verification failed
    res.status(400).json({ success: false });
  }
}
