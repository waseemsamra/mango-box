import React from 'react';

const PromoCard = ({ 
  title, 
  description, 
  buttonText, 
  gradient = 'from-green-600 to-green-800',
  roundedSize = 'rounded-[32px]'
}) => {
  return (
    <div className={`relative bg-gradient-to-br ${gradient} ${roundedSize} overflow-hidden p-8 flex flex-col justify-end min-h-[400px]`}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
      <div className="relative z-10">
        <span className="bg-white/20 text-white text-label-sm px-3 py-1 rounded-full mb-4 inline-block">Flash Deal</span>
        <h3 className="text-display text-white mb-4">{title}</h3>
        <p className="text-body-lg text-white/80 mb-8">{description}</p>
        <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-shadow">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
