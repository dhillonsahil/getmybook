import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/router'
import { ToastContainer,toast } from 'react-toastify';


export default function MyAccount() {
    const router = useRouter()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(0);
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');
    const [user,setUser]=useState('')

    useEffect(()=>{
        if(!localStorage.getItem("myUser")){
            router.push('/login')
        }

        const user = JSON.parse(localStorage.getItem('myUser'))
        if(user && user.token){
          setUser(user)
          setEmail(user.email)
        }
    },[])

    const handleChange = async(e) => {
      if (e.target.name === 'name') {
        setName(e.target.value);
        {user.email?setEmail(user.email) :console.log('Nope')}
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
          
        }
      } else if (e.target.name === 'phone') {
        setPhone(e.target.value);
        if(e.target.value.length==10){
          console.log(e.target.value , Number.isInteger(Number.parseInt(e.target.value)))
        }
      }
      
    };

    
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
      <h1 className='font-bold text-3xl my-8 text-center'>Update Your Account Details</h1>
      <div className="max-auto flex">
        <div className="px-2 w-1/2">
          
          <div className={"mb-2"}>
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (Updating email is not allowed)</label>
            <input  value={email} readOnly={true} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
            <input onChange={handleChange} value={phone!=0?phone:''} type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className={"mb-2"}>
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
        <div className="flex items-center justify-center my-5">
        <button
            id='razorpay-payment-button'
            className=' flex items-center justify-center py-3 rounded-3xl mr-2 w-1/2 text-center disabled:bg-pink-200 text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg'
          >
           Submit
          </button>
        </div>
    </div>
  )
}
