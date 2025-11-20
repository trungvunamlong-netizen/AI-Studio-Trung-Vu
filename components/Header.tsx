
import React from 'react';
import { AudioWaveIcon } from './icons/AudioWaveIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex justify-center items-center gap-4">
        <AudioWaveIcon className="w-10 h-10 text-sky-400"/>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text">
          Gemini TTS
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-400">
        Transform your text into lifelike speech.
      </p>
    </header>
  );
};
