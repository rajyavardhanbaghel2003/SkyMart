import { ArrowRight } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router'

const Hero = () => {
  const user = JSON.parse(localStorage.getItem("skymart_session"));
  return (
    
      <div className="relative overflow-hidden rounded-3xl bg-[#111] border border-white/80 p-8 sm:p-12 mb-10">
        <div className="absolute inset-0 pointer-events-none overflow-hidden ">
          <div className="absolute inset-0 opacity-[0.06] grid-bg" ></div>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-primary/70 text-sm font-body tracking-widest uppercase mb-3">Good afternoon 👋</p>
            <div className="font-heading font-bold text-4xl sm:text-5xl text-white leading-none mb-3 ">
              <h1 className=''>Welcome back,</h1>
              <span className="text-primary capitalize">{user.name}!</span>
            </div>
            <p className="text-white/40 max-w-md">Discover today's picks — hand-curated products across electronics, fashion, and more.</p>
            <div className="flex gap-3 mt-6 flex-wrap">
              <NavLink className="py-3 px-6 text-black rounded-2xl font-semibold text-sm flex items-center gap-2 bg-primary hover:bg-buttonHover transition-all duration-300" to="/shop">Shop Now
                
                <ArrowRight className='w-4 h-4' />
              </NavLink>

              <NavLink className="rounded-2xl font-semibold text-sm border py-3 px-6 border-border hover:border-white/70 transition-all duration-300 flex items-center gap-2" to="/shop">View All Products</NavLink>
            </div>
          </div>
          <div className="shrink-0 flex flex-col gap-3">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 text-center">
              <p className="font-heading font-bold text-4xl text-volt">20+</p>
              <p className="text-white/40 text-xs font-body mt-1">Products Available</p>
            </div>
            <div className=" border border-white/80 rounded-2xl px-6 py-4 text-center">
              <p className="font-heading font-bold text-2xl text-white">Free</p>
              <p className="text-white/40 text-xs font-body mt-1">Delivery on ₹999+</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Hero
