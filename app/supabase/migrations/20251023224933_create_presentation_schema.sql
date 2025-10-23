/*
  # Presentation Application Database Schema

  1. New Tables
    - `hymns`
      - `id` (uuid, primary key)
      - `number` (text) - Hymn number/reference
      - `title` (text) - Hymn title
      - `lyrics` (jsonb) - Array of verses with lyrics
      - `author` (text, optional) - Hymn author
      - `category` (text, optional) - Category/theme
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `scriptures`
      - `id` (uuid, primary key)
      - `book` (text) - Bible book name
      - `chapter` (integer) - Chapter number
      - `verse_start` (integer) - Starting verse
      - `verse_end` (integer, optional) - Ending verse
      - `text` (text) - Scripture text
      - `version` (text) - Bible version (e.g., KJV, NIV)
      - `created_at` (timestamptz)
    
    - `presentations`
      - `id` (uuid, primary key)
      - `title` (text) - Presentation title
      - `description` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `presentation_items`
      - `id` (uuid, primary key)
      - `presentation_id` (uuid) - Foreign key to presentations
      - `item_type` (text) - Type: 'hymn', 'scripture', 'text', 'media'
      - `item_id` (uuid, optional) - Foreign key to hymns/scriptures
      - `custom_text` (text, optional) - Custom text content
      - `order_index` (integer) - Order in presentation
      - `created_at` (timestamptz)
    
    - `schedules`
      - `id` (uuid, primary key)
      - `title` (text) - Schedule/service title
      - `date` (date) - Service date
      - `presentation_id` (uuid, optional) - Foreign key to presentations
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their content
*/

-- Create hymns table
CREATE TABLE IF NOT EXISTS hymns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL,
  title text NOT NULL,
  lyrics jsonb NOT NULL DEFAULT '[]'::jsonb,
  author text,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scriptures table
CREATE TABLE IF NOT EXISTS scriptures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book text NOT NULL,
  chapter integer NOT NULL,
  verse_start integer NOT NULL,
  verse_end integer,
  text text NOT NULL,
  version text DEFAULT 'KJV',
  created_at timestamptz DEFAULT now()
);

-- Create presentations table
CREATE TABLE IF NOT EXISTS presentations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create presentation_items table
CREATE TABLE IF NOT EXISTS presentation_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  presentation_id uuid NOT NULL REFERENCES presentations(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('hymn', 'scripture', 'text', 'media')),
  item_id uuid,
  custom_text text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  presentation_id uuid REFERENCES presentations(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hymns ENABLE ROW LEVEL SECURITY;
ALTER TABLE scriptures ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hymns
CREATE POLICY "Anyone can view hymns"
  ON hymns FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert hymns"
  ON hymns FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update hymns"
  ON hymns FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete hymns"
  ON hymns FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for scriptures
CREATE POLICY "Anyone can view scriptures"
  ON scriptures FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert scriptures"
  ON scriptures FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update scriptures"
  ON scriptures FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete scriptures"
  ON scriptures FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for presentations
CREATE POLICY "Anyone can view presentations"
  ON presentations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert presentations"
  ON presentations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update presentations"
  ON presentations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete presentations"
  ON presentations FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for presentation_items
CREATE POLICY "Anyone can view presentation items"
  ON presentation_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert presentation items"
  ON presentation_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update presentation items"
  ON presentation_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete presentation items"
  ON presentation_items FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for schedules
CREATE POLICY "Anyone can view schedules"
  ON schedules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert schedules"
  ON schedules FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update schedules"
  ON schedules FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete schedules"
  ON schedules FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hymns_number ON hymns(number);
CREATE INDEX IF NOT EXISTS idx_hymns_title ON hymns(title);
CREATE INDEX IF NOT EXISTS idx_scriptures_book_chapter ON scriptures(book, chapter);
CREATE INDEX IF NOT EXISTS idx_presentation_items_presentation_id ON presentation_items(presentation_id);
CREATE INDEX IF NOT EXISTS idx_presentation_items_order ON presentation_items(presentation_id, order_index);
CREATE INDEX IF NOT EXISTS idx_schedules_date ON schedules(date);