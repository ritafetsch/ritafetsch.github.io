import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive' | 'categoryFilter';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'default', 
  size = 'default',
  children,
  ...props 
}) => {
  const variantClasses = {
    default: "bg-black text-white hover:bg-neutral-800",
    outline: "bg-white text-black border border-gray-300 hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
    link: "bg-transparent underline-offset-4 hover:underline text-gray-900 hover:bg-transparent",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    categoryFilter: "px-4 py-1 rounded-full"
  };

  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
    icon: "h-9 w-9 p-0"
  };

  // Special handling for category filter
  const combinedClasses = variant === 'categoryFilter'
    ? cn(
        variantClasses.categoryFilter, 
        className
      )
    : cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      );

  return (
    <button
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;