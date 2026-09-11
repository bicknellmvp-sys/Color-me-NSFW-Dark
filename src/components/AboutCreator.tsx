import React from 'react';
import { CREATOR_INFO } from '../data/volumes';

export const AboutCreator: React.FC = () => {
  return (
    <section id="theleftone" className="py-24 px-6 md:px-16 bg-[#1c1b1b]/90 backdrop-blur-sm border-b border-[#333333] z-10 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Creator Portrait Left */}
        <div className="relative group">
          <div className="absolute -inset-4 border border-[#e60026]/20 scale-95 group-hover:scale-100 transition-transform duration-500 pointer-events-none" />
          <div className="relative aspect-square overflow-hidden bg-black border border-[#333333]">
            <img
              src={CREATOR_INFO.photoUrl}
              alt={CREATOR_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-transparent to-transparent" />
          </div>
        </div>

        {/* Creator Bio Right */}
        <div className="flex flex-col gap-6">
          <span className="font-inter text-xs text-[#e60026] uppercase tracking-[0.25em] font-bold">
            {CREATOR_INFO.name}
          </span>
          
          <h2 className="font-headline text-3xl md:text-4xl text-[#e0e0e0] uppercase tracking-tighter font-bold">
            {CREATOR_INFO.title}
          </h2>

          <div className="h-[1px] w-20 bg-[#e60026]" />

          <p className="font-inter text-base text-[#b0b0b0] leading-relaxed">
            {CREATOR_INFO.bio}
          </p>

          <p className="font-headline text-lg text-[#ffb3ae] italic leading-relaxed border-l-2 border-[#e60026] pl-4 py-1">
            {CREATOR_INFO.quote}
          </p>
        </div>
      </div>
    </section>
  );
};
