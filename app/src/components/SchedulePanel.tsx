import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';
import type { PresentationItem } from '../types';

interface SchedulePanelProps {
  items: PresentationItem[];
  currentIndex: number;
  onItemSelect: (index: number) => void;
  onItemAdd: () => void;
  onItemRemove: (index: number) => void;
  onItemMove: (fromIndex: number, toIndex: number) => void;
}

export default function SchedulePanel({
  items,
  currentIndex,
  onItemSelect,
  onItemAdd,
  onItemRemove,
  onItemMove
}: SchedulePanelProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onItemSelect(index);
  };

  const moveUp = (index: number) => {
    if (index > 0) {
      onItemMove(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < items.length - 1) {
      onItemMove(index, index + 1);
    }
  };

  const getItemDisplay = (item: PresentationItem) => {
    switch (item.item_type) {
      case 'hymn':
        return item.hymn ? `${item.hymn.number} - ${item.hymn.title}` : 'Hymn';
      case 'scripture':
        return item.scripture
          ? `${item.scripture.book} ${item.scripture.chapter}:${item.scripture.verse_start}`
          : 'Scripture';
      case 'text':
        return item.custom_text?.substring(0, 50) || 'Custom Text';
      default:
        return 'Media';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 border-r border-gray-300">
      <div className="p-3 bg-gray-200 border-b border-gray-300 flex items-center justify-between">
        <h2 className="font-semibold text-sm text-gray-700">Schedule</h2>
        <div className="flex gap-1">
          <button
            onClick={onItemAdd}
            className="p-1 hover:bg-gray-300 rounded"
            title="Add Item"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
          {selectedIndex !== null && (
            <button
              onClick={() => onItemRemove(selectedIndex)}
              className="p-1 hover:bg-gray-300 rounded"
              title="Remove Item"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No items in schedule
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`p-2 cursor-pointer hover:bg-blue-50 transition-colors ${
                  index === currentIndex
                    ? 'bg-green-100 border-l-4 border-green-600'
                    : index === selectedIndex
                    ? 'bg-blue-100'
                    : ''
                }`}
                onClick={() => handleSelect(index)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveUp(index);
                      }}
                      disabled={index === 0}
                      className="p-0.5 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveDown(index);
                      }}
                      disabled={index === items.length - 1}
                      className="p-0.5 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 uppercase">
                      {item.item_type}
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {getItemDisplay(item)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
