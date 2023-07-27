import React,{useEffect} from 'react'
import mongoose from 'mongoose';
import Order from '@/models/Order';
import { useRouter } from 'next/router';
export default function Orders() {
    //  If not logged in signout
    const router = useRouter()

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            router.push('/login')
        }
    },[])
  return (
    <div className='container mx-auto'>
      <h1 className="font-bold  text-center text-xl my-4">My Orders</h1>
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg table-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-700 text-white">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b   hover:bg-gray-50 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                ">
                    Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4 text-gray-900">
                    Silver
                </td>
                <td className="px-6 py-4 text-gray-900">
                    Laptop
                </td>
                <td className="px-6 py-4 text-gray-900">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b   hover:bg-gray-50 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                ">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4 text-gray-900">
                    White
                </td>
                <td className="px-6 py-4 text-gray-900">
                    Laptop PC
                </td>
                <td className="px-6 py-4 text-gray-900">
                    $1999
                </td>
            </tr>
            <tr className="bg-white  hover:bg-gray-50 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                ">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4 text-gray-900">
                    Black
                </td>
                <td className="px-6 py-4 text-gray-900">
                    Accessories
                </td>
                <td className="px-6 py-4 text-gray-900">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>



    </div>
  )
}



export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI)
    }
  
    let orders = await Order.find({ }, { createdAt: 0, updatedAt: 0, __v: 0 });
    return {
      props: { orders: orders },
    }
  }