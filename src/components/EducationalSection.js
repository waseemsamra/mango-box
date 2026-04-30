import React from 'react';

const EducationalSection = () => {
  return (
    <section className="mt-24 bg-surface-container rounded-[2rem] p-8 md:p-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Quality & Craftsmanship</span>
        <h2 className="font-display text-on-surface mb-6">What Makes Our Mangoes World-Renowned?</h2>
        <p className="font-body-lg text-on-surface-variant">The unique confluence of Pakistan's rich alluvial soil, scorching summer heat, and ancient irrigation techniques creates the perfect conditions for the world's most flavorful mangoes.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white/60 backdrop-blur p-8 rounded-2xl border border-white/40">
          <div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary">verified</span>
          </div>
          <h3 className="font-headline-md mb-3">Export Grade</h3>
          <p className="text-stone-500 text-sm leading-relaxed">Hand-selected for perfect size, weight, and blemish-free skin. These are hot-water treated and packed to meet international safety standards.</p>
        </div>
        <div className="bg-white/60 backdrop-blur p-8 rounded-2xl border border-white/40">
          <div className="w-12 h-12 bg-secondary-container/20 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-secondary">eco</span>
          </div>
          <h3 className="font-headline-md mb-3">Organic Certified</h3>
          <p className="text-stone-500 text-sm leading-relaxed">Grown without synthetic pesticides or fertilizers. Our organic mangoes rely on natural composting and traditional farming wisdom.</p>
        </div>
        <div className="bg-white/60 backdrop-blur p-8 rounded-2xl border border-white/40">
          <div className="w-12 h-12 bg-tertiary-container/20 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-tertiary">diamond</span>
          </div>
          <h3 className="font-headline-md mb-3">Premium Retail</h3>
          <p className="text-stone-500 text-sm leading-relaxed">The best of the local harvest. Perfectly ripe fruits intended for immediate consumption, offering the most authentic taste profile.</p>
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
