import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
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
    default: "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200",
    outline: "bg-white text-black border border-gray-300 hover:bg-gray-100 dark:bg-transparent dark:text-white dark:border-gray-600 dark:hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800",
    link: "bg-transparent underline-offset-4 hover:underline text-gray-900 dark:text-gray-100 hover:bg-transparent",
    destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
  };

  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
    icon: "h-9 w-9 p-0"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;