import { Settings } from 'lucide-react';
import type { DisplaySlide } from '../types';

interface PreviewPanelProps {
  title: string;
  currentSlide: DisplaySlide | null;
  nextSlide?: DisplaySlide | null;
  showNext?: boolean;
}

export default function PreviewPanel({
  title,
  currentSlide,
  nextSlide,
  showNext = false
}: PreviewPanelProps) {
  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="p-2 bg-gray-200 border-b border-gray-300 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <button className="p-1 hover:bg-gray-300 rounded" title="Settings">
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg h-full">
          {currentSlide ? (
            <div
              className="relative w-full h-full flex items-center justify-center p-8"
              style={{
                background: currentSlide.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <div className="text-center">
                {currentSlide.title && (
                  <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
                    {currentSlide.title}
                  </h2>
                )}
                <div className="text-white text-xl leading-relaxed drop-shadow-lg whitespace-pre-wrap">
                  {currentSlide.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-gray-400 text-lg">No slide selected</div>
            </div>
          )}
        </div>

        {showNext && nextSlide && (
          <div className="mt-4">
            <div className="text-xs font-semibold text-gray-600 mb-2">NEXT SLIDE</div>
            <div className="bg-white border border-gray-300 rounded overflow-hidden shadow-sm h-32">
              <div
                className="relative w-full h-full flex items-center justify-center p-4"
                style={{
                  background: nextSlide.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <div className="text-center">
                  {nextSlide.title && (
                    <div className="text-xs font-bold text-white mb-2 drop-shadow">
                      {nextSlide.title}
                    </div>
                  )}
                  <div className="text-white text-xs leading-relaxed drop-shadow line-clamp-3">
                    {nextSlide.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
