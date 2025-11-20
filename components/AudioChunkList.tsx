import React from 'react';
import type { AudioChunk } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { RefreshIcon } from './icons/RefreshIcon';
import { StopIcon } from './icons/StopIcon';
import { formatTime } from '../utils/audioUtils';

interface AudioChunkListProps {
  chunks: AudioChunk[];
  playingChunkId: number | null;
  playbackTime: number;
  onToggleSelection: (id: number) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onDownloadSelected: () => void;
  onPlayChunk: (id: number) => void;
  onPauseChunk: () => void;
  onRetryChunk: (id: number) => void;
  onCancelChunk: (id: number) => void;
  onSeek: (time: number) => void;
  hasSelection: boolean;
}

export const AudioChunkList: React.FC<AudioChunkListProps> = ({
  chunks,
  playingChunkId,
  playbackTime,
  onToggleSelection,
  onToggleSelectAll,
  onDownloadSelected,
  onPlayChunk,
  onPauseChunk,
  onRetryChunk,
  onCancelChunk,
  onSeek,
  hasSelection,
}) => {
  const allSelected = chunks.length > 0 && chunks.every(c => c.isSelected);
  const selectedCount = chunks.filter(c => c.isSelected).length;
  const downloadButtonText = selectedCount > 1 ? 'Download Zip' : 'Download Selected';

  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onToggleSelectAll(e.target.checked)}
            className="w-5 h-5 bg-slate-700 border-slate-500 rounded text-sky-500 focus:ring-sky-600 cursor-pointer"
            aria-label="Select all chunks"
            disabled={chunks.length === 0}
          />
          <label className="text-lg font-semibold text-slate-200">
            Audio Chunks ({chunks.length})
          </label>
        </div>
        <button
          onClick={onDownloadSelected}
          disabled={!hasSelection}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-full shadow-md hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          aria-label={downloadButtonText}
        >
          <DownloadIcon className="w-5 h-5" />
          {downloadButtonText}
        </button>
      </div>
      
      <ul className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        {chunks.map((chunk, index) => {
          const isPlaying = playingChunkId === chunk.id;
          const duration = chunk.duration || 0;
          const currentTime = isPlaying ? playbackTime : 0;
          const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

          return (
            <li key={chunk.id} className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 hover:border-slate-700 transition-all">
              <div className="flex items-center gap-4">
                {/* Selection Checkbox */}
                <input
                  type="checkbox"
                  checked={chunk.isSelected}
                  onChange={() => onToggleSelection(chunk.id)}
                  disabled={chunk.status !== 'completed'}
                  className="w-5 h-5 bg-slate-700 border-slate-500 rounded text-sky-500 focus:ring-sky-600 cursor-pointer flex-shrink-0 disabled:opacity-50"
                  aria-label={`Select chunk ${index + 1}`}
                />

                {/* Chunk Information & Status */}
                <div className="flex-grow overflow-hidden min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-sky-400 font-bold">CHUNK {index + 1}</span>
                    {chunk.status === 'completed' && (
                       <span className="text-xs text-slate-400 font-mono">
                         {isPlaying ? `${formatTime(currentTime)} / ` : ''}{formatTime(duration)}
                       </span>
                    )}
                  </div>
                  
                  <p className="text-slate-300 text-sm truncate mb-2" title={chunk.text}>
                    "{chunk.text}"
                  </p>

                  {/* Status Indicators & Timeline */}
                  {chunk.status === 'generating' && (
                    <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-sky-500 h-1.5 rounded-full w-full animate-[progress_2s_ease-in-out_infinite] origin-left"></div>
                    </div>
                  )}

                  {chunk.status === 'error' && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      Error: {chunk.error || 'Generation failed'}
                    </p>
                  )}
                  
                  {chunk.status === 'completed' && (
                    <div className="w-full flex items-center gap-2">
                       {isPlaying ? (
                          <input 
                            type="range" 
                            min="0" 
                            max={duration} 
                            step="0.01"
                            value={currentTime} 
                            onChange={(e) => onSeek(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                          />
                       ) : (
                         <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                           <div className="bg-emerald-500 h-1.5 rounded-full w-full"></div>
                         </div>
                       )}
                    </div>
                  )}
                </div>

                {/* Action Controls */}
                <div className="flex-shrink-0 flex items-center gap-2 ml-2">
                   {chunk.status === 'generating' && (
                       <>
                        <span className="hidden sm:inline text-xs text-sky-400 font-mono animate-pulse mr-2">Processing...</span>
                        <button
                          onClick={() => onCancelChunk(chunk.id)}
                          className="p-2 bg-slate-700 rounded-full text-rose-400 hover:bg-slate-600 hover:text-rose-300 transition-colors"
                          title="Pause/Cancel"
                        >
                          <StopIcon className="w-5 h-5" />
                        </button>
                       </>
                   )}

                   {chunk.status === 'error' && (
                    <button
                      onClick={() => onRetryChunk(chunk.id)}
                      className="p-2 bg-slate-700 rounded-full text-rose-400 hover:bg-slate-600 transition-colors"
                      title="Retry"
                    >
                      <RefreshIcon className="w-5 h-5" />
                    </button>
                   )}

                   {chunk.status === 'completed' && (
                    <>
                       {/* Regenerate Button */}
                       <button
                          onClick={() => onRetryChunk(chunk.id)}
                          className="p-2 bg-slate-700 rounded-full text-amber-400 hover:bg-slate-600 hover:text-amber-300 transition-colors"
                          title="Run again (Regenerate)"
                        >
                          <RefreshIcon className="w-5 h-5" />
                        </button>

                      {isPlaying ? (
                        <button
                          onClick={onPauseChunk}
                          className="p-2 bg-sky-600 rounded-full text-white hover:bg-sky-500 transition-colors shadow-lg shadow-sky-900/50"
                        >
                          <PauseIcon className="w-5 h-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onPlayChunk(chunk.id)}
                          className="p-2 bg-slate-700 rounded-full text-sky-400 hover:bg-slate-600 hover:text-sky-300 transition-colors"
                        >
                          <PlayIcon className="w-5 h-5" />
                        </button>
                      )}
                    </>
                   )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
       <style>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
};