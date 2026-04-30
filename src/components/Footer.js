import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-stone-50 dark:bg-stone-950 w-full py-12 mt-16 border-t border-stone-200 dark:border-stone-800">
      <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <span className="font-bold text-green-800 dark:text-green-200 text-2xl font-display">KisanFresh</span>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-stone-600 dark:text-stone-400">Connecting Pakistani farmers directly to your kitchen. We ensure peak freshness and fair prices for both growers and customers.</p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-[20px]">social_leaderboard</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined text-[20px]">camera_alt</span>
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="text-green-700 dark:text-green-400 font-bold uppercase text-xs tracking-widest">Our Produce</h5>
          <ul className="space-y-2">
            <li><a className="text-stone-500 hover:text-green-600 transition-colors font-label-lg hover:underline decoration-green-500 underline-offset-4" href="#">About Sindhri Mangoes</a></li>
            <li><a className="text-stone-500 hover:text-green-600 transition-colors font-label-lg hover:underline decoration-green-500 underline-offset-4" href="#">Chaunsa Special</a></li>
            <li><a className="text-stone-500 hover:text-green-600 transition-colors font-label-lg hover:underline decoration-green-500 underline-offset-4" href="#">Organic Vegetables</a></li>
            <li><a className="text-stone-500 hover:text-green-600 transition-colors font-label-lg hover:underline decoration-green-500 underline-offset-4" href="#">Seasonal Bundles</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-green-700 dark:text-green-400 font-bold uppercase text-xs tracking-widest">Company</h5>
          <ul className="space-y-2">
            <li><a className="text-stone-500 hover:text-green-600 transition-colors font-label-lg hover:underline decoration-green-500 underline-offset-4" href="#">Quality Guarantee</a></li>
            <li><a className="text-stone-500 hover:text-green-600 transition-colors font-label-lg hover:underline decoration-green-500 underline-offset-4" href="#">Freshness Policy</a></li>
            <li><a className="text-stone-500 hover:text-green-600 transition-colors font-label-lg hover:underline decoration-green-500 underline-offset-4" href="#">Contact Farmer Support</a></li>
            <li><a className="text-stone-500 hover:text-green-600 transition-colors font-label-lg hover:underline decoration-green-500 underline-offset-4" href="#">Shipping Info</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-green-700 dark:text-green-400 font-bold uppercase text-xs tracking-widest">Subscribe</h5>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-stone-600 dark:text-stone-400">Get notified when the new mango season starts!</p>
          <form className="flex gap-2">
            <input className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 rounded-xl text-sm py-2 px-4 focus:ring-primary focus:border-primary flex-1" placeholder="Your email" type="email"/>
            <button className="bg-primary text-white p-2 rounded-xl active:scale-95 transition-transform">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
      <div className="px-6 mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 text-center">
        <p className="font-['Plus_Jakarta_Sans'] text-sm text-stone-600 dark:text-stone-400 opacity-80">© 2024 KisanFresh. Harvested with Love in Pakistan.</p>
      </div>
    </footer>
  );
};

export default Footer;
