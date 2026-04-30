import React from 'react';

const SeasonalMangoes = () => {
  return (
    <section className="px-4 md:px-8 py-section-padding">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Seasonal Mangoes</h2>
          <p className="text-on-surface-variant max-w-lg">Straight from the orchards to your doorstep. Choose from our premium seasonal varieties.</p>
        </div>
        <button className="text-primary font-label-lg hover:underline underline-offset-4 hidden md:block">View all varieties</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
        {/* Main Feature */}
        <div className="md:col-span-6 lg:col-span-7 bg-surface-container-low rounded-3xl p-8 flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary-fixed">
          <div className="relative h-72 rounded-2xl overflow-hidden mb-8">
            <img 
              alt="Chaunsa Mangoes" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgXLQdkojrelXk_s2D6-rkI6r98p4KCh0uj4dNWf_CX-b8R1kasVbxITvIQEvgOQoNIw8RdTiOkjFxYqCXEpwMIBhyulSyYKzHGEMCNwM8uYivKPgTe6IKxdjBdpknScrvPPhEFif-IAFdhf89h0Tt88ee76N98eX97P4UwO8s8bZPkTSBdl9PGoEs8u5PhKjdNS3JkzKs-AmYlyNVGNThrinR3plANnMgDy_QmQX0by1-aXZvnVcoiLox-zYA8M03iQj7G7sp4wT9"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-label-sm font-bold text-primary">Best Flavor</div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-headline-md text-headline-md">Chaunsa (White)</h3>
              <span className="text-tertiary font-bold text-headline-md">Rs. 350 / kg</span>
            </div>
            <p className="text-on-surface-variant mb-6">Known for its uniquely sweet and rich aroma, often called the 'nectar of heaven'.</p>
            <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              Add to Cart
            </button>
          </div>
        </div>
        {/* Secondary Mangoes */}
        <div className="md:col-span-6 lg:col-span-5 grid grid-cols-1 gap-6">
          <div className="bg-surface-container-high rounded-3xl p-6 flex gap-6 items-center group cursor-pointer hover:shadow-lg transition-all">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
              <img 
                alt="Anwar Ratol" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsQ9Rt1vqEkZ5bYFwlFYoPW3UdEPyPXuv0DfanVkpo6uTHIZPsPlg5mIwx6RjLkPCoeTNvHJJXQaUWf6GE9KpS2SJzb7pDVV3JLD7N9M49fj9zx8WgauhV0rkt-Y_nQXI9--i9sqHxUn-ZsqzEgANGHwkUyt8q3L9BZipdfL8P5Nq_d5cpcCCPYMyE6gEhU_WLBvhDPDdjz97EFFRofAL53eVNSLighhpe5sQuF_L1dXFUnofJV98uOXwtXJSG_YJ_v_Ge5Idjn_Ru"
              />
            </div>
            <div>
              <h4 className="font-label-lg text-lg mb-1">Anwar Ratol</h4>
              <p className="text-label-sm text-on-surface-variant mb-3">Intense sweetness, pocket-sized flavor.</p>
              <span className="text-tertiary font-bold">Rs. 420 / kg</span>
            </div>
          </div>
          <div className="bg-surface-container-high rounded-3xl p-6 flex gap-6 items-center group cursor-pointer hover:shadow-lg transition-all">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
              <img 
                alt="Langra Mango" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvgZRRn_hFi7y2FEuzoLGL18ePouj6TsYtv02G0Tzhojx5Cm2uXt0Wfnn6dgwBWKdsg0iFELv69YfeIyfpTk0ZIIy2P7Vvn-DLsGlEHHYXtjHcN9dC6TBwadMuYqPZ2LvyxYWqIW9BhEZWOfVBs3L6p_MQN7cI9w3Ovocx4Jqw5gX5XHlzgp7aJZMTQtSa2yOIZk3yRPG8yVh17aYDL2sBzhtOaB9a5bbmE5fpoL7ECMyXm0LD5yLdw5C4oCkEjyvNDw_nVjTafpNk"
              />
            </div>
            <div>
              <h4 className="font-label-lg text-lg mb-1">Langra</h4>
              <p className="text-label-sm text-on-surface-variant mb-3">Zesty green exterior, melt-in-mouth sweetness.</p>
              <span className="text-tertiary font-bold">Rs. 280 / kg</span>
            </div>
          </div>
          <div className="bg-secondary-fixed rounded-3xl p-6 flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-[48px] text-on-secondary-fixed mb-4">local_shipping</span>
            <h4 className="font-headline-md text-on-secondary-fixed mb-2">Gift a Box</h4>
            <p className="text-on-secondary-fixed-variant text-label-sm mb-4">Premium export quality boxes for your loved ones.</p>
            <button className="bg-on-secondary-fixed text-white px-6 py-2 rounded-full font-label-lg">Customize</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalMangoes;
