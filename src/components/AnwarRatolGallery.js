import React from 'react';

const AnwarRatolGallery = ({ mainImage, thumbnailImages, badges }) => {
  return (
    <div className="lg:col-span-7 space-y-6">
      {/* Main Bento Image */}
      <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[650px]">
        <div className="col-span-4 row-span-1 md:col-span-3 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-xl">
          <img 
            alt="Anwar Ratol Mangoes" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={mainImage}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-label-sm font-label-lg shadow-sm">
              {badges && badges[0]}
            </span>
          </div>
        </div>
        <div className="hidden md:block col-span-1 row-span-1 rounded-3xl overflow-hidden shadow-lg border border-white">
          <img 
            alt="Mango Cross Section" 
            className="w-full h-full object-cover" 
            src={thumbnailImages[0]}
          />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 rounded-3xl overflow-hidden shadow-lg border border-white">
          <img 
            alt="Mango Orchard" 
            className="w-full h-full object-cover" 
            src={thumbnailImages[1]}
          />
        </div>
      </div>

      {/* Product Attributes Chips */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-outline-variant/30 shadow-sm">
          <span className="material-symbols-outlined text-primary">verified</span>
          <span className="text-label-lg font-label-lg">Certified Organic</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-outline-variant/30 shadow-sm">
          <span className="material-symbols-outlined text-primary">eco</span>
          <span className="text-label-lg font-label-lg">Fiberless Pulp</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-outline-variant/30 shadow-sm">
          <span className="material-symbols-outlined text-primary">location_on</span>
          <span className="text-label-lg font-label-lg">Origin: Ratol</span>
        </div>
      </div>
    </div>
  );
};

export default AnwarRatolGallery;
