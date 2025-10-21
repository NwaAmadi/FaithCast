# 🎚️ FaithCast

**A modern presentation app for churches and events — display Bible verses, hymns, and schedules with style, flexibility, and voice control.**

---

## 📖 Overview

**FaithCast** is a cross-platform presentation application designed for churches and faith-based gatherings. It enables smooth display of  **Bible verses** ,  **hymns** , and **event schedules** with  **live control** ,  **beautiful themes** , and an optional  **voice recognition feature** .

### 🧭 Purpose

To simplify worship presentations by providing an elegant, dual-screen system where users can preview and project slides — all while managing Bible passages, hymns, and event programs seamlessly.

### 💻 Platform

* Desktop (Windows, macOS, Linux) via **Tauri** or **Electron**
* Web-ready with the same React frontend

---

## ⚙️ Core Features

### 🖥️ 1. Dual-Screen Presentation (Preview + Live)

* **Preview Screen:** Control upcoming slides, change themes, edit text, or update content.
* **Live Screen:** Displays the final projection for the congregation.

**Tech Stack:**

`Tauri + React`, `WebSocket / State Sync`, `Framer Motion` for animations

---

### 📜 2. Bible Text Display

* Search and display verses (e.g., “John 3:16”)
* Choose translation (KJV, NIV, NKJV, etc.)
* Customize font, size, and layout
* Optional offline access via local database

**Tech Stack:**

`Bible API` or local SQLite Bible DB, `React Query` for caching

---

### 🎵 3. SDA Hymnal Integration

* Search hymns by title or number (e.g., “#12 – Joyful, Joyful, We Adore Thee”)
* Display verses and choruses section by section
* Optional **auto-advance timer** for smooth progression

**Tech Stack:**

Local JSON/SQLite dataset, React timer hooks, text animations

---

### 🕒 4. Event Schedule Display

* Add, edit, and manage event segments like  *“Opening Prayer”* ,  *“Sermon”* , etc.
* Automatically switch slides based on current item

**Tech Stack:**

`Supabase` or `SQLite`, `shadcn/ui` components for CRUD UI

---

### 🎨 5. Theme Presets + Custom Themes

Built-in presets for:

* 🕊️ **Worship Service**
* 💍 **Wedding**
* ⚰️ **Funeral**

Create and save custom themes (backgrounds, fonts, layouts).

**Tech Stack:**

`Tailwind CSS`, `CSS variables`, and global theme context

---

### ⏱️ 6. Auto-Advance Timer for Hymns

* Auto-advance verses after a set time
* Adjustable duration or manual control
* Smooth transitions between slides

**Tech Stack:**

React interval hooks + Framer Motion

---

### 🔤 7. Font & Layout Customization

* Choose from **Google Fonts**
* Adjust spacing, alignment, and animations
* Save presets for reuse

**Tech Stack:**

`Google Fonts API`, React context for real-time updates

---

### 🎙️ 8. Optional Audio Recognition Feature

Use your voice to control slides:

> “Show John three sixteen” → Displays John 3:16
>
> “Display hymn two hundred twelve” → Displays Hymn #212

* Toggle this feature on/off in settings

**Tech Stack:**

* **Web:** Web Speech API
* **Desktop:** OpenAI Whisper / Vosk (local recognition)
* **Command Parser:** Simple NLP layer for reference detection

---

## 🧩 System Architecture

<pre class="overflow-visible!" data-start="3320" data-end="3672"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>FaithCast</span><span>/</span><span>
├── Main Process (Tauri </span><span>/</span><span> Electron)
│   ├── </span><span>Window</span><span> Manager (Preview </span><span>+</span><span> Live)
│   ├── File </span><span>System</span><span></span><span>&</span><span> DB Access
│   └── Optional Supabase Sync
│
└── Renderer (React UI)
    ├── Preview Screen
    ├── Live Screen
    ├── Bible </span><span>Module</span><span>
    ├── Hymnal </span><span>Module</span><span>
    ├── Schedule </span><span>Module</span><span>
    ├── Theme Engine
    └── Speech Recognition (optional)
</span></span></code></div></div></pre>

---

## 💾 Data Storage

| Type          | Technology                                 | Description                   |
| ------------- | ------------------------------------------ | ----------------------------- |
| Local Storage | SQLite (via Drizzle ORM or better-sqlite3) | Offline-first approach        |
| Cloud Sync    | Supabase                                   | Sync schedules, hymns, themes |
| Media Storage | Local folder                               | Backgrounds, videos, etc.     |

---

## 🎨 UI Design Concepts

| Screen                  | Purpose           | Key Elements                               |
| ----------------------- | ----------------- | ------------------------------------------ |
| **Dashboard**     | Main hub          | Access to Bible, Hymns, Schedule, Settings |
| **Preview Panel** | Operator control  | Editable slide, theme selector, timer      |
| **Live Display**  | Projection output | Clean typography, full-screen mode         |
| **Settings Page** | Customization     | Theme editor, font selector, speech toggle |

---

## 🧰 Recommended Tech Stack Summary

| Category           | Technology                                                            |
| ------------------ | --------------------------------------------------------------------- |
| Framework          | **Tauri + React + TypeScript**(or Electron)                     |
| UI Library         | **shadcn/ui** , **Tailwind CSS** ,**Framer Motion** |
| State Mgmt         | Zustand or Redux Toolkit                                              |
| Database           | SQLite (local) + optional Supabase sync                               |
| Bible API          | Bible API / local JSON                                                |
| Hymnal Data        | SDAH JSON / SQLite                                                    |
| Speech Recognition | OpenAI Whisper, Vosk, or Web Speech API                               |
| Build Tool         | Vite + Tauri                                                          |
| Fonts              | Google Fonts API                                                      |

---

## 🚀 Development Plan (Phased Approach)

| Phase             | Focus                    | Key Deliverables                                         |
| ----------------- | ------------------------ | -------------------------------------------------------- |
| **Phase 1** | Core Presentation System | Dual-screen support, Bible + Hymnal modules, Schedule UI |
| **Phase 2** | Themes & Fonts           | Presets, custom themes, background controls              |
| **Phase 3** | Auto-Advance & Scheduler | Timed transitions for hymns and slides                   |
| **Phase 4** | Audio Recognition        | Whisper/Vosk integration for voice commands              |
| **Phase 5** | Polish & Distribution    | Final UI, packaging for Windows/macOS/Linux              |

---

## 🧑‍💻 Contribution Guide

1. Clone the repository:
   <pre class="overflow-visible!" data-start="5542" data-end="5631"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> https://github.com/yourusername/faithcast.git
   </span><span>cd</span><span> faithcast
   </span></span></code></div></div></pre>
2. Install dependencies:
   <pre class="overflow-visible!" data-start="5660" data-end="5690"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>pnpm install
   </span></span></code></div></div></pre>
3. Run development mode:
   <pre class="overflow-visible!" data-start="5719" data-end="5751"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>pnpm tauri dev
   </span></span></code></div></div></pre>
4. Build the production app:
   <pre class="overflow-visible!" data-start="5784" data-end="5818"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>pnpm tauri build
   </span></span></code></div></div></pre>

---

## 📜 License

**MIT License** — free to use and modify for faith-based or open-source projects.

---

## 🙏 Acknowledgments

* [Bible API]()
* [OpenAI Whisper](https://github.com/openai/whisper)
* [Supabase]()
* [shadcn/ui]()
* [Framer Motion]()
