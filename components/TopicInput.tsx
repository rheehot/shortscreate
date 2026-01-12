'use client';

import { useGenerationStore } from '@/lib/store';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Film, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function TopicInput() {
  const { topic, setTopic, startGeneration, options, setCurrentStep, updateProgressStep, setResult } = useGenerationStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim() || isGenerating) return;

    setIsGenerating(true);
    startGeneration();

    try {
      // 생성 요청 보내기
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          options,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start generation');
      }

      const { job_id } = await response.json();

      // 주기적으로 상태 확인
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`/api/generate?job_id=${job_id}`);
          const statusData = await statusResponse.json();

          if (statusData.status === 'completed') {
            clearInterval(pollInterval);
            setIsGenerating(false);
            setResult(statusData.result);
            setCurrentStep('completed');
          } else if (statusData.status === 'error') {
            clearInterval(pollInterval);
            setIsGenerating(false);
            alert('생성 중 오류가 발생했습니다: ' + (statusData.error || '알 수 없는 오류'));
          }
          // 계속 진행 중이면 계속 폴링
        } catch (error) {
          console.error('Status check error:', error);
        }
      }, 2000); // 2초마다 상태 확인

    } catch (error) {
      console.error('Generation error:', error);
      setIsGenerating(false);
      alert('생성 시작 중 오류가 발생했습니다');
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
            disabled={isGenerating}
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
                  disabled={isGenerating}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-6 text-base transition-all"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {isGenerating ? '생성 중...' : '쇼츠 생성하기'}
        </Button>
      </div>
    </Card>
  );
}
