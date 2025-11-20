
export interface VoiceOption {
  id: string;
  name: string;
}

export type ChunkStatus = 'idle' | 'generating' | 'completed' | 'error';

export interface AudioChunk {
  id: number;
  text: string;
  status: ChunkStatus;
  audioData: string | null; // base64
  duration: number;
  isSelected: boolean;
  error?: string;
}
