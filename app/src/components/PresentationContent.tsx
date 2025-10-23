import type { PresentationItem } from '../types';

interface PresentationContentProps {
  item: PresentationItem | null;
}

export default function PresentationContent({ item }: PresentationContentProps) {
  if (!item) {
    return (
      <div className="h-full flex items-center justify-center bg-white border-l border-gray-300">
        <div className="text-center text-gray-500">
          <p className="text-lg">No item selected</p>
          <p className="text-sm mt-2">Select an item from the schedule to view details</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (item.item_type) {
      case 'hymn':
        if (!item.hymn) return null;
        return (
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">HYMN</div>
              <h2 className="text-2xl font-bold text-gray-900">
                {item.hymn.number} - {item.hymn.title}
              </h2>
              {item.hymn.author && (
                <p className="text-sm text-gray-600 mt-1">by {item.hymn.author}</p>
              )}
            </div>

            <div className="space-y-6">
              {item.hymn.lyrics.map((verse, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                    {verse.type || 'Verse'} {verse.verse}
                  </div>
                  <div className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {verse.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'scripture':
        if (!item.scripture) return null;
        return (
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">SCRIPTURE</div>
              <h2 className="text-2xl font-bold text-gray-900">
                {item.scripture.book} {item.scripture.chapter}:{item.scripture.verse_start}
                {item.scripture.verse_end && `-${item.scripture.verse_end}`}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{item.scripture.version}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900 text-lg leading-relaxed">{item.scripture.text}</p>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">CUSTOM TEXT</div>
              <h2 className="text-2xl font-bold text-gray-900">Text Slide</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900 text-lg leading-relaxed whitespace-pre-wrap">
                {item.custom_text}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <div className="text-gray-500">Media content coming soon</div>
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white border-l border-gray-300">
      {renderContent()}
    </div>
  );
}
