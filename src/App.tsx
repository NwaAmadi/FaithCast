import { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import SchedulePanel from './components/SchedulePanel';
import MediaLibrary from './components/MediaLibrary';
import PreviewPanel from './components/PreviewPanel';
import ControlBar from './components/ControlBar';
import PresentationContent from './components/PresentationContent';
import type { PresentationItem, Hymn, Scripture, DisplaySlide } from './types';

function App() {
  const [presentationItems, setPresentationItems] = useState<PresentationItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<PresentationItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<DisplaySlide | null>(null);

  const handleHymnSelect = (hymn: Hymn) => {
    const newItem: PresentationItem = {
      id: crypto.randomUUID(),
      presentation_id: '',
      item_type: 'hymn',
      item_id: hymn.id,
      order_index: presentationItems.length,
      created_at: new Date().toISOString(),
      hymn
    };
    setPresentationItems([...presentationItems, newItem]);
  };

  const handleScriptureSelect = (scripture: Scripture) => {
    const newItem: PresentationItem = {
      id: crypto.randomUUID(),
      presentation_id: '',
      item_type: 'scripture',
      item_id: scripture.id,
      order_index: presentationItems.length,
      created_at: new Date().toISOString(),
      scripture
    };
    setPresentationItems([...presentationItems, newItem]);
  };

  const handleItemSelect = (index: number) => {
    setSelectedItem(presentationItems[index]);
    setCurrentIndex(index);
    updateCurrentSlide(presentationItems[index]);
  };

  const updateCurrentSlide = (item: PresentationItem) => {
    if (!item) {
      setCurrentSlide(null);
      return;
    }

    let slide: DisplaySlide | null = null;

    if (item.item_type === 'hymn' && item.hymn) {
      const firstVerse = item.hymn.lyrics[0];
      slide = {
        id: item.id,
        title: `${item.hymn.number} - ${item.hymn.title}`,
        content: firstVerse?.text || '',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
      };
    } else if (item.item_type === 'scripture' && item.scripture) {
      slide = {
        id: item.id,
        title: `${item.scripture.book} ${item.scripture.chapter}:${item.scripture.verse_start}`,
        content: item.scripture.text,
        background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)'
      };
    } else if (item.item_type === 'text') {
      slide = {
        id: item.id,
        content: item.custom_text || '',
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)'
      };
    }

    setCurrentSlide(slide);
  };

  const handleNext = () => {
    if (currentIndex < presentationItems.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      updateCurrentSlide(presentationItems[newIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      updateCurrentSlide(presentationItems[newIndex]);
    }
  };

  const handleItemAdd = () => {
    const newItem: PresentationItem = {
      id: crypto.randomUUID(),
      presentation_id: '',
      item_type: 'text',
      custom_text: 'New text slide',
      order_index: presentationItems.length,
      created_at: new Date().toISOString()
    };
    setPresentationItems([...presentationItems, newItem]);
  };

  const handleItemRemove = (index: number) => {
    const newItems = presentationItems.filter((_, i) => i !== index);
    setPresentationItems(newItems);
    if (currentIndex >= newItems.length && newItems.length > 0) {
      setCurrentIndex(newItems.length - 1);
    }
  };

  const handleItemMove = (fromIndex: number, toIndex: number) => {
    const newItems = [...presentationItems];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setPresentationItems(newItems);

    if (currentIndex === fromIndex) {
      setCurrentIndex(toIndex);
    } else if (currentIndex === toIndex) {
      setCurrentIndex(fromIndex < toIndex ? currentIndex - 1 : currentIndex + 1);
    }
  };

  const getNextSlide = (): DisplaySlide | null => {
    if (currentIndex >= presentationItems.length - 1) return null;
    const nextItem = presentationItems[currentIndex + 1];

    if (nextItem.item_type === 'hymn' && nextItem.hymn) {
      return {
        id: nextItem.id,
        title: `${nextItem.hymn.number} - ${nextItem.hymn.title}`,
        content: nextItem.hymn.lyrics[0]?.text || '',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
      };
    } else if (nextItem.item_type === 'scripture' && nextItem.scripture) {
      return {
        id: nextItem.id,
        title: `${nextItem.scripture.book} ${nextItem.scripture.chapter}:${nextItem.scripture.verse_start}`,
        content: nextItem.scripture.text,
        background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)'
      };
    }

    return null;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-500" />
          <h1 className="text-lg font-bold text-white">Presentation Manager</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            File
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            Schedule
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            Songs
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            Live
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            Help
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 flex flex-col border-r border-gray-700">
          <SchedulePanel
            items={presentationItems}
            currentIndex={currentIndex}
            onItemSelect={handleItemSelect}
            onItemAdd={handleItemAdd}
            onItemRemove={handleItemRemove}
            onItemMove={handleItemMove}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">
            <PreviewPanel
              title="Preview"
              currentSlide={currentSlide}
              nextSlide={getNextSlide()}
              showNext={true}
            />
            <PreviewPanel
              title="Live"
              currentSlide={isLive ? currentSlide : null}
            />
          </div>

          <div className="h-64 border-t border-gray-700">
            <PresentationContent item={selectedItem} />
          </div>
        </div>

        <div className="w-80 border-l border-gray-700">
          <MediaLibrary
            onHymnSelect={handleHymnSelect}
            onScriptureSelect={handleScriptureSelect}
          />
        </div>
      </div>

      <ControlBar
        isPlaying={isPlaying}
        isLive={isLive}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onGoLive={() => setIsLive(!isLive)}
        onClear={() => setCurrentSlide(null)}
        onBackgroundChange={() => {}}
      />
    </div>
  );
}

export default App;
