import React from 'react';
import { Eye, ShoppingBag, Palette, BookOpen, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { ArchiveVolume } from '../types';

interface FeaturedArchivesProps {
  volumes: ArchiveVolume[];
  onSelectVolume: (volume: ArchiveVolume) => void;
  onAddToCart: (volume: ArchiveVolume, format?: 'physical' | 'digital' | 'bundle') => void;
  onOpenStudioWithVolume: (volume: ArchiveVolume) => void;
  onOpenReadBook: () => void;
}

export const FeaturedArchives: React.FC<FeaturedArchivesProps> = ({
  volumes,
  onSelectVolume,
  onAddToCart,
  onOpenStudioWithVolume,
  onOpenReadBook,
}) => {
  const mainBook = volumes[0];

  if (!mainBook) return null;

  return (
    <section id="archives" className="py-24 px-6 md:px-16 bg-[#0c0c0c]/90 backdrop-blur-sm relative z-10 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-grow bg-[#333333]" />
          <div className="text-center">
            <span className="font-mono text-xs text-[#e60026] uppercase font-bold tracking-[0.25em] block mb-1">
              Official Flagship Publication
            </span>
            <h2 className="font-headline text-3xl md:text-5xl text-[#e0e0e0] uppercase tracking-tight font-bold">
              COLOR ME NSFW • VOL. 01
            </h2>
          </div>
          <div className="h-[1px] flex-grow bg-[#333333]" />
        </div>

        {/* Main Book Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 bg-[#161616] border border-[#333333] hover:border-[#e60026]/80 transition-all duration-500 p-6 md:p-10 relative overflow-hidden">
          
          {/* Left Column: Book Cover Image */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div 
              className="relative w-full aspect-[4/5] bg-black border border-[#262626] cursor-pointer overflow-hidden group"
              onClick={() => onSelectVolume(mainBook)}
            >
              <img
                src={mainBook.coverImage}
                alt={mainBook.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Badge */}
              <div className="absolute top-4 left-4 bg-black/80 border border-[#333333] px-3 py-1 text-xs font-mono text-[#e60026] font-bold uppercase tracking-widest">
                42 PLATES • FLAGSHIP BOOK
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenReadBook();
                  }}
                  className="px-4 py-2.5 bg-[#e60026] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Book</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectVolume(mainBook);
                  }}
                  className="px-4 py-2.5 bg-[#1c1b1b] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Book</span>
                </button>
              </div>
            </div>

            {/* Quick Specs Bar */}
            <div className="grid grid-cols-3 gap-2 text-center bg-[#0d0d0d] p-3 border border-[#222222]">
              <div>
                <span className="text-[10px] font-mono text-[#808080] uppercase block">Plates</span>
                <span className="font-mono text-xs text-[#e0e0e0] font-bold">42 Original</span>
              </div>
              <div className="border-x border-[#222222]">
                <span className="text-[10px] font-mono text-[#808080] uppercase block">Paper</span>
                <span className="font-mono text-xs text-[#e0e0e0] font-bold">160gsm Matte</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#808080] uppercase block">Binding</span>
                <span className="font-mono text-xs text-[#e0e0e0] font-bold">Lay-Flat 180°</span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details & Purchase Options */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e60026]" />
                <span className="font-mono text-xs text-[#ffb3ae] uppercase font-semibold">
                  Official Adult Line Art Publication
                </span>
              </div>

              <h3 className="font-headline text-3xl md:text-4xl text-[#e0e0e0] font-bold uppercase tracking-tight">
                {mainBook.title}
              </h3>

              <p className="font-inter text-sm text-[#b0b0b0] leading-relaxed">
                {mainBook.description}
              </p>

              {/* Included Content Highlight */}
              <div className="bg-[#101010] p-4 border border-[#222222] flex flex-col gap-3">
                <span className="font-mono text-xs text-[#e60026] font-bold uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Includes All 42 High-Density Line Art Pictures:</span>
                </span>
                <ul className="grid grid-cols-2 gap-2 text-xs font-inter text-[#b0b0b0]">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#e60026] rounded-full" />
                    <span>Bondage & Rope Harness Studies</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#e60026] rounded-full" />
                    <span>Grittier Industrial Iron Chains</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#e60026] rounded-full" />
                    <span>Occult & Ceremonial Sigils</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#e60026] rounded-full" />
                    <span>Latex & Gloss Contours</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Price & Purchase Actions */}
            <div className="flex flex-col gap-4 pt-4 border-t border-[#262626]">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-mono text-[#808080] uppercase block">Edition Price</span>
                  <span className="font-headline text-3xl text-[#e0e0e0] font-bold">
                    ${mainBook.price.toFixed(2)}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#ffb3ae] bg-[#e60026]/10 border border-[#e60026]/30 px-2.5 py-1 uppercase">
                  Physical + Digital Instant Access
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onAddToCart(mainBook, 'physical')}
                  className="py-3.5 bg-[#e60026] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#ffb3ae] hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Physical Book</span>
                </button>

                <button
                  onClick={onOpenReadBook}
                  className="py-3.5 bg-[#1c1b1b] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#e60026]" />
                  <span>Read Flipbook</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#808080] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e60026]" />
                <span>Discreet plain black packaging • Ships worldwide in 48 hours</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
