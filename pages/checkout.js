import React from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'

export default function Checkout({ cart, addToCart, removeFromCart, subTotal }) {

  // const initiatePayment = async () => {

  //   let oid = Math.floor(Math.random() * Date.now())
  //   // get a transaction token

  //   const data = { cart, subTotal, oid, email: "email@gmail.com" }
  //   // 
  //   let a = await fetch(`http://localhost:3000/api/pretransaction`, {
  //     method: "POST", 
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })

  //   let txnToken = await a.json()
  //   console.log(txnToken)

  //   var config = {
  //     "root": "",
  //     "flow": "DEFAULT",
  //     "data": {
  //       "orderId": oid, /* update order id */
  //       "token": txnToken, /* update token value */
  //       "tokenType": "TXN_TOKEN",
  //       "amount": subTotal /* update amount */
  //     },
  //     "handler": {
  //       "notifyMerchant": function (eventName, data) {
  //         console.log("notifyMerchant handler function called");
  //         console.log("eventName => ", eventName);
  //         console.log("data => ", data);
  //       }
  //     }
  //   };
  //   // initialze configuration using init method
  //   window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
  //     // after successfully updating configuration, invoke JS Checkout
  //     window.Paytm.CheckoutJS.invoke();
  //   }).catch(function onError(error) {
  //     console.log("error => ", error);
  //   });

  // }


  const loadScript = (url) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = url

      script.onload = () => {
        resolve(true)
      }

      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }

  const displayRazorpay = async (amount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('You are offline... Failed to load');
      return;
    }

    const options = {
      key: 'rzp_test_bPJZziSuHLY9L5', // Replace with your Razorpay Key ID
      amount: amount * 100, // Razorpay amount is in paise, so convert the amount to paise by multiplying with 100
      currency: 'INR', // Change the currency as needed
      name: 'Get My Book',
      description: 'Purchase Description',
      image: './logo.png', // Add a URL to your logo
      handler: function (response) {
        // This function will be called after successful payment
        // You can perform additional actions here, like updating your database or displaying a success message to the user
        console.log('Payment successful:', response);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '+919876543210',
        // Add pre-filled customer details if needed
      },
      notes: {
        // Add optional notes for your reference or additional data you want to collect
      },
      theme: {
        color: '#F37254', // Customize the theme color
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className='container px-6 sm:m-auto'>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous" />
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='text-xl font-semibold mb-3'>1. Delivery Details</h2>
      <div className="max-auto flex">
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <div>
        <div className="px-2 w-full clear-both">
          <div className={"mb-2"}>
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea rows={2} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

        </div>
      </div>
      <div className="max-auto flex">
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
            <input type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <div className="max-auto flex">

        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>

      <h2 className='text-xl font-semibold mb-3'>2. Review cart Items and Pay</h2>
      <div className="sidecart  bg-pink-100 p-6 my-2">

        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='my-4 font-normal text-base'>Your Cart is Empyty! </div>}
          {Object.keys(cart).map((k) => {
            const { qty, price, name, itemcode } = cart[k];

            return <li key={k}>
              <div className="flex item my-5">
                <div className='font-semibold flex items-center justify-center'>{name}</div>
                <div className='w-1/3 flex items-center justify-center font-semibold my-3 text-lg'><AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name)} className='cursor-pointer text-pink-500' /><span className='mx-2 text-sm'>{qty}</span><AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name)} className='cursor-pointer text-pink-500' /></div>
              </div>
            </li>
          })}


        </ol>
        <span className="total font-bold">SubTotal :₹{subTotal}</span>
        <div className="mx-4"> <button
          id="razorpay-payment-button"
          onClick={() => displayRazorpay(subTotal)}
          className="flex items-center mr-2  text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          <BsFillBagCheckFill className="m-1" /> Pay ₹
        </button>

        </div>
      </div>

    </div>
  )
}