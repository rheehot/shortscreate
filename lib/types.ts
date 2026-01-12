// Types for YouTube Shorts Generator

export type VoiceType = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
export type AspectRatio = '9:16' | '1:1' | '16:9';
export type PlaybackSpeed = 0.5 | 0.75 | 1.0 | 1.25 | 1.5;

export type GenerationStep = 'research' | 'script' | 'images' | 'audio' | 'assemble' | 'completed' | 'error';

export interface GenerationOptions {
  voice: VoiceType;
  playbackSpeed: PlaybackSpeed;
  enableSubtitles: boolean;
  aspectRatio: AspectRatio;
}

export interface ScriptSection {
  section_id: number;
  text: string;
  image_prompt: string;
}

export interface VideoScript {
  sections: ScriptSection[];
}

export interface ProgressStep {
  id: GenerationStep;
  label: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  progress?: number;
}

export interface GenerationResult {
  videoPath: string;
  script: VideoScript;
  images: string[];
  thumbnail?: string;
}

export interface GenerationState {
  // Input state
  topic: string;
  setTopic: (topic: string) => void;

  options: GenerationOptions;
  setOptions: (options: Partial<GenerationOptions>) => void;

  // Progress state
  isGenerating: boolean;
  currentStep: GenerationStep;
  progressSteps: ProgressStep[];
  setGenerating: (isGenerating: boolean) => void;
  setCurrentStep: (step: GenerationStep) => void;
  updateProgressStep: (stepId: GenerationStep, updates: Partial<ProgressStep>) => void;
  resetProgress: () => void;

  // Result state
  result: GenerationResult | null;
  setResult: (result: GenerationResult | null) => void;

  // Actions
  startGeneration: () => void;
  cancelGeneration: () => void;
}

// Default options
export const defaultOptions: GenerationOptions = {
  voice: 'alloy',
  playbackSpeed: 1.0,
  enableSubtitles: false,
  aspectRatio: '9:16',
};

// Step labels
export const stepLabels: Record<GenerationStep, { label: string; description: string }> = {
  research: { label: '주제 조사', description: '주제에 대한 정보를 수집 중입니다' },
  script: { label: '대본 생성', description: '4개 섹션으로 구성된 대본 작성 중' },
  images: { label: '이미지 생성', description: 'AI가 이미지를 생성 중입니다' },
  audio: { label: '음성 생성', description: 'TTS로 음성을 생성 중입니다' },
  assemble: { label: '비디오 조립', description: '최종 비디오를 조립 중입니다' },
  completed: { label: '완료', description: '비디오 생성이 완료되었습니다' },
  error: { label: '에러', description: '생성 중 오류가 발생했습니다' },
};
