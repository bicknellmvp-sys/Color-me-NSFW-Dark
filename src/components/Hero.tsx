import React from 'react';
import { Palette, Sparkles, BookOpen } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onStudioClick: () => void;
  onReadBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onStudioClick, onReadBookClick }) => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#131313] border-b border-[#333333]">
      {/* Background Radial Dots Grid */}
      <div 
        className="absolute inset-0 z-0 bg-black/60 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-[#0c0c0c]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 md:px-16 flex flex-col items-center gap-6 max-w-4xl py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-[#333333] text-xs text-[#ffb3ae] tracking-widest uppercase font-semibold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#e60026]" />
          <span>Flagship Book & 42-Plate Line Art Collection</span>
        </div>

        <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl text-[#e0e0e0] uppercase tracking-tighter leading-[1.1] max-w-3xl">
          Embrace the <span className="text-[#e60026] italic font-normal">Darkness</span> Within
        </h1>

        <p className="font-inter text-base md:text-lg text-[#b0b0b0] max-w-xl leading-relaxed">
          <strong className="text-[#e0e0e0]">COLOR ME NSFW: Vol. 01 — The Bound Form</strong>. One flagship publication featuring 42 high-density vector line art illustrations designed for physical archival ink and interactive digital coloring.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#e60026] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#ffb3ae] hover:text-black transition-all duration-300 glow-effect"
          >
            Browse 42 Pictures
          </button>

          <button
            onClick={onReadBookClick}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#1c1b1b] text-[#e0e0e0] border border-[#333333] font-semibold text-xs uppercase tracking-widest hover:border-[#e60026] hover:text-[#e60026] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <BookOpen className="w-4 h-4 text-[#e60026]" />
            <span>Read Book (Flipbook)</span>
          </button>

          <button
            onClick={onStudioClick}
            className="w-full sm:w-auto px-6 py-3.5 bg-black/70 text-[#e0e0e0] border border-[#333333] font-semibold text-xs uppercase tracking-widest hover:border-[#e60026] hover:text-[#e60026] transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Palette className="w-4 h-4 text-[#e60026]" />
            <span>Digital Studio</span>
          </button>
        </div>
      </div>
    </section>
  );
};
