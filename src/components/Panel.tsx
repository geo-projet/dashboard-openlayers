'use client';

import { useState } from 'react';

interface PanelProps {
  isOpen: boolean;
  togglePanel: () => void;
}

const Panel: React.FC<PanelProps> = ({ isOpen, togglePanel }) => {
  return (
    <div
      className={`absolute top-0 left-0 h-full bg-white z-30 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ width: '300px' }}
    >
      <button onClick={togglePanel} className="absolute top-1/2 -right-8 transform -translate-y-1/2 px-2 py-1 bg-white border border-gray-300 rounded-r-md">
        {isOpen ? '<<' : '>>'}
      </button>
      <div className="p-4">
        <h2 className="text-lg font-bold">Analytics Panel</h2>
        {/* Future analytics indicators will go here */}
      </div>
    </div>
  );
};

export default Panel;
