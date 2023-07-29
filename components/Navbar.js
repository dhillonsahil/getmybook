// "use client"
import React, { useState ,useRef,useEffect}  from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io'
import {  AiFillMinusCircle, AiFillPlusCircle} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs'
import {MdAccountCircle} from "react-icons/md"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';


export default function Navbar({LogOut,user,addToCart,cart,removeFromCart  ,clearCart ,subTotal}) {

  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const router = useRouter()

  useEffect(() => {
    Object.keys(cart).length!==0 && setSidebar(true)
    // if(router.pathname=='/checkout' || router.pathname=='/myaccount' ||  router.pathname=='/' ||  router.pathname=='/product' ||  router.pathname=='/login' ||  router.pathname=='/signup' ||  router.pathname=='/fiction' ||  router.pathname=='/books' ||  router.pathname=='/selfhelp' ||   router.pathname=='/novels' ){
    if(router.pathname!='/temppage'){
      setSidebar(false)
    }
  }, [])
  


  const toggleCart = () => {
    setSidebar(!sidebar)
  }
  const ref = useRef()
  // dropdown menu func
  const toggleDropDown =()=>{
    setDropdown(!dropdown)
  }

  // return jsx
  return (
    <div className={`flex sticky top-0 z-10 bg-white flex-col md:flex-row md:justify-start justify-center items-center mb-1 py-2 shadow-md `}>
      <div className="logo mr-auto md:mx-5">
        <Link href={'/'}>
          <Image src={'/logo_long.png'} height={50} width={200} alt='logo'></Image></Link>
      </div>
      <div className="nav" >
        <ul className='flex  items-center space-x-5 font-bold md:text-md'>
          <Link href={'/novels'}><li>Novels</li></Link>
          <Link href={'/selfhelp'}><li>SelfHelp</li></Link>
          <Link href={'/fiction'}><li>Fiction</li></Link>
          <Link href={'/books'}><li>All Books</li></Link>

        </ul>
      </div>
      <div  className="cart absolute item-center right-0 top-4 mx-5 cursor-pointer flex">
      {user.value &&<MdAccountCircle  onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)} className='text-xl md:text-2xl mx-2' />}
      {/* Dropdown content */}
      <div  onMouseOver={()=>setDropdown(true)} onClick={()=>setDropdown(!dropdown)} onMouseLeave={()=>setDropdown(false)}>
      {dropdown && (
          <div  className="absolute bg-white right-8 top-6 rounded-lg px-5 w-44">
            <ul className="py-2 text-sm text-gray-700">
              <Link href={'/myaccount'} className="block px-4 py-2 hover:bg-gray-100"><li>My Account</li></Link>
              <Link href={'/orders'} className="block px-4 py-2 hover:bg-gray-100"><li>Orders </li></Link>
              <a className="block px-4 py-2 hover:bg-gray-100" onClick={LogOut} ><li>Sign Out </li></a>
              
            </ul>
          </div>
        )}
      </div>
       {!user.value &&  <Link href={'/login'}>
          <button className='bg-pink-500 text-white mx-2 text-sm rounded-md px-2 py-1'>Login</button>
        </Link>}
        <FaShoppingCart className='text-xl md:text-2xl mx-1' onClick={toggleCart}/>
      </div>
      {/*  Cart  */}
      <div ref={ref} className={`w-90 sidecart h-[100vh]  overflow-y-scroll fixed top-0  bg-pink-100 py-10 px-8 transform transition-alll ${sidebar?"right-0":"-right-96"} z-50`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2"> <IoIosCloseCircle className='text-xl md:text-2xl cursor-pointer' /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length===0 && <div className='my-4 font-normal text-base'>Your Cart is Empyty! </div>}
          {Object.keys(cart).map((k)=>{
             const { qty, price, name, itemcode } = cart[k];

            return <li key={k}>
            <div className="flex item my-5">
              <div className='w-2/3 font-semibold flex items-center justify-center'>{name}</div>
              <div className='w-1/3 flex items-center justify-center font-semibold my-3 text-lg'><AiFillMinusCircle onClick={()=>removeFromCart(k,1,cart[k].price,cart[k].name)} className='cursor-pointer text-pink-500'/><span className='mx-2 text-sm'>{qty}</span><AiFillPlusCircle onClick={()=>addToCart(k,1,cart[k].price,cart[k].name)} className='cursor-pointer text-pink-500'/></div>
            </div>
          </li>
          })}
         
          
        </ol>  
        <div className="total font-bold my-5">SubTotal :₹{subTotal}</div>
        <div className="flex">
        <Link href={'/checkout'}><button disabled={subTotal==0} className="flex disabled:bg-pink-200 items-center mr-2  text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">< BsFillBagCheckFill className='m-1'/> CheckOut</button></Link>

        <button onClick={clearCart} disabled={subTotal==0} className="flex  mr-2 disabled:bg-pink-200 text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"> Clear Cart</button>
        </div>
      </div>
      
    </div>
  )
}
