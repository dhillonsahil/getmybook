
import Order from '@/models/Order'
import connectDb from "@/middleware/mongoose";
import Product from '@/models/Product';
const handler = async (req, res) => {
    if (req.method != "POST") {
        res.status(400).json({ status: "Invalid Request" })
    }


    // Check if the cart is tempered
    let product, sumTotal=0;
    for (let item in req.body.cart) {
        console.log("item price " ,req.body.cart[item].price)
        sumTotal += (req.body.cart[item].price * req.body.cart[item].qty )
        product = await Product.findOne({ slug: item })
        if(product.availableQty<req.body.cart[item].qty){
            res.status(200).json({success:"outOfStock"})
        }
        if ((product.price*req.body.cart[item].qty) != (req.body.cart[item].price * req.body.cart[item].qty)) {
            console.log("tempered")
            res.status(400).json({ success: false, "error": "true" })
            return
        }
    }

    console.log("Sum total",sumTotal)
    console.log("Sub total",req.body.subTotal)
    if (sumTotal != req.body.subTotal) {
        res.status(400).json({ success: false, "error": "true" })
        return;
    }

    //check if the cart items are out of stock

    // check if the details are valid

    //  then initiate the order

    let order = new Order({
        email: req.body.email,
        orderId: req.body.order_id,
        address: req.body.address,
        amount: req.body.subTotal,
        products: req.body.cart
    })

    await order.save()

    return res.status(200).json({ success: true })
}

export default connectDb(handler)