import React from 'react';

const FreshnessIndicator = () => {
  return (
    <section className="mt-section-padding bg-on-primary-fixed text-on-primary rounded-[48px] p-8 md:p-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px]"></div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <span className="material-symbols-outlined text-primary-fixed text-4xl">local_shipping</span>
          <h4 className="font-headline-md">Same Day Harvest</h4>
          <p className="text-on-primary-fixed-variant opacity-80">Picked at dawn, shipped by noon. Arrives at your door within 24 hours of harvest.</p>
        </div>
        <div className="space-y-2">
          <span className="material-symbols-outlined text-primary-fixed text-4xl">inventory_2</span>
          <h4 className="font-headline-md">Premium Crates</h4>
          <p className="text-on-primary-fixed-variant opacity-80">Our 5kg custom wood crates use sustainable padding to prevent any bruising during transit.</p>
        </div>
        <div className="space-y-2">
          <span className="material-symbols-outlined text-primary-fixed text-4xl">support_agent</span>
          <h4 className="font-headline-md">Quality Guarantee</h4>
          <p className="text-on-primary-fixed-variant opacity-80">Not satisfied with the freshness? We offer instant replacement or refund, no questions asked.</p>
        </div>
      </div>
    </section>
  );
};

export default FreshnessIndicator;
