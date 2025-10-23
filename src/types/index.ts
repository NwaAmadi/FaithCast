export interface Hymn {
  id: string;
  number: string;
  title: string;
  lyrics: HymnVerse[];
  author?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface HymnVerse {
  verse: number;
  text: string;
  type?: 'verse' | 'chorus' | 'bridge';
}

export interface Scripture {
  id: string;
  book: string;
  chapter: number;
  verse_start: number;
  verse_end?: number;
  text: string;
  version: string;
  created_at: string;
}

export interface Presentation {
  id: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface PresentationItem {
  id: string;
  presentation_id: string;
  item_type: 'hymn' | 'scripture' | 'text' | 'media';
  item_id?: string;
  custom_text?: string;
  order_index: number;
  created_at: string;
  hymn?: Hymn;
  scripture?: Scripture;
}

export interface Schedule {
  id: string;
  title: string;
  date: string;
  presentation_id?: string;
  presentation?: Presentation;
  created_at: string;
  updated_at: string;
}

export interface DisplaySlide {
  id: string;
  content: string;
  title?: string;
  background?: string;
}
