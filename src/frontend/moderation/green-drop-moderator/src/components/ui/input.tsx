// @/components/ui/input.tsx
import React, { ChangeEvent, ReactNode } from 'react';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  prefix?: ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  placeholder, 
  value, 
  onChange, 
  prefix 
}) => (
  <div className="relative">
    {prefix && (
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {prefix}
      </span>
    )}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${prefix ? 'pl-10' : ''}`}
    />
  </div>
);