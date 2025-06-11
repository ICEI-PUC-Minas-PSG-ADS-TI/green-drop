// @/components/ui/button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'secondary' | 'destructive';
  children: React.ReactNode;
  className: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  variant = 'default', 
  children 
}) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};