import React from 'react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ label, selected = false, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs cursor-pointer rounded-full font-medium transition-all duration-200 ${
        selected
          ? 'bg-blue-500 text-white ring-2 ring-slate-700'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default Chip;
