import React from 'react';

const LangraFeatures = ({ features }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div key={index} className="bg-surface-container p-4 rounded-3xl flex flex-col gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">{feature.icon}</span>
          <p className="font-label-lg">{feature.title}</p>
          <p className="text-sm text-on-surface-variant">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default LangraFeatures;
