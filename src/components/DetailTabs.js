import React, { useState } from 'react';

const DetailTabs = ({ originStory, storageTips, reviews, sugarLevel, pesticideFree }) => {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section className="mt-24 space-y-12">
      <div className="flex border-b border-outline-variant">
        <button 
          className={`px-8 py-4 border-b-2 ${activeTab === 'story' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'} font-label-lg transition-colors`}
          onClick={() => setActiveTab('story')}
        >
          Story & Origin
        </button>
        <button 
          className={`px-8 py-4 border-b-2 ${activeTab === 'storage' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'} font-label-lg transition-colors`}
          onClick={() => setActiveTab('storage')}
        >
          Storage Tips
        </button>
        <button 
          className={`px-8 py-4 border-b-2 ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'} font-label-lg transition-colors`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({reviews})
        </button>
      </div>

      {activeTab === 'story' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-headline-lg text-headline-lg">From the Heart of Ratol</h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {originStory}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container p-4 rounded-2xl">
                <p className="text-secondary font-bold text-headline-md">{sugarLevel}</p>
                <p className="text-label-sm">Natural Sugar Level</p>
              </div>
              <div className="bg-surface-container p-4 rounded-2xl">
                <p className="text-secondary font-bold text-headline-md">{pesticideFree}</p>
                <p className="text-label-sm">Pesticide Free</p>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl">
            <img 
              alt="Mango Harvest" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd4HLMflmPWDrAIMdXeYvLaDirN4wuigz52d0GkXzXQiQO-wcSLfoIWT1Mhar3EEULOz_oZOFnoo14qJ2_mfpuKti3KiaMvmcZfd1noM0XJBuUf6z60dX_15DdDKans9X_KmJeZIKgD_WszsV949PWXRfrQbICYByBwXa_28Utj_zmI3YBluYZRVC7KfHKYIFV1-2PGIHOzejBNocIqG1LtZracyCbSemjB2F5IrjDvQ4syRQlgMAJlM56QoSfH3vJZPGKNVqaonUK"
            />
          </div>
        </div>
      )}

      {activeTab === 'storage' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-container p-8 rounded-3xl">
            <h3 className="font-headline-lg mb-4">Storage & Care Instructions</h3>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {storageTips}
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">thermostat</span>
                <p className="font-label-lg">Room Temperature</p>
                <p className="text-label-sm text-on-surface-variant">Store at room temp for 2-3 days</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">touch_app</span>
                <p className="font-label-lg">Gentle Handling</p>
                <p className="text-label-sm text-on-surface-variant">Handle with care due to delicate skin</p>
              </div>
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">schedule</span>
                <p className="font-label-lg">Best Within</p>
                <p className="text-label-sm text-on-surface-variant">Consume within 2-3 days for peak flavor</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-headline-lg mb-4">Customer Reviews</h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex text-secondary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <span className="text-on-surface-variant font-label-lg">{reviews} Reviews</span>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="bg-surface-container p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {review === 1 ? 'A' : review === 2 ? 'S' : 'M'}
                  </div>
                  <div>
                    <p className="font-label-lg">{review === 1 ? 'Ahmed R.' : review === 2 ? 'Sara K.' : 'Mohammad T.'}</p>
                    <div className="flex text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant">
                  {review === 1 
                    ? "Absolutely the best mangoes I've ever tasted. The sweetness is incredible and the aroma fills the entire house!"
                    : review === 2 
                    ? "Perfect for my family. The kids love them and I appreciate that they're organic and pesticide-free."
                    : "Worth every penny. Small but packed with flavor. Will definitely order again next season."
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailTabs;
