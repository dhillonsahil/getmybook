import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Link from "next/link";
import { HiOutlineMenuAlt2, HiViewGridAdd } from "react-icons/hi";
import { FaCartArrowDown } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Viewproducts({ order }) {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [itemStates, setItemStates] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (index, field, value) => {
    setItemStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = { ...updatedStates[index], [field]: value };
  
      // Custom logic for updating the "Payment" field based on "Delivery" field
      if (field === "Delivery") {
        if (value === "unshipped") {
          updatedStates[index] = {
            ...updatedStates[index],
            Payment: "Pending",
          };
        } else if (value === "shipped" || value === "delivered") {
          updatedStates[index] = { ...updatedStates[index], Payment: "PAID" };
        }
      }
  
      return updatedStates;
    });
  };
  
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    setOrders(order);
    setItemStates(
      order.map((item) => ({
        Delivery: item.delivery,
        Payment: item.status,
      }))
    );
  }, []);

  const updatePrice = async (index, orderId) => {
    console.log("Update Price", itemStates[index].Payment, orderId);
    let updD = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepayment`,{
      method:"POST",
      headers:{
          'Content-type':'application/json'
      },
      body:JSON.stringify({orderId,
          status:itemStates[index].Payment
      })
  })

  let res=await updD.json()
  console.log(res)
  if(res.success==true){
      toast.success('Payment Status Updated', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });

      // Update the 'order' state with the updated value
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index].status = itemStates[index].Payment;
      return updatedOrders;
    });
  }else{
      toast.error('An error Occurred', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
  }
    
  };
  
  const updatedelivery = async (index, orderId) => {
    console.log("Update Delivery", itemStates[index].Delivery, orderId);
    let updD = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatedelivery`,{
      method:"POST",
      headers:{
          'Content-type':'application/json'
      },
      body:JSON.stringify({orderId,
          delivery:itemStates[index].Delivery
      })
  })

  let res=await updD.json()
  console.log(res)
  if(res.success==true){
      toast.success('Delivery Status Updated', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });

      // Update the 'order' state with the updated value
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders];
      updatedOrders[index].delivery = itemStates[index].Delivery;
      return updatedOrders;
    });
  }
    
  };
  

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <button
        data-drawer-target="cta-button-sidebar"
        data-drawer-toggle="cta-button-sidebar"
        aria-controls="cta-button-sidebar"
        type="button"
        className="inline-flex items-center  p-2 mt-2 ml-3 text-sm text-white rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <HiOutlineMenuAlt2 className="text-2xl text-black" />
        <span className="sr-only">Open sidebar</span>
      </button>

      <aside
        ref={sidebarRef}
        id="cta-button-sidebar"
        className={`fixed top-0 bg-gray-500 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/home"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/addproduct"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiViewGridAdd className="text-xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Add Products
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaCartArrowDown className="text-xl" />
                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/viewproducts"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className='container px-2 absolute right-0 mx-auto md:w-5/6 w-[100vw] min-h-screen "grid grid-cols-3 gap-4'>
        <h1 className="font-bold  text-center text-xl my-4">All Orders</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {orders.length == 0 && <h1>No Orders Found</h1>}
          {orders.length > 0 &&
            orders.map((item, index) => (
              <div
                key={item._id}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <div className="max-w-sm rounded   mx-2 overflow-hidden ">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2"></div>
                    <p className="text-black my-2 text-xl text-bold">
                      {Object.values(item.products).map((product, index) =>
                        index === Object.values(item.products).length - 1
                          ? `${product.name} `
                          : `${product.name} , `
                      )}
                    </p>
                    <p className="text-gray-700 text-base">
                      Customer Name : {JSON.parse(item.address).name}
                    </p>
                    <p>
                      {" "}
                      Email : {JSON.parse(item.address).email} , Mobile :{" "}
                      {JSON.parse(item.address).phone}
                    </p>
                    <p>
                      Address : {JSON.parse(item.address).pincode} ,{" "}
                      {JSON.parse(item.address).city} ,{" "}
                      {JSON.parse(item.address).state}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span
                      className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  ${
                        item.delivery == "unshipped"
                          ? "bg-yellow-200"
                          : "bg-green-500"
                      } text-gray-700 mr-2 mb-2`}
                    >
                      Delivery : {item.delivery}
                    </span>
                    <span
                      className={`inline-block ${
                        item.status == "PAID" ? "bg-green-500" : "bg-yellow-200"
                      } bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
                    >
                      Payment Status : {item.status}
                    </span>
                  </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e, item.orderId)}>
                  <div className="grid gap-6 m-6 md:grid-cols-2">
                    <div>
                      <select
                          id="payment"
                          name="payment"
                          value={itemStates[index].Payment}
                          onChange={(e) => handleChange(index, "Payment", e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="PAID">PAID</option>
                        <option value="Failed">Failed</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <select
                        id="delivered"
                        name="delivered"
                        value={itemStates[index].Delivery}
                        onChange={(e) => handleChange(index, "Delivery", e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="Delivered">Delivered</option>
                        <option value="Shipped">Shipped</option>
                        <option value="unshipped">unshipped</option>
                      </select>
                    </div>

                    
                    <button
                      type="button"
                      onClick={() => updatePrice(index, item.orderId)}
                      className="bg-pink-600 text-white py-3 w-full rounded"
                    >
                      Update Payment
                    </button> <button
                      type="button"
                      onClick={() => updatedelivery(index, item.orderId)}
                      className="bg-pink-600 text-white py-3 w-full rounded"
                    >
                      Update Delivery
                    </button>
                  </div>
                </form>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let order = await Order.find();
  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}
