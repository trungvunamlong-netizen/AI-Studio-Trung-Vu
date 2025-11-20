
import React from 'react';
import type { VoiceOption } from '../types';

interface VoiceSelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  voices: VoiceOption[];
  selectedValue: string;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({ voices, selectedValue, ...props }) => {
  return (
    <div className="relative">
      <select
        value={selectedValue}
        {...props}
        className="w-full appearance-none bg-slate-900/70 border border-slate-600 rounded-lg py-3 px-4 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 text-slate-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {voices.map((voice) => (
          <option key={voice.id} value={voice.id}>
            {voice.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
