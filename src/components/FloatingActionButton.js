import React from 'react';

const FloatingActionButton = () => {
  return (
    <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 bg-primary-container text-on-primary-container p-4 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all z-40 hidden md:flex items-center gap-2 pr-6">
      <span className="material-symbols-outlined">support_agent</span>
      <span className="font-label-lg">Farmer Support</span>
    </button>
  );
};

export default FloatingActionButton;
