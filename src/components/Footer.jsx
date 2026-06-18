import React from 'react';
import { NavLink } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-bg border-t border-border/30 pt-16 pb-8 px-6 font-main">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

        <div className="col-span-1 md:col-span-2">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4 italic">SkyMart</h2>
          <p className="text-text-muted max-w-sm leading-relaxed">
            A next-generation e-commerce platform built to make online shopping fast, fair, and enjoyable for everyone.
          </p>
        </div>

        <div>
          <h4 className="text-text-main font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-text-muted text-sm text-muted">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : "hover:text-white transition-colors"}>Home</NavLink></li>

            <li><NavLink to="/shop" className={({ isActive }) => isActive ? "text-primary" : "hover:text-white transition-colors"}>Shop</NavLink></li>

            <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-primary" : "hover:text-white transition-colors"}>About</NavLink></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-main font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-text-muted text-sm">
            <li className="hover:text-primary cursor-pointer">Shipping Policy</li>
            <li className="hover:text-primary cursor-pointer">Terms of Service</li>
            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border/10 flex flex-col md:row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-text-muted">
        <p>© 2025 SkyMart. All rights reserved.</p>
        <p className="opacity-50 italic">Built with React + Redux + TanStack Query </p>
      </div>
    </footer>
  );
};

export default Footer;