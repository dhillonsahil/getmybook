// pages/api/createOrder.js
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if(req.method!="POST"){
    res.json({error:"Invalid method"})
  }

  
  const { cart, subTotal, email, address, name, pincode, phone } = req.body;

  // Initialize Razorpay with your Razorpay Key ID and Secret
  const razorpay = new Razorpay({
    key_id: 'rzp_test_bPJZziSuHLY9L5',
    key_secret: 'KfmAKyT7RCFo4XEvQ1gd3YTI',
  });

  try {
    // Create an order on Razorpay
    const order = await razorpay.orders.create({
      amount: subTotal * 100, // Amount in paise (multiply by 100)
      currency: 'INR',
      receipt: uuidv4(), // Generate a unique receipt ID
    });

    // Save the order ID in your database or session for later use
    const orderId = order.id;

    // Return the order ID to the client
    res.status(200).json({ order_id: orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}
