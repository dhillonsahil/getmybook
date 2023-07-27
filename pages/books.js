import Link from 'next/link'
import React from 'react'
import Product from "@/models/Product"
import mongoose from 'mongoose'

export default function Books({ products }) {
  return (
    <div className='px-3 md:px-9'>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {/* We will use map to show all products */}

            {products.length==0 && <p>Sorry All the Books Are Out Of Stock Right Now ! New Stock Coming Soon</p>}
            {products.map((item) => {
              return <div key={item._id} className="shadow-lg m-2  lg:w-1/5 md:w-1/2 p-4 w-full">
              <Link passHref={true} className="block relative  rounded overflow-hidden" href={`/product/${item.slug}`}>

                <img alt="ecommerce" className="m-auto h-[30vh] block" src={item.img} />
                <div className="mt-4 text-center md:text-left text">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                  <p className="mt-1">₹{item.price}</p>
                </div>
              </Link>
            </div>
            })}

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

  let products = await Product.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  }
}