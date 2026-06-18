import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';

const ProductCard = ({ product }) => {
    const { title, price, category, rating } = product;
    const { addToCart, cartItems, updateQuantity } = useCart()

    // Logic: Round the decimal rating to the nearest whole number (e.g., 4.56 -> 5)
    const activeStars = Math.round(rating);

    const productInCart = cartItems.find((p) => p.id == product.id)
    const isInCart = (!!productInCart)

    const navigate = useNavigate();
 
    return (
        <div
            onClick={() => navigate(`/shop/${product.id}`)}
            className="product-card flex flex-col group bg-[#111] border border-white/5 rounded-2xl transition-all duration-400 hover:border-primary/50 hover:shadow-primary/50 shadow-sm cursor-pointer ">
            <div className='relative aspect-square bg-gray-200 overflow-hidden rounded-t-2xl py-5 px-2'>
                <img
                    src={product.images[0] }
                    className='w-full h-full object-contain  group-hover:scale-110 transition-transform duration-500'
                    alt={title}
                />
                <span className='absolute top-3 left-3 badge bg-black/60 text-white/80 backdrop-blur-sm capitalize text-[10px] rounded-lg px-3 py-0.5'>
                    {category}
                </span>
            </div>

            <div className="p-4 flex flex-col flex-1 gap-2">
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-body">{category}</p>
                <h3 className="font-body font-medium text-sm leading-snug line-clamp-2 flex-1">{title}</h3>

                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">

                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                size={12}
                                // Fill the star if index is less than our rating
                                fill={index < activeStars ? "#fbbf24" : "none"}
                                className={index < activeStars ? "text-amber-400" : "text-white/20"}
                            />
                        ))}
                    </div>
                    {/* Displaying actual numeric rating for clarity */}
                    <span className="text-white/30 text-[10px]">({rating})</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/50 gap-2">
                    <span className="font-heading font-bold text-primary text-sm md:text-lg">${price}</span>
                    {
                        isInCart ?
                            (<div className='gap-2 md:gap-5  flex bg-white/5 px-2 md:px-4 py-2 rounded-xl'>
                                <p
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        updateQuantity(product.id, -1)
                                    }}
                                    className='px-1 md:px-2 bg-primary rounded-sm text-black font-bold active:scale-90 transition-all duration-200 hover:bg-buttonHover '>
                                    -
                                </p>

                                <p>{productInCart.quantity} </p>

                                <p
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        updateQuantity(product.id, 1)
                                    }}
                                    className='px-1 md:px-2 bg-primary rounded-sm text-black font-bold active:scale-90 transition-all duration-200 hover:bg-buttonHover '>
                                    +
                                </p>
                            </div>)
                            :
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    addToCart(product);
                                }}
                                className="flex items-center gap-1.5 p-1 md:px-3 md:py-1.5 rounded-xl text-xs font-semibold text-black cursor-pointer bg-primary hover:bg-buttonHover ">
                                <ShoppingCart size={14} />
                                Add
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCard;