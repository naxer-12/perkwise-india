import React from 'react';
import {
  CreditCard,
  Landmark,
  Building2,
  ShoppingBag,
  Zap,
  Fuel,
  Plane,
  HeartPulse,
  Film,
  ShieldCheck,
  Laptop,
  Coins
} from 'lucide-react';
import type { LifeCategory } from '../types';

interface CategoryIconProps {
  category: LifeCategory | string;
  className?: string;
  animateOnHover?: boolean;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  className = 'w-3.5 h-3.5',
  animateOnHover = true
}) => {
  const animClass = animateOnHover ? 'transition-transform duration-200 ease-out' : '';

  switch (category) {
    case 'credit-cards':
      return (
        <CreditCard 
          className={`${className} ${animClass} group-hover:scale-110 group-hover:-rotate-3`} 
        />
      );
    case 'debit-cards':
      return (
        <Landmark 
          className={`${className} ${animClass} group-hover:scale-110 group-hover:-translate-y-0.5`} 
        />
      );
    case 'hotel-loyalty':
      return (
        <Building2 
          className={`${className} ${animClass} group-hover:scale-110 group-hover:-translate-y-0.5`} 
        />
      );
    case 'grocery-food':
      return (
        <ShoppingBag 
          className={`${className} ${animClass} group-hover:scale-110 group-hover:rotate-6`} 
        />
      );
    case 'utilities-bills':
      return (
        <Zap 
          className={`${className} ${animClass} group-hover:scale-125 group-hover:text-amber-500`} 
        />
      );
    case 'fuel-transit':
      return (
        <Fuel 
          className={`${className} ${animClass} group-hover:scale-110 group-hover:-rotate-6`} 
        />
      );
    case 'travel-railways':
      return (
        <Plane 
          className={`${className} ${animClass} group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:-rotate-6`} 
        />
      );
    case 'health-wellness':
      return (
        <HeartPulse 
          className={`${className} ${animClass} group-hover:scale-115 text-rose-600 animate-pulse-subtle`} 
        />
      );
    case 'entertainment-ott':
      return (
        <Film 
          className={`${className} ${animClass} group-hover:scale-110 group-hover:rotate-6`} 
        />
      );
    case 'govt-schemes':
      return (
        <ShieldCheck 
          className={`${className} ${animClass} group-hover:scale-110 text-emerald-600`} 
        />
      );
    case 'workspace-hardware':
      return (
        <Laptop 
          className={`${className} ${animClass} group-hover:scale-110 group-hover:-translate-y-0.5`} 
        />
      );
    default:
      return (
        <Coins 
          className={`${className} ${animClass} group-hover:scale-110`} 
        />
      );
  }
};
