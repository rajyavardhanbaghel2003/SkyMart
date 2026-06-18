import { PartyPopper } from 'lucide-react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize from localStorage or empty array
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('skymart_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Persist to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('skymart_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                toast.success('Quantity updated', { duration: 2000 });
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            toast.success('Added to cart', { duration: 2000 });
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        toast.error('Removed from cart', { duration: 2000 });
    };

    const updateQuantity = (id, delta) => {
        setCartItems((prev) => {
            return prev
                .map((item) => {
                    if (item.id === id) {
                        const newQty = item.quantity + delta;
                        
                        return { ...item, quantity: newQty };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0);
        });
    };

    const clearCart = () => {
        if (cartItems.length > 0) {
            toast('Cart cleared', { icon: '🗑️', duration: 2000 });
        }
        setCartItems([]);
    };

    const checkout = () => {
        if (cartItems.length > 0) {
            toast.success('Order Placed', { icon:<PartyPopper/> , duration: 2000 });
        }
        setCartItems([]);
    }; 


    const subtotal = (cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0));

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart, updateQuantity, clearCart, subtotal,
            isCartOpen, setIsCartOpen, checkout
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);