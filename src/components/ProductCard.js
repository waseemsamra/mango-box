import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ 
  name, 
  quantity, 
  price, 
  location, 
  image, 
  badge, 
  badgeColor = 'bg-primary text-on-primary',
  roundedSize = 'rounded-[32px]',
  productId,
  slug
}) => {
  // Use slug if provided, otherwise generate from name
  const id = slug || productId || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return (
    <Link to={`/product/${id}`} className={`group bg-surface-container-lowest ${roundedSize} overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 block cursor-pointer`}>
      <div className="relative h-64 overflow-hidden">
        <img 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={image}
        />
        {badge && (
          <div className="absolute top-4 left-4 bg-primary text-on-primary text-label-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[14px]" data-icon="auto_awesome" data-weight="fill">auto_awesome</span>
            {badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-md text-on-surface">{name}</h3>
          <span className="text-label-sm text-outline bg-surface-container px-2 py-1 rounded-lg">{quantity}</span>
        </div>
        {location && (
          <div className="flex items-center gap-2 mb-6 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
            <span className="text-label-sm">{location}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-headline-md text-tertiary">{price}</span>
          <button 
            className="bg-primary text-on-primary px-6 py-3 rounded-2xl font-label-lg flex items-center gap-2 active:scale-95 transition-transform"
            onClick={(e) => e.preventDefault()} // Prevent navigation when clicking add button
          >
            <span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span>
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
