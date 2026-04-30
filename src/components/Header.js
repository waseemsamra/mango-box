import React from 'react';

const Header = () => {
  return (
    <header className="bg-white/95 dark:bg-stone-900/95 docked full-width top-0 sticky z-50 border-b border-stone-100 dark:border-stone-800 shadow-sm shadow-green-900/5">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black tracking-tight text-green-700 dark:text-green-500 font-display">KisanFresh</span>
          <nav className="hidden md:flex items-center gap-6 font-label-lg">
            <a className="text-green-700 dark:text-green-400 font-bold border-b-2 border-green-700 pb-1" href="#">Home</a>
            <a className="text-stone-500 dark:text-stone-400 hover:text-green-600 transition-colors" href="#">Shop</a>
            <a className="text-stone-500 dark:text-stone-400 hover:text-green-600 transition-colors" href="#">Offers</a>
          </nav>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="relative hidden lg:block w-64 max-w-xs">
            <input 
              className="w-full bg-surface-container-low border-outline-variant rounded-full py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary" 
              placeholder="Search for fresh mangoes..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-stone-800 dark:text-stone-100 hover:bg-green-50/50 dark:hover:bg-green-900/20 rounded-lg active:scale-95 transition-transform duration-200">
              <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            </button>
            <button className="p-2 text-stone-800 dark:text-stone-100 hover:bg-green-50/50 dark:hover:bg-green-900/20 rounded-lg active:scale-95 transition-transform duration-200">
              <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
