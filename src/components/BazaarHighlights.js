import React from 'react';

const BazaarHighlights = () => {
  return (
    <section className="mt-section-padding">
      <h2 className="font-display text-headline-lg mb-8">Bazaar Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-8 rounded-3xl bg-secondary-fixed/30 border border-secondary-fixed space-y-4">
          <span className="material-symbols-outlined text-secondary text-4xl">eco</span>
          <h4 className="font-headline-md">100% Organic</h4>
          <p className="text-on-surface-variant font-body-md">Sourced from farms following traditional rain-fed and natural ripening methods.</p>
        </div>
        <div className="p-8 rounded-3xl bg-surface-container-highest border border-outline-variant space-y-4">
          <span className="material-symbols-outlined text-primary text-4xl">inventory_2</span>
          <h4 className="font-headline-md">Export Quality</h4>
          <p className="text-on-surface-variant font-body-md">Hand-picked, sized, and polished for the highest global standards.</p>
        </div>
        <div className="p-8 rounded-3xl bg-tertiary-fixed/30 border border-tertiary-fixed space-y-4 md:col-span-2 relative overflow-hidden">
          <div className="relative z-10">
            <span className="material-symbols-outlined text-tertiary text-4xl">local_florist</span>
            <h4 className="font-headline-md">The Aroma Standard</h4>
            <p className="text-on-surface-variant font-body-md max-w-sm">The White Chaunsa's unique fragrance can fill an entire room within minutes of unboxing. It's not just a fruit; it's a sensory journey.</p>
          </div>
          <img 
            alt="Background decoration" 
            className="absolute right-[-20%] bottom-[-20%] w-64 h-64 object-contain opacity-20 rotate-12" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuqlhFjpAPeUWYRA4A5lXhPwdLrUaxNxO9oH4O_64EHiiFHYsU9YCUtaW1z4QTC6UBjDSoYEmwREidOEaFYutq4aaknoqbEmzu_PIsYkHfBQShlEyWH4bM96gEG_OLCLL4uwUQrqAIV84WJDgyzwuLzN0ss7WVQRa59u317C3eUIL0GVV0hW2QqC0-W9m1U7y4RYL6IXgpv9-4ACXcrurbcGjqcHGsaXQo6huH8G2zkOlgGSg9Jz3AJR0HINnK6VWAuOGf3Tf5GSb0"
          />
        </div>
      </div>
    </section>
  );
};

export default BazaarHighlights;
