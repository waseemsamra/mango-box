import React from 'react';

const LangraGallery = ({ mainImage, thumbnailImages, badges }) => {
  return (
    <div className="lg:col-span-7 space-y-gutter">
      <div className="relative bg-surface-container-low rounded-[40px] overflow-hidden aspect-[4/5] md:aspect-square flex items-center justify-center shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/20 to-transparent"></div>
        <img 
          alt="Langra Mango" 
          className="w-4/5 h-4/5 object-contain z-10 drop-shadow-2xl" 
          src={mainImage}
        />
        <div className="absolute bottom-8 left-8 z-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full text-primary font-label-lg shadow-sm">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            {badges && badges[0]}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {thumbnailImages.map((image, index) => (
          <div 
            key={index}
            className="aspect-square bg-surface-container-highest rounded-3xl overflow-hidden hover:ring-2 ring-primary transition-all cursor-pointer"
          >
            <img 
              alt={`Mango detail ${index + 1}`} 
              className="w-full h-full object-cover" 
              src={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LangraGallery;
