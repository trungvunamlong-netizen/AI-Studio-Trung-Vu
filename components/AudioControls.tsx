
import React from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { StopIcon } from './icons/StopIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { VolumeIcon } from './icons/VolumeIcon';

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  onDownload: () => void;
  volume: number;
  onVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ 
  isPlaying, 
  onPlayPause, 
  onStop,
  onDownload,
  volume,
  onVolumeChange
}) => {
  return (
    <div className="mt-8 p-4 bg-slate-900/50 rounded-xl flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onPlayPause}
          className="p-3 bg-slate-700 rounded-full text-sky-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
        </button>
        <button
          onClick={onStop}
          className="p-3 bg-slate-700 rounded-full text-rose-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
          aria-label="Stop"
        >
          <StopIcon className="w-8 h-8" />
        </button>
      </div>

      <div className="flex items-center gap-3 flex-1 max-w-xs">
        <VolumeIcon className="w-6 h-6 text-slate-400 flex-shrink-0" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
          aria-label="Volume"
        />
      </div>

      <button
        onClick={onDownload}
        className="p-3 bg-slate-700 rounded-full text-emerald-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
        aria-label="Download"
      >
        <DownloadIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
