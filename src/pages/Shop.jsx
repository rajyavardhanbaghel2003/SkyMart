import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import { useLoaderData, useSearchParams } from 'react-router';

// All unique categories derived at runtime from the loaded products
const SORT_OPTIONS = [
    { value: 'default',    label: 'Featured' },
    { value: 'price-asc',  label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating-desc',label: 'Top Rated' },
    { value: 'rating-asc', label: 'Lowest Rated' },
];

const Shop = () => {
    const products = useLoaderData();
    const [searchParams] = useSearchParams();

    const [query, setQuery]       = useState('');
    const [category, setCategory] = useState(searchParams.get('category') || 'all');
    const [sort, setSort]         = useState('default');

    const categories = useMemo(() => {
        const unique = [...new Set(products.map(p => p.category))].sort();
        return unique;
    }, [products]);

    // Filter + sort — runs only when query/category/sort/products change
    const filtered = useMemo(() => {
        let list = [...products];

        // 1. Search (title + category)
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        // 2. Category filter
        if (category !== 'all') {
            list = list.filter(p => p.category === category);
        }

        // 3. Sort
        switch (sort) {
            case 'price-asc':
                list.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                list.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                list.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating-asc':
                list.sort((a, b) => a.rating - b.rating);
                break;
            default:
                break; // keep original order
        }

        return list;
    }, [products, query, category, sort]);

    const hasActiveFilters = query || category !== 'all' || sort !== 'default';

    const clearFilters = () => {
        setQuery('');
        setCategory('all');
        setSort('default');
    };

    return (
        <div>
            {/* Header */}
            <div className='mb-8'>
                <h1 className='font-heading font-bold text-3xl sm:text-4xl mb-2'>
                    All Products
                </h1>
                <p className='text-white/40 font-body text-sm'>
                    {filtered.length === products.length
                        ? `${products.length} Products found`
                        : `${filtered.length} of ${products.length} products`}
                </p>
            </div>

            {/* Filters bar */}
            <div className='bg-[#111] border border-white/80 rounded-2xl p-4 mb-6'>
                <div className='flex flex-col sm:flex-row gap-3'>

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none w-4' />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="rounded-2xl text-[14px] px-4 border border-[#ffffff1a] bg-[#1d1d1d] text-white pl-10 pr-8 h-10 w-full focus:outline-2 outline-primary/50 transition-all duration-200"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors'
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Category */}
                    <div className="relative">
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="h-10 pr-8 appearance-none cursor-pointer min-w-44 rounded-2xl text-[14px] px-4 border border-[#ffffff1a] bg-[#1d1d1d] text-white focus:outline-2 outline-primary/50 transition-all duration-200 w-full"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat} className='capitalize'>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none w-3.5' />
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="h-10 pr-8 appearance-none cursor-pointer min-w-44 rounded-2xl text-[14px] px-4 border border-[#ffffff1a] bg-[#1d1d1d] text-white focus:outline-2 outline-primary/50 transition-all duration-200 w-full"
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none w-3.5' />
                    </div>

                    {/* Clear filters pill — only visible when something is active */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className='flex items-center gap-1.5 px-4 h-10 rounded-2xl border border-primary/40 text-primary text-[13px] font-semibold hover:bg-primary/10 transition-all shrink-0'
                        >
                            <X size={13} />
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Results */}
            {filtered.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                    {filtered.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-24 text-center'>
                    <p className='text-4xl mb-4'>🔍</p>
                    <h3 className='font-heading font-bold text-xl text-white mb-2'>No products found</h3>
                    <p className='text-white/40 text-sm mb-6'>
                        No results for <span className='text-white'>"{query}"</span>
                        {category !== 'all' && <> in <span className='text-primary capitalize'>{category}</span></>}.
                    </p>
                    <button
                        onClick={clearFilters}
                        className='px-6 py-2.5 bg-primary text-black font-bold rounded-2xl text-sm hover:bg-buttonHover transition-all'
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Shop;
