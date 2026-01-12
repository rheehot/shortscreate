'use client';

import { useGenerationStore } from '@/lib/store';
import { TopicInput } from '@/components/TopicInput';
import { OptionsPanel } from '@/components/OptionsPanel';
import { ProgressModal } from '@/components/ProgressModal';
import { ResultPage } from '@/components/ResultPage';
import { useEffect, useState } from 'react';

export default function Home() {
  const { result, isGenerating } = useGenerationStore();
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if (isGenerating) {
      setShowProgress(true);
    } else if (result) {
      setShowProgress(false);
    }
  }, [isGenerating, result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-slate-100 dark:from-slate-950 dark:via-red-950/10 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                YouTube Shorts Generator
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                AI가 자동으로 쇼츠 영상을 만들어드립니다
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {result ? (
          <ResultPage />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TopicInput />
            </div>
            <div>
              <OptionsPanel />
            </div>
          </div>
        )}
      </main>

      {/* Progress Modal */}
      <ProgressModal />

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-slate-600 dark:text-slate-400">
            <p>Powered by AI • Gemini, OpenAI TTS, Imagen 4.0</p>
            <p className="mt-2">© 2025 YouTube Shorts Generator</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
