import React from 'react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  options: { value: string; label: string }[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, options }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-8 h-8 cursor-pointer rounded-full ${option.value} border-2 ${
              value === option.value ? 'border-gray-700' : 'border-gray-300'
            } transition-all`}
            title={option.label}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
