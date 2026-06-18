import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router'
import Hero from '../components/home/Hero'
import DIsplayCard from '../components/home/DIsplayCard'
import CategoryCard from '../components/home/CategoryCard'
import ProductCard from '../components/shop/ProductCard'
import { Package, Star, TagIcon, TrendingUp, ArrowRight, Loader2, Trophy } from 'lucide-react'
import { useCart } from '../components/context/CartContext'
import { getAllProducts } from '../api/ProductsApi'


const Home = () => {
  const { cartItems, subtotal } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAllProducts()
      .then(data => { if (!cancelled) setProducts(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const categoryData = useMemo(() => {
    const map = {};
    products.forEach(p => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }));
  }, [products]);

  const topRated = useMemo(() => {
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  }, [products]);

  const cardData = [
    {
      svg: <Package />,
      heroText: cartItems.length,
      text1: "Cart Items",
      text2: "In your bag",
      iconStyle: "bg-primary/10 text-primary"
    },
    {
      svg: <TrendingUp />,
      heroText: subtotal.toFixed(2),
      text1: "Cart Value",
      text2: "Ready to checkout",
      iconStyle: "bg-blue-500/10 text-blue-400"
    },
    {
      svg: <Star />,
      heroText: topRated.length || 9,
      text1: "Top Products",
      text2: "Highly rated",
      iconStyle: "bg-amber-500/10 text-amber-400"
    },
    {
      svg: <TagIcon />,
      heroText: categoryData.length || 6,
      text1: "Categories",
      text2: "To Explore",
      iconStyle: "bg-violet-500/10 text-violet-400"
    },
  ]


  return (
    <div>
      <Hero />
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
        {cardData.map((card, i) => <DIsplayCard key={i} card={card} />)}
      </div>

      {/* ── Shop By Categories ── */}
      <section className='mt-12'>
        {/* Section header */}
        <div className='flex items-end justify-between mb-6'>
          <div>
            <h2 className='font-heading font-bold text-2xl sm:text-3xl text-white'>
              Shop By Categories
            </h2>
            <p className='text-white/40 text-sm font-body mt-1'>
              Browse products by category
            </p>
          </div>
          <NavLink
            to='/shop'
            className='hidden sm:flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-buttonHover transition-colors'
          >
            View All <ArrowRight className='w-4 h-4' />
          </NavLink>
        </div>

        {/* Category grid */}
        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='w-6 h-6 text-primary animate-spin' />
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
            {categoryData.map(cat => (
              <CategoryCard key={cat.name} category={cat.name} count={cat.count} />
            ))}
          </div>
        )}

        {/* Mobile "View All" link */}
        <div className='sm:hidden mt-4 text-center'>
          <NavLink
            to='/shop'
            className='inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-buttonHover transition-colors'
          >
            View All Products <ArrowRight className='w-4 h-4' />
          </NavLink>
        </div>
      </section>

      {/* ── Top Rated Products ── */}
      <section className='mt-14 mb-4'>
        {/* Section header */}
        <div className='flex items-end justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center'>
              <Trophy className='w-5 h-5 text-amber-400' />
            </div>
            <div>
              <h2 className='font-heading font-bold text-2xl sm:text-3xl text-white'>
                Top Rated Products
              </h2>
              <p className='text-white/40 text-sm font-body mt-0.5'>
                Our highest rated picks, loved by shoppers
              </p>
            </div>
          </div>
          <NavLink
            to='/shop'
            className='hidden sm:flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-buttonHover transition-colors shrink-0'
          >
            See All <ArrowRight className='w-4 h-4' />
          </NavLink>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className='flex items-center justify-center py-16'>
            <Loader2 className='w-6 h-6 text-primary animate-spin' />
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
            {topRated.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Mobile "See All" link */}
        <div className='sm:hidden mt-4 text-center'>
          <NavLink
            to='/shop'
            className='inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-buttonHover transition-colors'
          >
            See All Products <ArrowRight className='w-4 h-4' />
          </NavLink>
        </div>
      </section>
    </div>
  )
}

export default Home
