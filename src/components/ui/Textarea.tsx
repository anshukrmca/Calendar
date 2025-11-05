import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, className = '', ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-xs md:text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`w-full p-1 md:p-2 text-xs md:text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Textarea;
