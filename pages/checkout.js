import React, { useState,useEffect } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';
import crypto from 'crypto'
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

export default function Checkout({ user,cart,clearCart, addToCart, removeFromCart, subTotal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  // const [payObj, setPayObj] = useState({})

  
  const router = useRouter()
  const handleChange = async(e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
      {user.email?setEmail(user.email) :console.log('Nope')}
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'address') {
      setAddress(e.target.value);
    } else if (e.target.name === 'pincode') {
      setPincode(e.target.value);
      if(e.target.value.length==6){
        let a = await fetch(`https://api.postalpincode.in/pincode/${e.target.value}`)
        let pincodeRes =await a.json() 
        if(pincodeRes[0].Status=="Success"){
          setState(pincodeRes[0].PostOffice[0].State)
          setCity(pincodeRes[0].PostOffice[0].District)
        }else{
          toast.error('Incorrect Pincode', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        }
        
      }else{
        setState('')
        setCity('')
      }
    } else if (e.target.name === 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name === 'state') {
      setState(e.target.value);
    } else if (e.target.name === 'city') {
      setCity(e.target.value);
    }

    
  };

  const handlePayment = async () => {
    if(subTotal==0){
      toast.error('Cart Empty !', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
      return
    }
    if (!phone || !/^[0-9]{10}$/.test(phone) || Number.isInteger(phone)) {
      toast.error("Please enter a valid 10-digit phone number.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
      return;
    }
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
      return;
    }
  
    if (!pincode || pincode.length !== 6 || Number.isInteger(pincode)) {
      toast.error("Please enter a valid 6-digit pincode.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
      return;
    }

    let pins = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    let pincodeRes =await pins.json() 
    if(pincodeRes[0].Status=="Success"){
      setState(pincodeRes[0].PostOffice[0].State)
      setCity(pincodeRes[0].PostOffice[0].District)
    }else{
      toast.error('Incorrect Pincode  Or Pincode not Serviceable !', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    return
    }
    
    if(address.length==0 || state.length==0 || city.length==0 ||name.length==0){
      alert();
      toast.error("Insert Data in Empty fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
      return
    }
    try {
      // const as = await loadScript()
      const response = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart,
          subTotal,
          email,
          address,
          name,
          pincode,
          phone,
        }),
      });

      if (response.ok) {
        const orderData = await response.json();
        const { order_id } = orderData;
        const data = { email, order_id, address, subTotal, cart, name,phone,pincode,state,city }

        // save order in db
        let saveOrder = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
          method: "POST",
          headers: {
            'Content-type': "application/json"
          // }, body: JSON.stringify(data)
          }, body: JSON.stringify({
            data,
            addr:JSON.stringify({
              name:name,
              phone:phone,
              address:address,
              pincode:pincode,
              state:state,
              city:city,
              email:email,
            })
          })
        })

        let preResponse=await saveOrder.json()
        if(preResponse.success==false){
          toast.error('Cart Tempered ! Please try again', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        clearCart()
        }else if(preResponse.success=="outOfStock"){
          toast.error('Items Out OF Stock or Less Quantity Available', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        clearCart()
        }else{

       
        // Initialize Razorpay with the order ID received from the server
        const rzpOptions = {
          key: 'rzp_test_bPJZziSuHLY9L5',
          amount: subTotal * 100, // Amount in paise (multiply by 100)
          currency: 'INR',
          name: 'Get My Book',
          description: 'Product Description',
          image: './logo.png',
          order_id: order_id,
          prefill: {
            name: name,
            email: email,
            contact: phone,
          },
          handler: async function (response) {
            // Payment success handling
            console.log('Payment successful:', response );
            await checkSignature(response)
          },
          notes: {},
          theme: {
            color: '#F37254',
          },
        };

        // Create Razorpay instance
        const rzp = new window.Razorpay(rzpOptions);

        // handle payment failure
        rzp.on('payment.failed', async function (response){
          // sent to post api update payment failed
          const updateStatus = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/failedtransaction`,{
            method:"POST",
            headers:{
              'Content-type':'application/json'
            },body:JSON.stringify({
              razorpay_order_id:order_id
            })
          })
    
          let a = await updateStatus.json()
          

      })
        // Open the Razorpay payment modal
        rzp.open();
      }
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };


  // Check Signature is payment really success - [if  both are same we will redirect to order page and update payment as success]
  const checkSignature = async(payObj) => {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=payObj

    const body = razorpay_order_id + "|" + razorpay_payment_id
   
    const expectedSign = await crypto.createHmac('sha256','KfmAKyT7RCFo4XEvQ1gd3YTI').update(body.toString()).digest('hex');
    var response= {"signatureIsValid":"false"}
    if(expectedSign===razorpay_signature){
      
      // update order status
      const updateStatus = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },body:JSON.stringify({
          paymentInfo:payObj,
          razorpay_payment_id:payObj.razorpay_payment_id,
          cart:cart
        })
      })

      let a = updateStatus.json()
      clearCart()
      await router.push(`/order?orderId=${payObj.razorpay_order_id}`)
    }

  }
  return (
    <div className='container px-6 sm:m-auto'> 
       <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
      <Head>
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0'
        />
      </Head>
      <Script src={'https://checkout.razorpay.com/v1/checkout.js'} />
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='text-xl font-semibold mb-3'>1. Delivery Details</h2>
      <div className="max-auto flex">
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          {user.email? <div className={"mb-2"}> 
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>:<div className={"mb-2"}>
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          }
        </div>

      </div>
      <div>
        <div className="px-2 w-full clear-both">
          <div className={"mb-2"}>
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea onChange={handleChange} rows={2} value={address} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>

        </div>
      </div>
      <div className="max-auto flex">
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
            <input onChange={handleChange} value={phone} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <div className="max-auto flex">

        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input onChange={handleChange} value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">State</label>
            <input onChange={handleChange} value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

      </div>
      <h2 className='text-xl font-semibold mb-3'>2. Review cart Items and Pay</h2>
      <div className='sidecart  bg-pink-100 p-6 my-2'>
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
        <span className='total font-bold'>SubTotal :₹{subTotal}</span>
        <div className='mx-4'>
          <button
            id='razorpay-payment-button'
            onClick={handlePayment}
            className='flex items-center mr-2 disabled:bg-pink-200 text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg'
          >
            <BsFillBagCheckFill className='m-1' /> Pay ₹
          </button>
        </div>
      </div>
    </div>
  );
}
