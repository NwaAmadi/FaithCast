import { useState, useEffect } from 'react';
import { Search, Music, BookOpen } from 'lucide-react';
import { getAllHymns, getAllScriptures } from '../lib/sqlite-frontend';
import type { Hymn, Scripture } from '../types';

interface MediaLibraryProps {
  onHymnSelect: (hymn: Hymn) => void;
  onScriptureSelect: (scripture: Scripture) => void;
}

type TabType = 'songs' | 'scriptures' | 'media' | 'online';

export default function MediaLibrary({ onHymnSelect, onScriptureSelect }: MediaLibraryProps) {
  const [activeTab, setActiveTab] = useState<TabType>('songs');
  const [searchQuery, setSearchQuery] = useState('');
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'songs') {
      loadHymns();
    } else if (activeTab === 'scriptures') {
      loadScriptures();
    }
  }, [activeTab]);

  const loadHymns = async () => {
    setLoading(true);
    try {
      const data = await getAllHymns();
      setHymns(data);
    } catch (error) {
      setHymns([]);
    }
    setLoading(false);
  };

  const loadScriptures = async () => {
    setLoading(true);
    try {
      const data = await getAllScriptures();
      setScriptures(data);
    } catch (error) {
      setScriptures([]);
    }
    setLoading(false);
  };

  const filteredHymns = hymns.filter(
    (hymn) =>
      hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hymn.number.includes(searchQuery)
  );

  const filteredScriptures = scriptures.filter(
    (scripture) =>
      scripture.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scripture.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-gray-200 border-b border-gray-300">
        <div className="flex border-b border-gray-300">
          <button
            onClick={() => setActiveTab('songs')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'songs'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Songs
          </button>
          <button
            onClick={() => setActiveTab('scriptures')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'scriptures'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Scriptures
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'media'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'online'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Online
          </button>
        </div>

        {activeTab === 'songs' && (
          <div className="p-3 bg-white">
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search songs..."
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-2 top-2" />
              </div>
            </div>
            <button className="w-full px-3 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200">
              Favorites
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        {activeTab === 'songs' && (
          <div>
            {loading ? (
              <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
            ) : filteredHymns.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No hymns found</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredHymns.map((hymn) => (
                  <div
                    key={hymn.id}
                    onClick={() => onHymnSelect(hymn)}
                    className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <Music className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          {hymn.number} - {hymn.title}
                        </div>
                        {hymn.author && (
                          <div className="text-xs text-gray-500">{hymn.author}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'scriptures' && (
          <div>
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scriptures..."
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-2 top-2" />
              </div>
            </div>
            {loading ? (
              <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
            ) : filteredScriptures.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No scriptures found</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredScriptures.map((scripture) => (
                  <div
                    key={scripture.id}
                    onClick={() => onScriptureSelect(scripture)}
                    className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">
                          {scripture.book} {scripture.chapter}:{scripture.verse_start}
                          {scripture.verse_end && `-${scripture.verse_end}`}
                        </div>
                        <div className="text-xs text-gray-600 line-clamp-2 mt-1">
                          {scripture.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'media' && (
          <div className="p-4 text-center text-gray-500 text-sm">
            Media library coming soon
          </div>
        )}

        {activeTab === 'online' && (
          <div className="p-4 text-center text-gray-500 text-sm">
            Online resources coming soon
          </div>
        )}
      </div>

      <div className="p-2 bg-gray-100 border-t border-gray-300">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
