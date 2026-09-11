import React, { useState } from 'react';
import { ALL_42_PLATES, PlateItem } from '../data/plates';
import { Palette, Download, Eye, Sparkles, Filter, Grid, Upload } from 'lucide-react';

interface PlatesArchiveGalleryProps {
  plates?: PlateItem[];
  onOpenStudioWithPlate: (svgUri: string, title: string) => void;
  onOpenDownloads: () => void;
  onOpenBatchUpload: () => void;
}

export const PlatesArchiveGallery: React.FC<PlatesArchiveGalleryProps> = ({
  plates = ALL_42_PLATES,
  onOpenStudioWithPlate,
  onOpenDownloads,
  onOpenBatchUpload,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxPlate, setActiveLightboxPlate] = useState<PlateItem | null>(null);

  const categories = [
    'All',
    'Bondage Studies',
    'Sigils & Occult',
    'Industrial Chains',
    'Latex & Silhouette',
    'Erotic Geometry'
  ];

  const filteredPlates = selectedCategory === 'All'
    ? plates
    : plates.filter((p) => p.category === selectedCategory);

  const handleDownloadPlate = (plate: PlateItem) => {
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

  return (
    <section id="pictures-archive" className="py-20 px-4 md:px-8 bg-[#0a0a0a] border-t border-[#1a1a1a] relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#222222] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#e60026]" />
              <span className="font-mono text-xs text-[#e60026] uppercase tracking-[0.25em] font-bold">
                The {plates.length}-Plate Collection
              </span>
            </div>
            <h2 className="font-headline text-3xl md:text-5xl text-[#e0e0e0] font-bold uppercase tracking-tight">
              Book Line Art Gallery
            </h2>
            <p className="font-inter text-xs md:text-sm text-[#b0b0b0] max-w-xl mt-2 leading-relaxed">
              Browse all {plates.length} high-resolution line art illustrations contained within the flagship book <span className="text-[#e0e0e0] font-semibold">COLOR ME NSFW: Vol. 01 — The Bound Form</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBatchUpload}
              className="px-4 py-2.5 bg-[#e60026] text-white hover:bg-[#ffb3ae] hover:text-black text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Import Your 42 Book Pictures</span>
            </button>

            <button
              onClick={onOpenDownloads}
              className="px-4 py-2.5 bg-[#1c1b1b] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#e60026]" />
              <span>Download Pack</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
            <Filter className="w-4 h-4 text-[#808080] shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? 'bg-[#e60026] border-[#e60026] text-white font-bold'
                    : 'bg-[#141414] border-[#262626] text-[#b0b0b0] hover:text-[#e0e0e0] hover:border-[#404040]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs text-[#808080] flex items-center gap-2">
            <Grid className="w-3.5 h-3.5 text-[#e60026]" />
            <span>Showing <strong className="text-[#e0e0e0]">{filteredPlates.length}</strong> of <strong className="text-[#e60026]">{plates.length}</strong> Pictures</span>
          </div>
        </div>

        {/* Plate Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPlates.map((plate) => (
            <div
              key={plate.id}
              className="group relative bg-[#121212] border border-[#222222] hover:border-[#e60026] transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Preview Container */}
              <div
                className="relative aspect-square w-full bg-[#080808] cursor-pointer overflow-hidden"
                onClick={() => setActiveLightboxPlate(plate)}
              >
                <img
                  src={plate.svgDataUri}
                  alt={plate.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Number Badge */}
                <span className="absolute top-2 left-2 bg-black/80 border border-[#333333] px-2 py-0.5 text-[10px] font-mono text-[#e60026] font-bold uppercase">
                  #{plate.plateNumber < 10 ? '0' + plate.plateNumber : plate.plateNumber}
                </span>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLightboxPlate(plate);
                    }}
                    className="p-2 bg-[#222222] hover:bg-[#e60026] text-white rounded-full transition-colors"
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
              <div className="p-2.5 bg-[#141414] border-t border-[#222222] flex flex-col gap-1">
                <span className="text-[10px] font-mono text-[#808080] uppercase truncate">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0c0c0c] border border-[#e60026] p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <div>
                <span className="font-mono text-xs text-[#e60026] font-bold uppercase">
                  Plate #{activeLightboxPlate.plateNumber < 10 ? '0' + activeLightboxPlate.plateNumber : activeLightboxPlate.plateNumber} • {activeLightboxPlate.category}
                </span>
                <h3 className="font-headline text-2xl text-[#e0e0e0] font-bold uppercase">
                  {activeLightboxPlate.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxPlate(null)}
                className="p-1.5 text-[#b0b0b0] hover:text-[#e60026] transition-colors"
              >
                <Eye className="w-6 h-6" />
              </button>
            </div>

            {/* High Res Image */}
            <div className="relative aspect-square w-full bg-black border border-[#222222] flex items-center justify-center p-2">
              <img
                src={activeLightboxPlate.svgDataUri}
                alt={activeLightboxPlate.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="font-inter text-xs text-[#b0b0b0]">
              {activeLightboxPlate.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-[#222222]">
              <button
                onClick={() => {
                  onOpenStudioWithPlate(activeLightboxPlate.svgDataUri, `Plate #${activeLightboxPlate.plateNumber} - ${activeLightboxPlate.title}`);
                  setActiveLightboxPlate(null);
                }}
                className="flex-1 py-3 bg-[#e60026] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                <Palette className="w-4 h-4" />
                <span>Color in Digital Studio</span>
              </button>

              <button
                onClick={() => handleDownloadPlate(activeLightboxPlate)}
                className="flex-1 py-3 bg-[#1c1b1b] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
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
