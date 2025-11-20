
import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center px-8 py-3 bg-sky-600 text-white font-semibold rounded-full shadow-lg hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none"
    >
      {children}
    </button>
  );
};
