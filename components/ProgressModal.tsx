'use client';

import { useGenerationStore } from '@/lib/store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, XCircle, Loader2, X } from 'lucide-react';

export function ProgressModal() {
  const { isGenerating, progressSteps, cancelGeneration } = useGenerationStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400 dark:text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'in_progress':
        return 'text-blue-600 dark:text-blue-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-slate-500 dark:text-slate-400';
    }
  };

  return (
    <Dialog open={isGenerating} onOpenChange={() => cancelGeneration()}>
      <DialogContent className="sm:max-w-[500px]" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                🎬 영상 생성 중...
              </DialogTitle>
              <DialogDescription className="mt-2 text-slate-600 dark:text-slate-400">
                AI가 주제를 분석하여 최적의 쇼츠 영상을 생성하고 있습니다
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => cancelGeneration()}
              className="shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {progressSteps.map((step, index) => (
            <div
              key={step.id}
              className={`space-y-2 ${step.status === 'pending' ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800">
                    {getStatusIcon(step.status)}
                  </div>
                  <div className="space-y-0.5">
                    <p
                      className={`font-medium ${step.status === 'in_progress' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100'}`}
                    >
                      {index + 1}. {step.label}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
                {step.status === 'in_progress' && (
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {step.progress || 0}%
                  </div>
                )}
              </div>

              {step.status === 'in_progress' && (
                <Progress value={step.progress || 0} className="h-2" />
              )}

              {step.status === 'error' && (
                <div className="ml-11 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    오류가 발생했습니다. 다시 시도해주세요.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button
            variant="outline"
            onClick={() => cancelGeneration()}
            className="text-slate-700 dark:text-slate-300"
          >
            취소하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
