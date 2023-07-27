import React, { useEffect }  from 'react'
import { useRouter } from 'next/router'

export default function MyAccount() {
    const router = useRouter()

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            router.push('/login')
        }
    },[])
  return (
    <div>MyAccount</div>
  )
}
