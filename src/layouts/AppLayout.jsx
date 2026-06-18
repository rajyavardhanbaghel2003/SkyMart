import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import { Toaster } from 'sonner'
import { CartProvider } from '../components/context/CartContext'
import CartSidebar from '../components/cart/CartSidebar'
import ScrollToTop from '../components/ScrollToTop'

const AppLayout = () => {
  return (
    <CartProvider>
      <ScrollToTop/>
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
      <div>
        <CartSidebar/>
      </div>
      <div className='h-16'>
        <Navbar/>
      </div>
      <div className='px-3 md:px-8 py-6'>
        <Outlet/>
      </div>
      <div>
        <Footer/>
      </div>
    </CartProvider>
  )
}

export default AppLayout
