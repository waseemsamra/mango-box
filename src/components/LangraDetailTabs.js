import React, { useState } from 'react';

const LangraDetailTabs = ({ originStory, storageTips }) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <section className="mt-section-padding space-y-stack-lg">
      <div className="flex border-b border-outline-variant">
        <button 
          className={`px-8 py-4 border-b-2 ${activeTab === 'profile' ? 'border-primary font-label-lg text-primary' : 'border-transparent font-label-lg text-on-surface-variant hover:text-primary'} transition-colors`}
          onClick={() => setActiveTab('profile')}
        >
          The Profile
        </button>
        <button 
          className={`px-8 py-4 border-b-2 ${activeTab === 'farm' ? 'border-primary font-label-lg text-primary' : 'border-transparent font-label-lg text-on-surface-variant hover:text-primary'} transition-colors`}
          onClick={() => setActiveTab('farm')}
        >
          Farm Story
        </button>
        <button 
          className={`px-8 py-4 border-b-2 ${activeTab === 'care' ? 'border-primary font-label-lg text-primary' : 'border-transparent font-label-lg text-on-surface-variant hover:text-primary'} transition-colors`}
          onClick={() => setActiveTab('care')}
        >
          Care & Storage
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
          <div className="space-y-stack-md">
            <h3 className="font-headline-md text-primary">Why 'The Green Gem'?</h3>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              The Langra mango is a masterpiece of Pakistani agriculture. Its name, legendary in Punjab, belongs to a fruit that defies typical ripening signs. While other mangoes turn golden yellow, the Langra remains a vibrant, deep green even when it reaches peak sweetness.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <div>
                  <p className="font-label-lg">Fiber-less Pulp</p>
                  <p className="text-sm text-on-surface-variant">Unrivaled buttery texture that melts on the palate.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <div>
                  <p className="font-label-lg">Tantalizing Aroma</p>
                  <p className="text-sm text-on-surface-variant">Fills the room with a strong, fruity scent that signals ripeness.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative p-8">
            <div className="absolute inset-0 bg-secondary/5 organic-shape -rotate-6"></div>
            <img 
              alt="Sliced Langra Mango" 
              className="relative z-10 rounded-3xl shadow-xl w-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL7s9NDWiyLAo63O_C4MhI_hfq-xFwH7YVu7Mt5kjTdFQzH-VyNqxcefj1X2WRoRt4ByOPbwYBnByWXGdLkbXY8lP1G3GrNNXh-1foN9nPyvdXocDuqoCP7657-VCpvaSY3YI8vPUpRq0G2mXw0p7l_qOsgBc9F1sBw3ubg7R-ZuVAsV9a8-M9WBWk2Vemwzp0UWzhPxoilJPgngkWMJnKl5RxDi0Yi2UdfNKk9YRfTy41GpsscIIENh9lDlyFkMmAjLadTLaYjOMQ"
            />
          </div>
        </div>
      )}

      {activeTab === 'farm' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-container p-8 rounded-3xl">
            <h3 className="font-headline-lg mb-4">Farm Story</h3>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {originStory}
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">agriculture</span>
                <p className="font-label-lg">Traditional Farming</p>
                <p className="text-label-sm text-on-surface-variant">Generations of expertise</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">water_drop</span>
                <p className="font-label-lg">Natural Irrigation</p>
                <p className="text-label-sm text-on-surface-variant">Pure water sources</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">eco</span>
                <p className="font-label-lg">Sustainable</p>
                <p className="text-label-sm text-on-surface-variant">Eco-friendly practices</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'care' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-container p-8 rounded-3xl">
            <h3 className="font-headline-lg mb-4">Care & Storage</h3>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {storageTips}
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">thermostat</span>
                <p className="font-label-lg">Room Temperature</p>
                <p className="text-label-sm text-on-surface-variant">Store at room temp</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">touch_app</span>
                <p className="font-label-lg">Test Ripeness</p>
                <p className="text-label-sm text-on-surface-variant">Gentle pressure test</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">schedule</span>
                <p className="font-label-lg">5-7 Days</p>
                <p className="text-label-sm text-on-surface-variant">Optimal freshness window</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LangraDetailTabs;
