import React , {useState} from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import Head from 'next/head'
import { v4 as uuidv4 } from 'uuid';

export default function Checkout({ cart, addToCart, removeFromCart, subTotal }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [state, setState] = useState('')
  const [address, setAddress] = useState('')
  const [city,setCity]=useState('')
  const oid =  uuidv4();;

  const [disabled,setDisabled]=useState(true)

  const handleChange = (e) =>{
    if(e.target.name=='name'){
      setName(e.target.value)
    }else if(e.target.name=='email'){
      setEmail(e.target.value)
    }else if(e.target.name=='address'){
      setAddress(e.target.value)
    }else if(e.target.name=='pincode'){
      setPincode(e.target.value)
    }else if(e.target.name=='phone'){
      setPhone(e.target.value)
    }else if(e.target.name=='state'){
      setState(e.target.value)
    }else if(e.target.name=='city'){
      setCity(e.target.value)
    }

    // enable pay
    if(name&& email && phone.length==10 && pincode.length==6 && city && state && address){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }


  const passData = {cart,subTotal,oid,email,address,name,pincode,phone}
  const createOrder = async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(passData)
    })
    let response= await res.json()
    console.log(response)
  }

  // razor pay
  const loadScript = (url) => {
    // insert oder as pending in database
    
    return new Promise((resolve) => {
      // intitiatre an order corresponding to this order id

      // load script
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
    await createOrder()
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
      description: `${oid}`,
      image: './logo.png', // Add a URL to your logo
      handler: function (response) {
      
        // handle response
        // const b = await fetch(`${process.env.NEXT_PUBLIC_HOST}`)
        console.log('Payment successful:', response);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
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
          <div className={"mb-2"}>
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
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
            <input onChange={handleChange} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
        <div className="mx-4"> 
        <button disabled={disabled}
          id="razorpay-payment-button"
          onClick={() => displayRazorpay(subTotal)}
          className="flex items-center mr-2 disabled:bg-pink-200 text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          <BsFillBagCheckFill className="m-1" /> Pay ₹
        </button>

        </div>
      </div>

    </div>
  )
}
