import React, { ChangeEvent } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  title: string
}

export const Select: React.FC<SelectProps> = ({ 
  value, 
  onValueChange, 
  children ,
  title
}) => {
  const selectId = React.useId();
  return (
    <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
      {title}
      <select
        id={selectId}
        title={title}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onValueChange(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
    </label>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
);