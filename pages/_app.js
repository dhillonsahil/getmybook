import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
    const hideNav=['/admin/home','/admin/addproduct','/admin/login','/admin/orders','/admin/viewproducts']
    const [cart, setCart] = useState({})
    const [subTotal, setSubTotal] = useState(0)
    const router = useRouter()

    const hideNavbar = hideNav.includes(router.pathname);

    // Add to Cart Function
    const addToCart = (itemcode, qty, price, name) => {
        let newCart = cart;
        if (itemcode in cart) {
            newCart[itemcode].qty = cart[itemcode].qty + qty;
        } else {
            newCart[itemcode] = { qty: 1, price, name }

        }
        setCart(newCart)
        saveCart(newCart)
        toast.success('Item Added to Cart', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    //   Save cart in localstorage
    const saveCart = (mycart) => {
        localStorage.setItem("cart", JSON.stringify(mycart))
        let subt = 0;
        let keys = Object.keys(mycart)
        for (let i = 0; i < keys.length; i++) {
            subt += mycart[keys[i]].price * mycart[keys[i]].qty
        }
        setSubTotal(subt)
    }

    // clear cart
    const clearCart = () => {
        setCart({})
        saveCart({})
    }


    const LogOut= ()=>{
        localStorage.removeItem('myUser')
        setUser({value:null})
        setKey(Math.random())
        router.push('/')
    }
    // buy now func
    const buyNow = (itemcode, qty, price, name) => {
        let newCart = {}
         newCart[itemcode] = { qty: 1, price, name } ;
        setCart(newCart)
        saveCart(newCart)
        router.push("/checkout")
    }

    // remove from cart
    const removeFromCart = (itemcode, qty, price, name) => {
        let newCart = JSON.parse(JSON.stringify(cart));
        if (itemcode in cart) {
            newCart[itemcode].qty = cart[itemcode].qty - qty;
        }

        if (newCart[itemcode]["qty"] <= 0) {
            delete newCart[itemcode]
        }
        setCart(newCart)
        saveCart(newCart)
    }

    const [user, setUser] = useState({value:null})
    const [key, setKey] = useState(0)
    useEffect(() => {
        router.events.on('routeChangeComplete',()=>{
            setProgress(100)
        })
        router.events.on('routeChangeStart',()=>{
            setProgress(40)
        })
        try {
            if (localStorage.getItem("cart")) {
                setCart(JSON.parse(localStorage.getItem("cart")))
                saveCart(JSON.parse(localStorage.getItem("cart")))
            }
        } catch (error) {
            console.log("error loading the cart" + error)
            localStorage.clear()
        }
        const myUser = JSON.parse(localStorage.getItem("myUser"))
        if(myUser){
            setUser({value:myUser.token,email:myUser.email})
            console.log(user)
        }
        setKey(Math.random)

    }, [router.query])

    

    const [progress, setProgress] = useState(0)
    return <>
        <Head>
            <title>GetMyBook.com - Buy Books</title>
            <meta property="og:title" content="Get My Books Sells The Books at Discounted price from market we provide upto60% of Discounts" key="title" />


        </Head>
        <LoadingBar
        color='#f11946'
        waitingTime={600}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        {key && !hideNavbar && <Navbar LogOut={LogOut} user={user} key={key} addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />}
        
        <Component user={user} buyNow={buyNow} addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}   {...pageProps} />
        {!hideNavbar &&<Footer />}
    </>
}
