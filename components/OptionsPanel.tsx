'use client';

import { useGenerationStore } from '@/lib/store';
import type { VoiceType, PlaybackSpeed, AspectRatio } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings, Mic, Gauge, Subtitles, Frame } from 'lucide-react';

const voiceOptions: { value: VoiceType; label: string; description: string }[] = [
  { value: 'alloy', label: 'Alloy', description: '중립적이고 깔끔한 목소리' },
  { value: 'echo', label: 'Echo', description: '남성적이고 차분한 목소리' },
  { value: 'fable', label: 'Fable', description: '부드럽고 이야기하는 목소리' },
  { value: 'onyx', label: 'Onyx', description: '깊고 신뢰감 있는 목소리' },
  { value: 'nova', label: 'Nova', description: '밝고 명랑한 목소리' },
  { value: 'shimmer', label: 'Shimmer', description: '여성적이고 부드러운 목소리' },
];

const speedOptions: { value: PlaybackSpeed; label: string }[] = [
  { value: 0.5, label: '0.5x (매우 느림)' },
  { value: 0.75, label: '0.75x (느림)' },
  { value: 1.0, label: '1.0x (보통)' },
  { value: 1.25, label: '1.25x (빠름)' },
  { value: 1.5, label: '1.5x (매우 빠름)' },
];

const aspectRatioOptions: { value: AspectRatio; label: string }[] = [
  { value: '9:16', label: '9:16 (세로형)' },
  { value: '1:1', label: '1:1 (정사각형)' },
  { value: '16:9', label: '16:9 (가로형)' },
];

export function OptionsPanel() {
  const { options, setOptions, isGenerating } = useGenerationStore();

  return (
    <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
          <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">생성 옵션</h3>
        </div>

        {/* Voice Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-slate-500" />
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              음성 목소리
            </Label>
          </div>
          <Select
            value={options.voice}
            onValueChange={(value) => setOptions({ voice: value as VoiceType })}
            disabled={isGenerating}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {voiceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {option.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Playback Speed */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-slate-500" />
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              영상 속도
            </Label>
          </div>
          <Select
            value={options.playbackSpeed.toString()}
            onValueChange={(value) => setOptions({ playbackSpeed: parseFloat(value) as PlaybackSpeed })}
            disabled={isGenerating}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {speedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Aspect Ratio */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Frame className="w-4 h-4 text-slate-500" />
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              화면 비율
            </Label>
          </div>
          <Select
            value={options.aspectRatio}
            onValueChange={(value) => setOptions({ aspectRatio: value as AspectRatio })}
            disabled={isGenerating}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aspectRatioOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subtitles Toggle */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Subtitles className="w-4 h-4 text-slate-500" />
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              자막 추가
            </Label>
          </div>
          <Switch
            checked={options.enableSubtitles}
            onCheckedChange={(checked) => setOptions({ enableSubtitles: checked })}
            disabled={isGenerating}
          />
        </div>
      </div>
    </Card>
  );
}
