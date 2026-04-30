import React from 'react';

const FilterSidebar = () => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-primary">filter_list</span>
          <h2 className="font-headline-md text-lg">Filters</h2>
        </div>
        <div className="space-y-6">
          {/* Quality Grade */}
          <div>
            <h3 className="font-label-lg mb-3">Quality Grade</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary" type="checkbox"/>
                <span className="font-body-md group-hover:text-primary transition-colors">Export Grade</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary" type="checkbox"/>
                <span className="font-body-md group-hover:text-primary transition-colors">Organic Certified</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input className="w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary" type="checkbox"/>
                <span className="font-body-md group-hover:text-primary transition-colors">Premium Retail</span>
              </label>
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <h3 className="font-label-lg mb-3">Price Range (per kg)</h3>
            <input className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-primary" type="range"/>
            <div className="flex justify-between text-label-sm text-stone-500 mt-2">
              <span>$10</span>
              <span>$50</span>
            </div>
          </div>
          
          {/* Harvest Month */}
          <div>
            <h3 className="font-label-lg mb-3">Harvest Month</h3>
            <select className="w-full p-2 bg-surface-container-low border border-outline-variant rounded-xl font-body-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>May - Early Season</option>
              <option>June - Mid Season</option>
              <option>July - Peak Season</option>
              <option>August - Late Season</option>
            </select>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
