'use client';

import { useGenerationStore } from '@/lib/store';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Film, Sparkles } from 'lucide-react';

export function TopicInput() {
  const { topic, setTopic, startGeneration } = useGenerationStore();

  const handleGenerate = () => {
    if (topic.trim()) {
      startGeneration();
      // API call will be handled by parent
      window.dispatchEvent(new CustomEvent('start-generation', { detail: { topic } }));
    }
  };

  const exampleTopics = [
    '전자레인지에 이것 넣으면 위험한 이유',
    '매일 커피 3잔 마시면 일어나는 일',
    '폰 충전기를 밤새 꽂아두면 위험할까?',
  ];

  const handleSelectExample = (example: string) => {
    setTopic(example);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-2">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <Film className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              유튜브 쇼츠 생성기
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              주제를 입력하면 AI가 자동으로 쇼츠 영상을 만들어줍니다
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            주제 입력
          </Label>
          <Textarea
            id="topic"
            placeholder="예: 전자레인지에 이것 넣으면 위험한 이유"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-[120px] resize-none text-base"
            disabled={useGenerationStore.getState().isGenerating}
          />
        </div>

        {topic.trim().length === 0 && (
          <div className="space-y-2">
            <Label className="text-xs font-medium text-slate-500 dark:text-slate-400">
              예시 주제 선택
            </Label>
            <div className="flex flex-wrap gap-2">
              {exampleTopics.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectExample(example)}
                  className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={!topic.trim() || useGenerationStore.getState().isGenerating}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-6 text-base transition-all"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          쇼츠 생성하기
        </Button>
      </div>
    </Card>
  );
}
