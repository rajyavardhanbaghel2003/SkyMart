import React from 'react';
import { NavLink } from 'react-router';
import {
  Footprints,
  Watch,
  Smartphone,
  Bike,
  Sparkles,
  MonitorSmartphone,
  ShoppingBag,
} from 'lucide-react';

// Map each category slug to an icon + gradient + display name
const CATEGORY_META = {
  'mens-shoes': {
    icon: Footprints,
    label: 'Men\'s Shoes',
    gradient: 'from-orange-500/20 to-orange-500/5',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    hoverBorder: 'hover:border-orange-400/50',
    glow: 'group-hover:shadow-orange-500/10',
  },
  'mens-watches': {
    icon: Watch,
    label: 'Men\'s Watches',
    gradient: 'from-blue-500/20 to-blue-500/5',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    hoverBorder: 'hover:border-blue-400/50',
    glow: 'group-hover:shadow-blue-500/10',
  },
  'mobile-accessories': {
    icon: MonitorSmartphone,
    label: 'Mobile Accessories',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-400/50',
    glow: 'group-hover:shadow-emerald-500/10',
  },
  'motorcycle': {
    icon: Bike,
    label: 'Motorcycle',
    gradient: 'from-red-500/20 to-red-500/5',
    iconColor: 'text-red-400',
    borderColor: 'border-red-500/20',
    hoverBorder: 'hover:border-red-400/50',
    glow: 'group-hover:shadow-red-500/10',
  },
  'skin-care': {
    icon: Sparkles,
    label: 'Skin Care',
    gradient: 'from-pink-500/20 to-pink-500/5',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/20',
    hoverBorder: 'hover:border-pink-400/50',
    glow: 'group-hover:shadow-pink-500/10',
  },
  'smartphones': {
    icon: Smartphone,
    label: 'Smartphones',
    gradient: 'from-violet-500/20 to-violet-500/5',
    iconColor: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    hoverBorder: 'hover:border-violet-400/50',
    glow: 'group-hover:shadow-violet-500/10',
  },
};

// Fallback for any unknown category
const DEFAULT_META = {
  icon: ShoppingBag,
  gradient: 'from-primary/20 to-primary/5',
  iconColor: 'text-primary',
  borderColor: 'border-primary/20',
  hoverBorder: 'hover:border-primary/50',
  glow: 'group-hover:shadow-primary/10',
};

const CategoryCard = ({ category, count }) => {
  const meta = CATEGORY_META[category] || {
    ...DEFAULT_META,
    label: category.replace(/-/g, ' '),
  };
  const Icon = meta.icon || DEFAULT_META.icon;

  return (
    <NavLink
      to={`/shop?category=${encodeURIComponent(category)}`}
      className={`group relative overflow-hidden rounded-2xl bg-linear-to-br ${meta.gradient}
        border ${meta.borderColor} ${meta.hoverBorder}
        p-5 flex flex-col items-center justify-center gap-3 text-center
        transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${meta.glow}
        cursor-pointer`}
    >
      {/* Subtle glow circle behind icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`w-24 h-24 rounded-full blur-2xl ${meta.iconColor} opacity-20`} />
      </div>

      {/* Icon */}
      <div
        className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center
          bg-white/5 border border-white/10 ${meta.iconColor}
          group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Label */}
      <h3 className="relative z-10 font-heading font-bold text-sm text-white capitalize leading-tight">
        {meta.label}
      </h3>

      {/* Product count */}
      <span className="relative z-10 text-white/35 text-xs font-body">
        {count} {count === 1 ? 'product' : 'products'}
      </span>

      {/* Arrow indicator on hover */}
      <span
        className="absolute top-3 right-3 text-white/0 group-hover:text-white/40
          transition-all duration-300 text-sm"
      >
        →
      </span>
    </NavLink>
  );
};

export default CategoryCard;
