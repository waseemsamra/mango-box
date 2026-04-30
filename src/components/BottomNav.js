import React from 'react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 md:hidden bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-t border-stone-100 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-2xl">
      <a className="flex flex-col items-center justify-center bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-xl px-4 py-1 active:scale-90 transition-all duration-150" href="#">
        <span className="material-symbols-outlined" data-icon="home">home</span>
        <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold">Home</span>
      </a>
      <a className="flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 px-4 py-1 hover:text-green-600 active:scale-90 transition-all duration-150" href="#">
        <span className="material-symbols-outlined" data-icon="storefront">storefront</span>
        <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold">Shop</span>
      </a>
      <a className="flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 px-4 py-1 hover:text-green-600 active:scale-90 transition-all duration-150" href="#">
        <span className="material-symbols-outlined" data-icon="local_offer">local_offer</span>
        <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold">Offers</span>
      </a>
      <a className="flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 px-4 py-1 hover:text-green-600 active:scale-90 transition-all duration-150" href="#">
        <span className="material-symbols-outlined" data-icon="shopping_basket">shopping_basket</span>
        <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold">Cart</span>
      </a>
    </nav>
  );
};

export default BottomNav;
