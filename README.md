# COLOR ME NSFW 🖤🩸

> **Curated dark coloring experiences, physical collector archives, and an interactive digital coloring studio for the bold and unapologetic.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)
[![Age Rating](https://img.shields.io/badge/Content-18%2B%20Mature-crimson?style=flat-square)](./src/components/AgeGateModal.tsx)

---

## 📖 Overview

**COLOR ME NSFW** is an artistic dark-aesthetic web application and e-commerce portal combining high-resolution physical coloring book volumes with an in-browser digital coloring canvas, interactive book previewer, and digital asset download hub.

Designed around themes of occult iconography, cyber-gothic architecture, dark surrealism, and intricate sacred geometry, the application delivers both a collector-grade showcase for physical prints and an immediate creative studio for digital colorists.

---

## ✨ Key Features

### 🎨 1. Interactive Digital Ink Studio
- **Vector Line Art Canvas**: Color scalable vector plates directly in the browser with precision flood-fill and drawing modes.
- **Curated Color Palettes**: Choose from themed palettes including *Occult Ritual*, *Cyberpunk Neon*, *Gothic Gold*, *Monochromatic Ink*, and *Blood Moon*.
- **Creative Controls**: Undo/Redo history stack, zoom, pan, brush stroke controls, opacity sliders, and instant clear/reset.
- **Export & Share**: Download completed artworks in high-resolution PNG or vector SVG format with one click.

### 📚 2. Collector Archive Volumes & Store
- **Physical & Digital Editions**: Browse flagship volumes with format selection (Collector Hardcover, Printable PDF, or Complete Bundle).
- **Detailed Specifications**: Detailed specs on paper weights (200+ GSM bleed-proof archival grade), sewn lay-flat bindings, and foil-stamped covers.
- **Shopping Cart Drawer**: Responsive cart drawer with real-time item count, quantity adjustments, format switching, and checkout flow.

### 🖼️ 3. 42+ High-Definition Plate Gallery
- **Multi-Category Archive**: Filter by categories such as *Occult & Demonic*, *Gothic & Noir*, *Cybernetic*, *Sacred Geometry*, and *Surrealist*.
- **Quick Actions**: One-click actions to launch any plate directly into the Digital Coloring Studio or download the high-res line art.

### 📖 4. Virtual Flipbook Reader
- **Immersive Volume Previewer**: Interactive book previewer allowing users to flip through pages with smooth animations before purchasing.
- **Direct Studio Transfer**: Transfer any discovered page directly into the coloring workspace.

### 📥 5. Batch Plate Importer & Download Center
- **Custom Plate Uploads**: Upload custom SVG or line art plates with preview cards, local storage caching, and management.
- **Download Center**: Access print-ready, high-resolution PDF/SVG vector files formatted for standard art prints and physical coloring.

### 🛡️ 6. Compliance & Experience Polish
- **18+ Age Verification Advisory**: Entry gate ensuring mature content compliance.
- **The Ink & Ledger**: Newsletter dispatch subscription for exclusive plates and drops.
- **Upcoming Release Reservation**: Priority waitlist integration for upcoming volumes.

---

## 🛠️ Tech Stack

| Technology | Description |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Modern component architecture with hooks and concurrent features |
| **[TypeScript 5.8](https://www.typescriptlang.org/)** | Strict type safety across volumes, plates, cart, and studio states |
| **[Vite 6](https://vitejs.dev/)** | Ultra-fast frontend tooling and development server |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Next-generation utility-first styling with custom dark theme tokens |
| **[Motion](https://motion.dev/)** | Smooth gesture animations, drawer transitions, and modal effects |
| **[Lucide React](https://lucide.dev/)** | Crisp, lightweight icon set |

---

## 📁 Project Structure

```text
├── assets/                     # Static media and reference assets
├── src/
│   ├── components/             # UI Components
│   │   ├── AboutCreator.tsx    # Creator biography and manifesto
│   │   ├── AgeGateModal.tsx    # 18+ Age verification advisory
│   │   ├── BatchUploadModal.tsx# Custom plates batch importer
│   │   ├── BookPreviewerModal.tsx # Interactive flipbook volume reader
│   │   ├── CartDrawer.tsx      # Shopping cart drawer & checkout modal
│   │   ├── DigitalColoringStudio.tsx # SVG digital coloring canvas & tools
│   │   ├── DownloadCenterModal.tsx   # Print-ready downloads hub
│   │   ├── FeaturedArchives.tsx# Flagship books display & format options
│   │   ├── Footer.tsx          # Site footer & navigation links
│   │   ├── Header.tsx          # Main navigation bar, cart count, & menu
│   │   ├── Hero.tsx            # Hero section with primary CTAs
│   │   ├── InkLedger.tsx       # Newsletter dispatch subscription
│   │   ├── LegalModal.tsx      # Terms of service, copyright, & disclaimers
│   │   ├── NavDrawer.tsx       # Mobile navigation slide-out drawer
│   │   ├── PlatesArchiveGallery.tsx # Filterable 42-plate line art gallery
│   │   ├── UpcomingRelease.tsx # Teaser and waitlist for upcoming volume
│   │   └── VolumeDetailModal.tsx   # Deep dive specifications for volumes
│   ├── data/
│   │   ├── plates.ts           # 42+ curated vector line art plates
│   │   └── volumes.ts          # Archive volume details and specifications
│   ├── types.ts                # TypeScript data interfaces & types
│   ├── index.css               # Global Tailwind CSS styles
│   ├── main.tsx                # Application entry point
│   └── App.tsx                 # Root application state & orchestration
├── index.html                  # HTML template
├── metadata.json               # Application metadata
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/color-me-nsfw.git
   cd color-me-nsfw
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on `0.0.0.0:3000` |
| `npm run build` | Compiles TypeScript and builds production assets to `/dist` |
| `npm run preview` | Serves the production build locally for verification |
| `npm run lint` | Runs TypeScript type checks (`tsc --noEmit`) |
| `npm run clean` | Cleans build artifacts (`dist`, `server.js`) |

---

## 🎨 Color Palette & Theming

The application utilizes a dark noir aesthetic palette:

- **Canvas Background**: Deep Onyx (`#131313`, `#0d0d0d`)
- **Card Accents**: Gunmetal & Charcoal (`#1a1a1a`, `#242424`)
- **Accent Red / Crimson**: Blood Rose (`#e11d48`, `#be123c`)
- **Accent Amber / Gold**: Antique Parchment (`#d97706`, `#b45309`)
- **Foreground Text**: Crisp Off-White (`#f5f5f5`, `#e0e0e0`) & Muted Pewter (`#9ca3af`)

---

## ⚠️ Content Advisory & Disclaimer

This project contains artistic themes, dark fantasy illustrations, gothic horror, and mature aesthetic line art intended for adult audiences (18+). All illustrations, characters, and concepts are original works of artistic expression.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
