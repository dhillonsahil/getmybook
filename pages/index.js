import Link from "next/link";
import Head from "next/head";
import Product from "@/models/Product";
import mongoose from "mongoose";
export default function Home({ products }) {
  return (
    <div>
      <img src="/banner.png" alt="getmybook" />

      <div className="p-2">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Popluar Books - Adding Values in Life
              </h1>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                Discover Some of our Popular Products!
              </p>
            </div>

            <div className="px-3 md:px-9">
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-6 mx-auto">
                  <div className="flex flex-wrap -m-4 justify-center">
                    {products.slice(0, 4).map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="shadow-lg m-2  lg:w-1/5 md:w-1/2 p-4 w-full"
                        >
                          <Link
                            passHref={true}
                            className="block relative  rounded overflow-hidden"
                            href={`/product/${item.slug}`}
                          >
                            <img
                              alt="ecommerce"
                              className="m-auto h-[30vh] block"
                              src={item.img}
                            />
                            <div className="mt-4 text-center md:text-left text">
                              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                {item.category}
                              </h3>
                              <h2 className="text-gray-900 title-font text-lg font-medium">
                                {item.title}
                              </h2>
                              <p className="mt-1">₹{item.price}</p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}

                    <Link
                      className=" rounded bg-pink-600 text-white p-4 my-auto mx-3"
                      href={"/books"}
                    >
                      Popluar Books
                    </Link>
                  </div>
                </div>
              </section>
            </div>
            <div className="flex my-12 flex-wrap w-full mb-20 flex-col items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                About - Get My Books
              </h1>
            </div>
            <div className="flex flex-wrap my-12 -m-4">
              <div className="xl:w-1/2 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-discount-2"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
                      <line x1="9" y1="15" x2="15" y2="9" />{" "}
                      <circle cx="9.5" cy="9.5" r=".5" fill="currentColor" />{" "}
                      <circle cx="14.5" cy="14.5" r=".5" fill="currentColor" />{" "}
                      <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" />{" "}
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Discounts upto 50%
                  </h2>
                  <p className="leading-relaxed text-base">
                    On Every Book You Will Find that Price offered to you is
                    Less than Other Websites
                  </p>
                </div>
              </div>
              <div className="xl:w-1/2 md:w-1/2 p-4">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                    <svg
                      width="24"
                      height="24"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M8 19C9.10457 19 10 18.1046 10 17C10 15.8954 9.10457 15 8 15C6.89543 15 6 15.8954 6 17C6 18.1046 6.89543 19 8 19Z"
                        stroke="currentColor"
                        stroke-miterlimit="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M18 19C19.1046 19 20 18.1046 20 17C20 15.8954 19.1046 15 18 15C16.8954 15 16 15.8954 16 17C16 18.1046 16.8954 19 18 19Z"
                        stroke="currentColor"
                        stroke-miterlimit="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M10.05 17H15V6.6C15 6.26863 14.7314 6 14.4 6H1"
                        stroke="currentColor"
                        stroke-linecap="round"
                      />{" "}
                      <path
                        d="M5.65 17H3.6C3.26863 17 3 16.7314 3 16.4V11.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                      />{" "}
                      <path
                        d="M2 9L6 9"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M15 9H20.6101C20.8472 9 21.0621 9.13964 21.1584 9.35632L22.9483 13.3836C22.9824 13.4604 23 13.5434 23 13.6273V16.4C23 16.7314 22.7314 17 22.4 17H20.5"
                        stroke="currentColor"
                        stroke-linecap="round"
                      />{" "}
                      <path
                        d="M15 17H16"
                        stroke="currentColor"
                        stroke-linecap="round"
                      />{" "}
                    </svg>
                  </div>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                    Fast Shipping
                  </h2>
                  <p className="leading-relaxed text-base">
                    We Dispatch Our Products Everyday So Your Order will be
                    delivered within 7 Days.
                  </p>
                </div>
              </div>
              
            </div>
            {/* <button className="flex mx-auto mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Button</button> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
