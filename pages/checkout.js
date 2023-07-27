import React from 'react'
import {  AiFillMinusCircle, AiFillPlusCircle} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'

export default function Checkout({cart,addToCart,removeFromCart , subTotal}) {

    // const initiatePayment =async ()=>{
    //     // get transaction token
        
    //     let oid=Math.floor(Math.random() * Date.now())
    //     const data={cart,subTotal,oid,email:"email@mail.com"};
    //     let a =  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
    //         method:"POST",
    //         headers:{
    //             'Content-type':'application/json'
    //         },body:JSON.stringify(data),
    //     })

    //     let txnToken = await a.json()
    //     var config = {
    //         "root":"",
    //         "flow":"DEFAULT",
    //         "data":{
    //             "orderId":Math.random(),
    //             "token":txnToken,
    //             "tokenType":"TXN_TOKEN",
    //             "amount":subTotal
    //         },
    //         "handler":{
    //             "notifyMerchant":function(eventName,data){
    //                 console.log("notifyMerchant handler function called");
    //                 console.log("eventName => ",eventName);
    //                 console.log("data =>",data)
    //             }
    //         }
    //     };

    //     window.Paytm.CheckoutJS.init(config).then(function onSuccess(){
    //         window.Paytm.CheckoutJS.invoke()
    //     }).catch(function onError(error){
    //         console.log("error =>",error);
    //     });
    // }

    return (
        <div className='container px-6 sm:m-auto'>
            <Head>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
            </Head>
            <Script type="application/javascript" src={`${NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${NEXT_PUBLIC_PAYTM_MID}.js`} onload="onScriptLoad();" crossorigin="anonymous" />

            <Script type='application/javascript' crossOrigin='anyonymous' src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}   />
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
                    <textarea  rows={2} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
            <div  className="sidecart  bg-pink-100 p-6 my-2">
        
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length===0 && <div className='my-4 font-normal text-base'>Your Cart is Empyty! </div>}
          {Object.keys(cart).map((k)=>{
             const { qty, price, name, itemcode } = cart[k];

            return <li key={k}>
            <div className="flex item my-5">
              <div className='font-semibold flex items-center justify-center'>{name}</div>
              <div className='w-1/3 flex items-center justify-center font-semibold my-3 text-lg'><AiFillMinusCircle onClick={()=>removeFromCart(k,1,cart[k].price,cart[k].name)} className='cursor-pointer text-pink-500'/><span className='mx-2 text-sm'>{qty}</span><AiFillPlusCircle onClick={()=>addToCart(k,1,cart[k].price,cart[k].name)} className='cursor-pointer text-pink-500'/></div>
            </div>
          </li>
          })}
         
          
        </ol>  
          <span className="total font-bold">SubTotal :₹{subTotal}</span>
          <div className="mx-4"> <Link  href={'/checkout'}><button className="flex items-center mr-2  text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">< BsFillBagCheckFill className='m-1'/> Pay ₹ </button></Link>
          </div>
      </div>
      
        </div>
    )
}