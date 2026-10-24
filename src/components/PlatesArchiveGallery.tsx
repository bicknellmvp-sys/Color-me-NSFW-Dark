import React, { useState, useEffect } from 'react';
import { ALL_42_PLATES, PlateItem } from '../data/plates';
import { Palette, Download, Eye, Sparkles, Filter, Grid, Upload, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { PlateCategory } from '../types';

interface PlatesArchiveGalleryProps {
  plates?: PlateItem[];
  initialCategory?: PlateCategory;
  onOpenStudioWithPlate: (svgUri: string, title: string) => void;
  onOpenDownloads: () => void;
  onSelectCategory?: (category: PlateCategory) => void;
  isCategoryPageMode?: boolean;
}

const CATEGORY_DETAILS: Record<string, { title: string; subtitle: string; description: string; icon: string; platesCount: number }> = {
  'Bondage Studies': {
    title: 'Bondage Studies (Plates 01–10)',
    subtitle: 'Ceremonial Ropes, Anatomical Tension & Sacred Suspension',
    description: 'A study of body silhouette held in rigorous equilibrium. High-contrast vector linework featuring ceremonial Shibari knots, suspension rings, and dark sacred geometries.',
    icon: '⛓️',
    platesCount: 10
  },
  'Sigils & Occult': {
    title: 'Sigils & Occult (Plates 11–18)',
    subtitle: 'Solomonic Pentagrams, Demonic Wardings & Arcane Runes',
    description: 'Infernal geometries inspired by the Lesser Key of Solomon. Interlocking concentric ward circles, demonological seal rays, and ritual sigils rendered in obsidian vector contrast.',
    icon: '🔮',
    platesCount: 8
  },
  'Industrial Chains': {
    title: 'Industrial Chains (Plates 19–26)',
    subtitle: 'Cold Welded Steel, Iron Lattices & Dungeon Shackles',
    description: 'Heavy architectural tension. Welded structural chains, cage trusses, suspension rivets, and hydraulic machinery frames designed for dark industrial colorists.',
    icon: '⚙️',
    platesCount: 8
  },
  'Latex & Silhouette': {
    title: 'Latex & Silhouette (Plates 27–34)',
    subtitle: 'High-Gloss Sheen, Corsetry & Flowing Noir Drapes',
    description: 'Anatomical curves enveloped in high-gloss latex specular reflections. Deep shadow folds, cinched corsets, and dark velvet ribbons in sharp chiaroscuro.',
    icon: '🖤',
    platesCount: 8
  },
  'Erotic Geometry': {
    title: 'Erotic Geometry (Plates 35–42)',
    subtitle: 'Sacred Fibonacci Spirals, Golden Chords & Sensuous Anatomy',
    description: 'Mathematical transcendence where harmonic golden ratio spirals intersect with the organic curves of the human form in cosmic dark space.',
    icon: '📐',
    platesCount: 8
  }
};

export const PlatesArchiveGallery: React.FC<PlatesArchiveGalleryProps> = ({
  plates = ALL_42_PLATES,
  initialCategory = 'All',
  onOpenStudioWithPlate,
  onOpenDownloads,
  onSelectCategory,
  isCategoryPageMode = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PlateCategory>(initialCategory);
  const [activeLightboxPlate, setActiveLightboxPlate] = useState<PlateItem | null>(null);

  // Sync when initialCategory prop changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories: PlateCategory[] = [
    'All',
    'Bondage Studies',
    'Sigils & Occult',
    'Industrial Chains',
    'Latex & Silhouette',
    'Erotic Geometry'
  ];

  const handleCategoryChange = (cat: PlateCategory) => {
    setSelectedCategory(cat);
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  const filteredPlates = selectedCategory === 'All'
    ? plates
    : plates.filter((p) => p.category === selectedCategory);

  const handleDownloadPlate = (plate: PlateItem) => {
    if (plate.svgDataUri.startsWith('/') || plate.svgDataUri.startsWith('http') || plate.svgDataUri.includes('.jpg')) {
      const a = document.createElement('a');
      a.download = `ColorMeNSFW-Plate-${plate.plateNumber}-${plate.title.replace(/\s+/g, '-')}.jpg`;
      a.href = plate.svgDataUri;
      a.target = '_blank';
      a.click();
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = plate.svgDataUri;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1200;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0c0c0c';
        ctx.fillRect(0, 0, 1200, 1200);
        ctx.drawImage(img, 0, 0, 1200, 1200);

        const a = document.createElement('a');
        a.download = `ColorMeNSFW-Plate-${plate.plateNumber}-${plate.title.replace(/\s+/g, '-')}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
      }
    };
  };

  const categoryMeta = selectedCategory !== 'All' ? CATEGORY_DETAILS[selectedCategory] : null;

  return (
    <section id="pictures-archive" className={`py-16 md:py-24 px-4 md:px-8 bg-[#09090b] border-t border-[#1f1f24] relative z-10 ${isCategoryPageMode ? 'min-h-[85vh]' : ''}`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Category Page Hero Banner (When viewing a specific category or gallery) */}
        {categoryMeta ? (
          <div className="bg-[#121216] border border-[#2a2a32] p-6 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{categoryMeta.icon}</span>
                <span className="font-mono text-xs text-[#e60026] uppercase tracking-[0.25em] font-bold">
                  Dedicated Category Archive
                </span>
              </div>
              <h2 className="font-headline text-3xl md:text-4xl text-[#ffffff] font-bold uppercase tracking-tight">
                {categoryMeta.title}
              </h2>
              <span className="font-mono text-xs text-[#ffb3ae] uppercase">
                {categoryMeta.subtitle}
              </span>
              <p className="font-inter text-xs md:text-sm text-[#a0a0a0] mt-1 leading-relaxed">
                {categoryMeta.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenStudioWithPlate(filteredPlates[0]?.svgDataUri || '', filteredPlates[0]?.title || '')}
                className="w-full sm:w-auto px-5 py-3 bg-[#e60026] text-white hover:bg-[#ffb3ae] hover:text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#e60026]/20"
              >
                <Palette className="w-4 h-4" />
                <span>Color in Studio</span>
              </button>
              <button
                onClick={onOpenDownloads}
                className="w-full sm:w-auto px-5 py-3 bg-[#18181e] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#e60026]" />
                <span>Download Category</span>
              </button>
            </div>
          </div>
        ) : (
          /* General Section Header */
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222226] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#e60026]" />
                <span className="font-mono text-xs text-[#e60026] uppercase tracking-[0.25em] font-bold">
                  The {plates.length}-Plate Collection
                </span>
              </div>
              <h2 className="font-headline text-3xl md:text-5xl text-[#ffffff] font-bold uppercase tracking-tight">
                Book Line Art Gallery
              </h2>
              <p className="font-inter text-xs md:text-sm text-[#a0a0a0] max-w-xl mt-2 leading-relaxed">
                Browse all {plates.length} high-resolution line art illustrations contained within the flagship book <span className="text-[#ffffff] font-semibold">COLOR ME NSFW: Vol. 01 — The Bound Form</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenDownloads}
                className="px-4 py-2.5 bg-[#18181e] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#e60026]" />
                <span>Download Pack</span>
              </button>
            </div>
          </div>
        )}

        {/* Filter Bar with Horizontal Scroll for Mobile */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#121216] border border-[#222228] p-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto">
            <Filter className="w-4 h-4 text-[#777777] shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-[#e60026] border-[#e60026] text-white font-bold shadow-md'
                    : 'bg-[#18181e] border-[#2a2a30] text-[#a0a0a0] hover:text-white hover:border-[#555555]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs text-[#888888] flex items-center gap-2">
            <Grid className="w-3.5 h-3.5 text-[#e60026]" />
            <span>
              Showing <strong className="text-white">{filteredPlates.length}</strong> of <strong className="text-[#e60026]">{plates.length}</strong> Plates
            </span>
          </div>
        </div>

        {/* Plate Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPlates.map((plate) => (
            <div
              key={plate.id}
              className="group relative bg-[#121216] border border-[#222228] hover:border-[#e60026] transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Preview Container */}
              <div
                className="relative aspect-square w-full bg-[#08080a] cursor-pointer overflow-hidden"
                onClick={() => setActiveLightboxPlate(plate)}
              >
                <img
                  src={plate.svgDataUri}
                  alt={plate.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Number Badge & Authentic Artwork Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                  <span className="bg-black/90 border border-[#333333] px-2 py-0.5 text-[10px] font-mono text-[#e60026] font-bold uppercase shadow">
                    #{plate.plateNumber < 10 ? '0' + plate.plateNumber : plate.plateNumber}
                  </span>
                  {plate.isOriginalArtwork && (
                    <span className="bg-[#e60026] text-white px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider shadow">
                      BOOK ART
                    </span>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxPlate(plate);
                    }}
                    className="p-2 bg-[#222226] hover:bg-[#e60026] text-white rounded-full transition-colors"
                    title="Inspect Plate"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenStudioWithPlate(plate.svgDataUri, `Plate #${plate.plateNumber} - ${plate.title}`);
                    }}
                    className="p-2 bg-[#e60026] hover:bg-[#ffb3ae] hover:text-black text-white rounded-full transition-colors"
                    title="Color in Digital Studio"
                  >
                    <Palette className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-2.5 bg-[#141418] border-t border-[#222228] flex flex-col gap-1">
                <span className="text-[10px] font-mono text-[#777777] uppercase truncate">
                  {plate.category}
                </span>
                <h4 className="font-headline text-xs text-[#e0e0e0] font-bold truncate group-hover:text-[#e60026] transition-colors">
                  {plate.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxPlate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0c0c0e] border border-[#e60026] p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#26262a] pb-3">
              <div>
                <span className="font-mono text-xs text-[#e60026] font-bold uppercase">
                  Plate #{activeLightboxPlate.plateNumber < 10 ? '0' + activeLightboxPlate.plateNumber : activeLightboxPlate.plateNumber} • {activeLightboxPlate.category}
                </span>
                <h3 className="font-headline text-2xl text-white font-bold uppercase">
                  {activeLightboxPlate.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxPlate(null)}
                className="p-1.5 text-[#888888] hover:text-[#e60026] transition-colors"
              >
                <Eye className="w-6 h-6" />
              </button>
            </div>

            {/* High Res Image */}
            <div className="relative aspect-square w-full bg-black border border-[#222228] flex items-center justify-center p-2">
              <img
                src={activeLightboxPlate.svgDataUri}
                alt={activeLightboxPlate.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="font-inter text-xs text-[#a0a0a0]">
              {activeLightboxPlate.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-[#26262a]">
              <button
                onClick={() => {
                  onOpenStudioWithPlate(activeLightboxPlate.svgDataUri, `Plate #${activeLightboxPlate.plateNumber} - ${activeLightboxPlate.title}`);
                  setActiveLightboxPlate(null);
                }}
                className="flex-1 py-3 bg-[#e60026] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                <Palette className="w-4 h-4" />
                <span>Color in Studio</span>
              </button>

              <button
                onClick={() => handleDownloadPlate(activeLightboxPlate)}
                className="flex-1 py-3 bg-[#18181e] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
