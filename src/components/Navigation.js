import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ currentPage = 'home' }) => {
  return (
    <header className="bg-white/95 dark:bg-stone-900/95 docked full-width top-0 sticky z-50 border-b border-stone-100 dark:border-stone-800 shadow-sm shadow-green-900/5">
      <div className="flex justify-between items-center w-full px-4 md:px-8 h-16">
        <Link to="/" className="text-2xl font-black tracking-tight text-green-700 dark:text-green-500 font-['Plus_Jakarta_Sans'] hover:text-green-800 dark:hover:text-green-400 transition-colors">KisanFresh</Link>
        <nav className="hidden md:flex items-center gap-8">
          <a className={`text-stone-500 dark:text-stone-400 hover:text-green-600 transition-colors font-['Plus_Jakarta_Sans'] ${currentPage === 'home' ? 'text-green-700 dark:text-green-400 font-bold border-b-2 border-green-700 pb-1' : ''}`} href="/">Home</a>
          <a className={`text-stone-500 dark:text-stone-400 hover:text-green-600 transition-colors font-['Plus_Jakarta_Sans'] ${currentPage === 'varieties' ? 'text-green-700 dark:text-green-400 font-bold border-b-2 border-green-700 pb-1' : ''}`} href="/varieties">Varieties</a>
          <a className={`text-stone-500 dark:text-stone-400 hover:text-green-600 transition-colors font-['Plus_Jakarta_Sans'] ${currentPage === 'shop' ? 'text-green-700 dark:text-green-400 font-bold border-b-2 border-green-700 pb-1' : ''}`} href="/shop">Shop</a>
          <a className={`text-stone-500 dark:text-stone-400 hover:text-green-600 transition-colors font-['Plus_Jakarta_Sans'] ${currentPage === 'offers' ? 'text-green-700 dark:text-green-400 font-bold border-b-2 border-green-700 pb-1' : ''}`} href="/offers">Offers</a>
          <a className={`text-stone-500 dark:text-stone-400 hover:text-green-600 transition-colors font-['Plus_Jakarta_Sans'] ${currentPage === 'cart' ? 'text-green-700 dark:text-green-400 font-bold border-b-2 border-green-700 pb-1' : ''}`} href="/cart">Cart</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant">
            <span className="material-symbols-outlined text-outline" data-icon="search">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-label-lg ml-2 w-48" placeholder="Search fresh harvest..." type="text"/>
          </div>
          <button className="hover:bg-green-50/50 dark:hover:bg-green-900/20 rounded-lg p-2 active:scale-95 transition-transform duration-200">
            <span className="material-symbols-outlined text-green-600" data-icon="shopping_cart">shopping_cart</span>
          </button>
          <button className="hover:bg-green-50/50 dark:hover:bg-green-900/20 rounded-lg p-2 active:scale-95 transition-transform duration-200">
            <span className="material-symbols-outlined text-green-600" data-icon="account_circle">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
