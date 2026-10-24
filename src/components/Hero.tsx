import React from 'react';
import { Palette, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { 
  basementProtocolImg, 
  midnightCrossfireImg, 
  steelPulseImg, 
  primalReckoningImg, 
  laceAndLongingImg, 
  tattooFlashImg 
} from '../data/volumes';

interface HeroProps {}

export const Hero: React.FC = () => {
  const showcasePlates = [
    { title: "Basement Protocol", img: basementProtocolImg },
    { title: "Midnight Crossfire", img: midnightCrossfireImg },
    { title: "Steel Pulse", img: steelPulseImg },
    { title: "Primal Reckoning", img: primalReckoningImg },
    { title: "Lace & Longing", img: laceAndLongingImg },
    { title: "Tattoo Flash", img: tattooFlashImg }
  ];

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0d0d0f] border-b border-[#26262a]">
      {/* Background Radial Dots Grid */}
      <div 
        className="absolute inset-0 z-0 bg-black/60 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 md:px-16 flex flex-col items-center gap-6 max-w-5xl py-16">
        <div className="flex flex-col items-center gap-1">
          <div className="text-xs text-[#ffb3ae] tracking-widest uppercase font-semibold">
            DECOMPRESS W/
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/70 border border-[#2a2a30] text-xs text-[#ffb3ae] tracking-widest uppercase font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#e60026]" />
            <span>EROTIC LINE ART COLLECTION FOR COLORING ENTHUSIASTS</span>
          </div>
        </div>

        <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl text-[#ffffff] uppercase tracking-tighter leading-[1.1] max-w-4xl">
          Embrace the <span className="text-[#e60026] italic font-normal">Darkness</span> Within
        </h1>

        {/* Featured Artwork Preview Row */}
        <div className="w-full flex items-center justify-center gap-3 overflow-x-auto py-4 scrollbar-none max-w-4xl">
          {showcasePlates.map((plate, idx) => (
            <div 
              key={idx}
              className="relative w-24 sm:w-28 md:w-32 aspect-[3/4] bg-black border border-[#26262a] hover:border-[#e60026] shadow-xl overflow-hidden shrink-0 transition-transform hover:scale-105 group"
            >
              <img
                src={plate.img}
                alt={plate.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                <span className="text-[9px] font-mono font-bold text-white uppercase truncate">
                  {plate.title}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl pt-8 border-t border-[#26262a]">
          <div className="flex flex-col items-center">
            <span className="font-headline text-xl md:text-2xl font-bold text-white">42</span>
            <span className="text-[10px] font-mono text-[#888888] uppercase">Art Plates</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-headline text-xl md:text-2xl font-bold text-[#e60026]">8</span>
            <span className="text-[10px] font-mono text-[#888888] uppercase">Dark Colors</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-headline text-xl md:text-2xl font-bold text-white">5</span>
            <span className="text-[10px] font-mono text-[#888888] uppercase">Occult Categories</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-headline text-xl md:text-2xl font-bold text-[#e60026]">18+</span>
            <span className="text-[10px] font-mono text-[#888888] uppercase">Archival Spec</span>
          </div>
        </div>
      </div>
    </section>
  );
};
