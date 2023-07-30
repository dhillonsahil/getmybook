import { useEffect } from "react"


export default function Addproduct() {

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if(!localStorage.getItem("checkItout")){
            router.push('/admin/login')
        }
        document.addEventListener('mousedown', handleClickOutside);
        setOrders(order);
        // Initialize itemStates with the default values from the order data
        setItemStates(order.map((item) => ({ Delivery: '', Payment: '' })));
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  return (
    <>
  

</>
  )
}
