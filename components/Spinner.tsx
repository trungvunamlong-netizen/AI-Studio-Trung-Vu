
import React from 'react';

interface SpinnerProps {
  progress?: {
    current: number;
    total: number;
  } | null;
}

export const Spinner: React.FC<SpinnerProps> = ({ progress }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-white animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-white animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
      <span className="ml-2">
        {progress ? `Generating ${progress.current}/${progress.total}...` : 'Generating...'}
      </span>
    </div>
  );
};
