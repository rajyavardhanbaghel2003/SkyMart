import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';

const CartSidebar = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, isCartOpen, setIsCartOpen, checkout } = useCart();    
 
    const navigate = useNavigate()

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-100 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />

            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-bg border-l border-border z-101 transition-transform duration-300 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col font-main`}>

                <div className="p-4 border-b border-border/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl  flex items-center justify-center text-primary">
                            <ShoppingBag size={20} />
                        </div>
                        <div className='flex items-center gap-5'>
                            <h2 className="text-xl font-bold font-heading text-white">Cart</h2>
                            <p className="text-primary text-[10px] tracking-wide bg-primary/20 font-bold rounded-4xl px-2 py-0.5 ">{cartItems.length} Items</p>
                        </div>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-muted transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-card border border-border/50 rounded-2xl px-5 py-2 justify-center items-center flex gap-4">
                            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0">
                                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain p-2" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="text-white font-heading font-medium text-sm line-clamp-1">{item.title}</h3>
                                    <p className="text-primary font-bold font-heading mt-1">${item.price}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center bg-black/40 rounded-lg border border-border/20 p-1">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-muted hover:text-white"><Minus size={14} /></button>
                                        <span className="px-3 text-sm text-white font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-muted hover:text-white"><Plus size={14} /></button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {cartItems.length === 0 && (
                        <div className="text-center py-20 flex flex-col justify-center items-center">
                            <p className=' text-muted'>Cart is empty</p>
                            <p className='text-muted/60'>Go shop something cool!</p>
                            <button
                                onClick={() => {
                                    navigate("/shop")
                                    setIsCartOpen(false)
                                }}
                                className='bg-primary text-bg py-2  font-semibold px-4 rounded-xl my-4 flex cursor-pointer'>Browse Products
                                <ArrowRight />
                            </button>
                        </div>
                    )}
                </div>

                <div className="px-8 py-3 border-t border-border/30 bg-card/50 backdrop-blur-md">
                    <div className="flex justify-between items-end mb-6">
                        <span className="text-muted text-sm">Total</span>
                        <span className="text-2xl font-bold font-heading text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <button onClick={checkout} className="w-full bg-primary hover:bg-buttonHover text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                        Checkout <ArrowRight className="" size={18} />
                    </button>
                    <button onClick={clearCart} className="w-full text-muted text-xs mt-4 uppercase tracking-[0.2em] hover:text-white transition-colors">
                        Clear cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;