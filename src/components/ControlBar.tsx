import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Monitor,
  Eye,
  EyeOff,
  Image as ImageIcon
} from 'lucide-react';

interface ControlBarProps {
  isPlaying: boolean;
  isLive: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onGoLive: () => void;
  onClear: () => void;
  onBackgroundChange: () => void;
}

export default function ControlBar({
  isPlaying,
  isLive,
  onPlayPause,
  onNext,
  onPrevious,
  onGoLive,
  onClear,
  onBackgroundChange
}: ControlBarProps) {
  return (
    <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          className="p-2 hover:bg-gray-700 rounded text-white transition-colors"
          title="Previous"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button
          onClick={onPlayPause}
          className="p-2 hover:bg-gray-700 rounded text-white transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={onNext}
          className="p-2 hover:bg-gray-700 rounded text-white transition-colors"
          title="Next"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onBackgroundChange}
          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm font-medium flex items-center gap-2 transition-colors"
          title="Background"
        >
          <ImageIcon className="w-4 h-4" />
          Background
        </button>

        <div className="w-px h-6 bg-gray-600"></div>

        <button
          onClick={onGoLive}
          className={`px-4 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors ${
            isLive
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          title={isLive ? 'Live' : 'Go Live'}
        >
          <Monitor className="w-4 h-4" />
          {isLive ? 'Live' : 'Go Live'}
        </button>

        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm font-medium flex items-center gap-2 transition-colors"
          title="Clear Display"
        >
          {isLive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          Clear
        </button>
      </div>
    </div>
  );
}
