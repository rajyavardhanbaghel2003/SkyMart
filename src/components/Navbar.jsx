import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { LogOut, ShoppingCart, Zap, Menu, X } from 'lucide-react';
import { useCart } from './context/CartContext';
import { useUser } from './context/UserContext';
import { toast } from 'sonner';

const Navbar = () => {
  const { setIsCartOpen, cartItems } = useCart();
  const { logout } = useUser();
  const user = JSON.parse(localStorage.getItem("skymart_session"));

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const totalItems = cartItems.length;

  useEffect(() => {
    const handleScroll = (e) => {
      // Hide navbar if scrolled more than 50px
      if (e.deltaY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  const handleLogout = () => {
    toast.info('See you next time! 👋', { duration: 2000 });
    setTimeout(() => logout(), 400);
  };

  return (
    <nav className={`fixed top-0 z-[100] w-full bg-bg/80 backdrop-blur-md transition-all duration-300 ${
      isScrolled ? "-translate-y-full border-b border-border" : "translate-y-0 border-b border-transparent"
    }`}>
      <div className='px-4 sm:px-6 py-3 flex justify-between items-center'>
        
        {/* Logo */}
        <NavLink to="/" className='flex gap-2 shrink-0 items-center'>
          <div className='bg-primary flex items-center justify-center rounded-xl w-8 h-8'>
            <Zap className='text-bg fill-bg w-4 '/>
          </div>
          <span className='font-bold text-lg font-heading text-white'>Sky<span className='text-primary'>Mart</span></span>
        </NavLink>

        {/* Desktop Links */}
        <div className='hidden md:flex gap-8 text-muted text-sm font-semibold'>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : "hover:text-white transition-colors"}>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? "text-primary" : "hover:text-white transition-colors"}>Shop</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary" : "hover:text-white transition-colors"}>About</NavLink>
        </div>

        {/* Right Section */}
        <div className='flex gap-2 items-center text-muted'>
          
          {/* User Profile */}
          <div className='flex bg-card px-1.5 md:px-3 py-1.5 border border-border items-center gap-2 rounded-xl text-[13px]'>
            <div className='bg-primary rounded-md px-1.5 py-0.5 font-heading font-semibold text-black flex items-center'>{user?.avatar || 'U'}</div>
            <div className='hidden md:block text-text-muted capitalize'>{user?.name}</div>
          </div>

          <div className='flex gap-2'>
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 cursor-pointer hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:text-white"
            >
              <ShoppingCart className='w-5 h-5' />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-bg text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Desktop Logout */}
            <button
              onClick={handleLogout}
              className="hidden md:flex p-2 cursor-pointer hover:bg-red-500/10 border border-white/10 rounded-xl transition-all text-white/60 hover:text-red-400"
            >
              <LogOut className='w-5 h-5' />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 cursor-pointer hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0a] px-4 py-6 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <NavLink 
            onClick={() => setIsMenuOpen(false)} 
            to="/" 
            className={({ isActive }) => `text-base py-3 px-2 rounded-lg ${isActive ? "bg-primary/10 text-primary" : "text-muted"}`}
          >
            Home
          </NavLink>
          <NavLink 
            onClick={() => setIsMenuOpen(false)} 
            to="/shop" 
            className={({ isActive }) => `text-base py-3 px-2 rounded-lg ${isActive ? "bg-primary/10 text-primary" : "text-muted"}`}
          >
            Shop
          </NavLink>
          <NavLink 
            onClick={() => setIsMenuOpen(false)} 
            to="/about" 
            className={({ isActive }) => `text-base py-3 px-2 rounded-lg ${isActive ? "bg-primary/10 text-primary" : "text-muted"}`}
          >
            About
          </NavLink>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 text-base py-3 px-2 mt-2 border-t border-white/5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;