import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="sticky top-28 space-y-8">
        <div>
          <h2 className="font-headline-md text-on-surface mb-6">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-container text-on-primary-container font-semibold transition-all">
                <span className="material-symbols-outlined" data-icon="nutrition">nutrition</span>
                <span>Mangoes</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined" data-icon="apple">ios</span>
                <span>Fruits</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined" data-icon="eco">eco</span>
                <span>Vegetables</span>
              </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined" data-icon="potted_plant">potted_plant</span>
                <span>Herbs</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="bg-secondary-container/30 p-6 rounded-3xl border border-secondary-fixed-dim/20">
          <span className="material-symbols-outlined text-secondary text-4xl mb-4" data-icon="temp_preferences_custom">temp_preferences_custom</span>
          <h3 className="font-headline-md text-on-secondary-container mb-2">Morning Pick</h3>
          <p className="text-body-md text-on-secondary-container/80 mb-4">Harvested today at 4:00 AM from Mirpur Khas.</p>
          <button className="text-label-lg text-secondary font-bold flex items-center gap-1">
            Learn more <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
