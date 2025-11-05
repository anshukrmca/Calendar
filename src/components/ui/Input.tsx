import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-xs md:text-sm font-medium mb-1 flex items-center">
          {icon && <span className="mr-1">{icon}</span>}
          {label}
        </label>
      )}
      <input
        className={`w-full p-1 md:p-2 text-xs md:text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
