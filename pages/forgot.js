import React,{useEffect} from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router';
export default function Forgot() {
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem("token")){
        router.push('/')
    }
},[])

  return (
    <div className='px-4'>
      <div className="min-h-screen md:min-h-0 bg-white-500 pb-16 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-pink-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-center text-2xl font-semibold">Fogot Password</h1>
            <div className="mt-12">
              <form>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                  <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="" placeholder="mike@gmail.com" />
                </div>
                <div className="m-10">
                  <button className="bg-pink-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg">
                    Continue
                  </button>
                </div>
              </form>
              <div className="mt-10 text-sm font-display font-semibold text-gray-700 text-center"><span className='mx-2'>{`Remember Password ?`}</span><Link href={'/login'} className="mx-1 cursor-pointer  hover:text-indigo-800"><span className='text-pink-600'>login</span></Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}