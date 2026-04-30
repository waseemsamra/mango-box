import React from 'react';
import { Link } from 'react-router-dom';

const MangoVarietyCard = ({ 
  name, 
  price, 
  description, 
  harvestSeason, 
  image, 
  badges = [],
  productId
}) => {
  // Generate product ID from name if not provided
  const id = productId || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return (
    <Link to={`/product/${id}`} className="mango-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-50 flex flex-col block cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img 
          className="mango-image w-full h-full object-cover transition-transform duration-500" 
          alt={name}
          src={image}
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span 
              key={index}
              className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                badge.type === 'export' ? 'bg-primary text-white' :
                badge.type === 'organic' ? 'bg-secondary-container text-on-secondary-container' :
                badge.type === 'premium' ? 'bg-tertiary-container text-on-tertiary-container' :
                'bg-primary text-white'
              }`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-md text-on-surface">{name}</h3>
          <span className="font-headline-md text-secondary">${price}</span>
        </div>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 text-stone-400">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span className="text-label-sm">{harvestSeason}</span>
          </div>
          <button 
            className="bg-primary text-white px-4 py-2 rounded-xl font-label-lg hover:bg-primary-container transition-all flex items-center gap-2"
            onClick={(e) => e.preventDefault()} // Prevent navigation when clicking add button
          >
            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MangoVarietyCard;
