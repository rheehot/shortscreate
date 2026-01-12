'use client';

import { useGenerationStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  RotateCcw,
  FileText,
  Play,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';

export function ResultPage() {
  const { result, resetProgress, topic } = useGenerationStore();
  const [showScript, setShowScript] = useState(true);

  if (!result) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result.videoPath;
    link.download = 'shorts_video.mp4';
    link.click();
  };

  const handleNewVideo = () => {
    resetProgress();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              영상 생성 완료!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {topic}에 대한 쇼츠 영상이 생성되었습니다
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleNewVideo}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          새 영상 만들기
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Video Preview */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Play className="w-5 h-5" />
              영상 미리보기
            </h3>

            <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden relative group">
              <video
                src={result.videoPath}
                controls
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                className="flex-1 gap-2 bg-red-600 hover:bg-red-700"
              >
                <Download className="w-4 h-4" />
                다운로드
              </Button>
              <Button
                variant="outline"
                onClick={handleNewVideo}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                다시 만들기
              </Button>
            </div>
          </div>
        </Card>

        {/* Script Viewer */}
        <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                생성된 대본
              </h3>
              <Badge variant="secondary">
                {result.script.sections.length}개 섹션
              </Badge>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {result.script.sections.map((section) => (
                <div
                  key={section.section_id}
                  className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      Section {section.section_id}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      🎙️ 나레이션
                    </p>
                    <p className="text-sm text-slate-900 dark:text-slate-100 pl-3 border-l-2 border-slate-300 dark:border-slate-600">
                      {section.text}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      🎨 이미지 프롬프트
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 pl-3 border-l-2 border-slate-300 dark:border-slate-600 italic">
                      {section.image_prompt}
                    </p>
                  </div>

                  {/* Image Thumbnail */}
                  {result.images[section.section_id - 1] && (
                    <div className="mt-2">
                      <img
                        src={result.images[section.section_id - 1]}
                        alt={`Section ${section.section_id}`}
                        className="w-full aspect-[9/16] object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
              영상이 마음에 드시나요?
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              유튜브에 바로 업로드하거나 공유해보세요
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              저장하기
            </Button>
            <Button className="gap-2 bg-red-600 hover:bg-red-700">
              <Play className="w-4 h-4" />
              유튜브 업로드
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
