
import Order from '@/models/Order'
import connectDb from "@/middleware/mongoose";
import Product from '@/models/Product';
const handler = async (req, res) => {
    if (req.method != "POST") {
        res.status(400).json({ status: "Invalid Request" })
    }


    // Check if the cart is tempered
    let product, sumTotal=0;
    for (let item in req.body.data.cart) {
        console.log("item price " ,req.body.data.cart[item].price)
        sumTotal += (req.body.data.cart[item].price * req.body.data.cart[item].qty )
        product = await Product.findOne({ slug: item })
        if(product.availableQty<req.body.data.cart[item].qty){
            res.status(200).json({success:"outOfStock"})
        }
        if ((product.price*req.body.data.cart[item].qty) != (req.body.data.cart[item].price * req.body.data.cart[item].qty)) {
            console.log("tempered")
            res.status(400).json({ success: false, "error": "true" })
            return
        }
    }

    console.log("Sum total",sumTotal)
    console.log("Sub total",req.body.data.subTotal)
    if (sumTotal != req.body.data.subTotal) {
        res.status(400).json({ success: false, "error": "true" })
        return;
    }

    //  then initiate the order

    // let order = new Order({
    //     email: req.body.data.email,
    //     orderId: req.body.data.order_id,
    //     address: req.body.data.address,
    //     amount: req.body.data.subTotal,
    //     products: req.body.data.cart,
    //     address:req.body.addr,
    // })

    let order = new Order({
        email: req.body.data.email,
        orderId: req.body.data.order_id,
        address: req.body.data.address,
        amount: req.body.data.subTotal,
        products: req.body.data.cart,
        address:req.body.addr,
        delivery: 'Pending' // set the delivery field here
    })
    

    await order.save()

    return res.status(200).json({ success: true })
}

export default connectDb(handler)