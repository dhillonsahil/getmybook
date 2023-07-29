import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Orders() {
    //  If not logged in signout
    const [orders, setOrders] = useState([])
    const router = useRouter()

    useEffect( ()=>{
        if(!localStorage.getItem("myUser")){
            router.push('/login')
        }
        console.log(localStorage.getItem('myUser').token)
        const fetchOrders = async ()=>{
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`,{
                method:"POST",
                headers:{
                    'Content-type':'application/json'
                },body:JSON.stringify({token:JSON.parse(localStorage.getItem('myUser')).token})
            })
           
            let res = await a.json()
            setOrders(res.orders)
        }

        fetchOrders()
    },[])
  return (
    <div className='container px-2 mx-auto min-h-screen'>
      <h1 className="font-bold  text-center text-xl my-4">My Orders</h1>
      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg table-auto">
   {orders.length!=0?<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-700 text-white">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
            {orders && orders.map((item)=>{
                return <tr key={item._id} className="bg-white border-b   hover:bg-gray-50 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                ">
                   {/* {item.orderId} */}
                   {Object.values(item.products).map((product,index) => (
          index===Object.values(item.products).length-1?`${product.name} `:`${product.name} , `
      ))}
                    
                </th>
                
                <td className="px-4 py-4 text-gray-900">
                    {item.amount}
                </td>
                <td className="px-4 py-4 text-gray-900">
                    {item.status}
                </td>
                <td className="px-4 py-4 text-gray-900">
                   <Link href={`/order?orderId=${item.orderId}`}>Details</Link>
                </td>
            </tr>
            })}
            

        </tbody>
    </table> : <h1 className='text-center my-10 py-10 text-black font-bold'>No Orders Found</h1>}
</div>



    </div>
  )
}


