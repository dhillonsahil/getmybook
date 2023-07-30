import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import Product from '@/models/Product';
import mongoose from 'mongoose';
import Link from 'next/link';
import { HiOutlineMenuAlt2, HiViewGridAdd } from 'react-icons/hi'
import { FaCartArrowDown } from 'react-icons/fa'



export default function Orders({ order }) {
    //  If not logged in signout
    const [orders, setOrders] = useState([])
    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [newQty,setQty]=useState()
    const [newprice,setNewprice]=useState()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        setOrders(order)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    // update price
    const updatePrice = async(slug,price)=>{
        let upd = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateprice`,{
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },body:JSON.stringify({
                // qty:
            })
        })
    }

    return (
        <> <button
            data-drawer-target="cta-button-sidebar"
            data-drawer-toggle="cta-button-sidebar"
            aria-controls="cta-button-sidebar"
            type="button"
            className="inline-flex items-center  p-2 mt-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleSidebar}
        >
            <HiOutlineMenuAlt2 className='text-2xl text-black' />
            <span className="sr-only">Open sidebar</span>
        </button>

            <aside
                ref={sidebarRef}
                id="cta-button-sidebar"
                className={`fixed top-0 bg-gray-500 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/admin/home" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/addproduct" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <HiViewGridAdd className='text-xl' />
                                <span className="flex-1 ml-3 whitespace-nowrap">Add Products</span>

                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaCartArrowDown className='text-xl' />
                                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>

                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/viewproducts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                            </Link>
                        </li>

                    </ul>

                </div>
            </aside>
            <div className='container px-2 absolute right-0 mx-auto md:w-5/6 w-[100vw] min-h-screen "grid grid-cols-3 gap-4'>
                <h1 className="font-bold  text-center text-xl my-4">All Products</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {orders.length == 0 && <h1>No Orders Found</h1>}
                    {orders.length > 0 && orders.map((item) => {
                        return <div key={item._id} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <div class="max-w-sm rounded   mx-2 overflow-hidden ">

                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">


                                    </div>
                                    <p class="text-gray-700 text-xl text-bold">
                                       {item.title}
                                    </p>
                                    <p className='text-bold'> Slug : {item.slug}</p>
                                </div>
                                <div class="px-6 pt-4 pb-2">
                                    <span class={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold   text-gray-700 mr-2 mb-2`}>Price : {item.price}</span>
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Quantity Avialble : {item.availableQty}</span>
                                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Category : {item.category}</span>

                                </div>
                                
                            </div>


                        </div>
                    })}
                </div>



            </div>
        </>
    )
}





export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let order = await Product.find();
    return {
        props: { order: JSON.parse(JSON.stringify(order)) },
    }
}