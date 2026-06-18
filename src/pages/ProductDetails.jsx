import React, { useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import {
    ChevronLeft,
    ChevronRight,
    Star,
    ShoppingCart,
    Heart,
    Truck,
    ShieldCheck,
    RotateCcw,
} from 'lucide-react';
import { useCart } from '../components/context/CartContext';
import ProductCard from '../components/shop/ProductCard';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { product, related } = useLoaderData();
    const { addToCart, cartItems, updateQuantity } = useCart();

    const productInCart = cartItems.find((p) => p.id === product.id);
    const isInCart = !!productInCart;
    const activeStars = Math.round(product.rating);

    if (!product) return <div className="text-white p-20">Product not found...</div>;

    return (
        <div className="text-white font-main pb-16">

            <nav className="flex items-center gap-2 text-muted text-xs mb-6 overflow-hidden whitespace-nowrap">
                <Link to="/shop" className="flex items-center gap-1 hover:text-white transition-colors">
                    <ChevronLeft size={14} /> Products
                </Link>
                <span>/</span>
                <span className="capitalize">{product.category}</span>
                <span>/</span>
                <span className="text-white truncate max-w-50">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                <div className="bg-white rounded-3xl overflow-hidden flex items-center justify-center p-8 h-80 lg:h-100">
                    <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.title}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="flex flex-col gap-4">

                    <span className="self-start bg-primary/10 text-primary px-3 py-1 rounded-xl border border-primary/20 text-[10px] font-bold capitalize tracking-wider">
                        {product.category}
                    </span>

                    <h1 className="font-heading text-2xl md:text-3xl font-bold leading-snug">
                        {product.title}
                    </h1>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={15}
                                    fill={i < activeStars ? '#c8f400' : 'none'}
                                    className={i < activeStars ? 'text-primary' : 'text-white/20'}
                                />
                            ))}
                        </div>
                        <span className="text-white font-semibold text-sm">{product.rating}</span>
                        {product.reviews?.length > 0 && (
                            <span className="text-muted text-sm">{product.reviews.length * 42} reviews</span>
                        )}
                    </div>

                    <div className="border-y border-border/30 py-3">
                        <span className="text-primary font-heading text-4xl font-bold tracking-tight">
                            ${product.price}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="ml-3 text-sm text-white/30 line-through">
                                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                            </span>
                        )}
                    </div>

                    <p className="text-muted leading-relaxed text-sm">
                        {product.description || 'High-quality product curated specifically for the SkyMart collection.'}
                    </p>

                    <div className="flex gap-3 mt-1">
                        {isInCart ? (
                            <div className="flex-1 border border-primary/40 font-bold py-3.5 rounded-2xl flex items-center justify-between px-8 transition-all">
                                <ShoppingCart size={20} className="text-primary" />
                                <div className="flex items-center gap-5">
                                    <button
                                        onClick={() => updateQuantity(product.id, -1)}
                                        className="px-2.5 bg-primary rounded-md text-black font-bold active:scale-90 transition-all hover:bg-buttonHover cursor-pointer"
                                    >
                                        −
                                    </button>
                                    <span>{productInCart.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(product.id, 1)}
                                        className="px-2.5 bg-primary rounded-md text-black font-bold active:scale-90 transition-all hover:bg-buttonHover cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-primary hover:bg-buttonHover text-black font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                            >
                                <ShoppingCart size={18} /> Add to Cart
                            </button>
                        )}
                        <button className="p-3.5 border border-border/50 rounded-2xl hover:bg-white/5 transition-colors text-white/40 hover:text-red-400">
                            <Heart size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-1">
                        <FeatureBox icon={<Truck size={16} />}       label="Free Delivery" sub="On orders $50+" />
                        <FeatureBox icon={<ShieldCheck size={16} />} label="Secure Pay"    sub="256-bit SSL" />
                        <FeatureBox icon={<RotateCcw size={16} />}   label="Easy Returns"  sub="30-day policy" />
                    </div>

                    <div className="flex gap-3 mt-1">
                        <button
                            onClick={() => navigate(`/shop/${product.id - 1}`)}
                            disabled={product.id <= 1}
                            className="flex-1 bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed text-white hover:text-primary py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all text-sm"
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>
                        <button
                            onClick={() => navigate(`/shop/${product.id + 1}`)}
                            className="flex-1 bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 text-white hover:text-primary py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all text-sm"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Related Products ── */}
            {related?.length > 0 && (
                <section className="mt-16">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-heading font-bold text-2xl">Related Products</h2>
                            <p className="text-muted text-sm mt-1 capitalize">More from {product.category}</p>
                        </div>
                        <Link
                            to="/shop"
                            className="text-primary text-sm font-semibold hover:text-buttonHover transition-colors flex items-center gap-1"
                        >
                            View all <ChevronRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10  md:px-5 ">
                        {related.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

const FeatureBox = ({ icon, label, sub }) => (
    <div className="border border-border/30 rounded-2xl p-3 flex flex-col items-center text-center gap-1.5">
        <div className="text-primary">{icon}</div>
        <span className="text-[10px] font-bold text-white whitespace-nowrap">{label}</span>
        <span className="text-[9px] text-muted whitespace-nowrap">{sub}</span>
    </div>
);

export default ProductDetails;