import React ,{useEffect, useState}from 'react'
import { useRouter } from 'next/router'
import Order from '@/models/Order'
import mongoose
  from 'mongoose'
export default function MyOrder({ order }) {
  const router = useRouter();
  const [date,setdate]=useState()
  useEffect(() => {
    if (!order) {
      router.push('/');
    }
    let d = new Date(order.createdAt)
    setdate(d)
  }, [order]);

  if (!order) {
    // You can also return a loading state or a message here while waiting for the data to load.
    return <div>Loading...</div>;
  }

  const oid = order.orderId.split('_')[1];
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id : {oid}</h1>
              <p className="leading-relaxed mb-4">{order.status=="PAID"?`Your Payment Status is Paid. Your Order has been placed Successfully`:`Your Payment Status is ${order.status}`}</p>
              <p>Order placed on : {date && date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <div className="flex text-center mb-4">
                <a className="flex-grow py-2 text-lg px-1">Description</a>
                <a className="flex-grow  py-2 text-lg px-1">Quantity</a>
                <a className="flex-grow  py-2 text-lg px-1">Price</a>
              </div>

              {Object.values(order.products).map((item) => (
                <div className="flex text-center border-b mb-2 border-gray-200 py-2" key={item.name}>
                  <span className="text-gray-500">{item.name}</span>
                  <span className="ml-auto text-center text-gray-900">{item.qty}</span>
                  <span className="ml-auto text-gray-900">{item.price}</span>
                </div>
              ))}

              <div className="flex">
                <span className="mt-6 title-font font-medium text-2xl text-gray-900">₹{order.amount}</span>
                <button disabled={order.delivery=="Pending"} className={`mt-6 flex ml-auto  text-white bg-pink-500 border-0 disabled:bg-pink-400 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded`}>{order.delivery=="Pending"?'Unshipped':'Track Order'}</button>

              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
          </div>
        </div>
      </section>
    </div>
  )
}



export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let order = await Order.findOne({ orderId: context.query.orderId });
  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  }
}