import React, { useState } from 'react';

const BoutiqueBoxSelection = ({ boxSizes, boxLabels, priceRange }) => {
  const [selectedSize, setSelectedSize] = useState(0);

  return (
    <div className="space-y-4">
      <p className="text-label-lg font-label-lg text-on-surface">Select Boutique Box Size</p>
      <div className="grid grid-cols-2 gap-4">
        {boxSizes.map((size, index) => (
          <label key={size} className="relative cursor-pointer group">
            <input 
              type="radio" 
              name="size" 
              className="peer sr-only" 
              checked={selectedSize === index}
              onChange={() => setSelectedSize(index)}
            />
            <div className={`p-4 border-2 border-outline-variant rounded-2xl transition-all peer-checked:border-primary peer-checked:bg-white group-hover:bg-white/50`}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-headline-md text-on-surface">{size}</span>
                <span 
                  className="material-symbols-outlined text-primary opacity-0 peer-checked:opacity-100" 
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <p className="text-label-sm text-on-surface-variant">{boxLabels[index]}</p>
              <p className="text-headline-md font-bold text-secondary mt-2">
                {priceRange.split(' - ')[index]}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BoutiqueBoxSelection;
