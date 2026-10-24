import React from 'react';
import { AppPage, PlateCategory } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenLegal: () => void;
  onNavigatePage?: (page: AppPage, category?: PlateCategory) => void;
  onOpenCart?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal, onNavigatePage, onOpenCart }) => {
  const handlePageClick = (page: AppPage, category?: PlateCategory) => {
    if (onNavigatePage) {
      onNavigatePage(page, category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('pictures-archive');
    }
  };

  return (
    <footer className="bg-[#0c0c0e] border-t border-[#26262a] flex flex-col gap-8 px-6 md:px-16 py-16 w-full relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageClick('home');
          }}
          className="font-headline text-2xl md:text-3xl text-[#e60026] uppercase tracking-tighter font-bold hover:opacity-90"
        >
          COLOR ME NSFW
        </a>

        <nav className="flex flex-wrap gap-6 font-inter text-xs font-semibold">
          <button
            onClick={() => handlePageClick('studio')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            DECOMPRESS W/ EROTIC ART
          </button>
          <button
            onClick={() => handlePageClick('volume')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            COLOR ME NSFW (Vol. 01)
          </button>
          <button
            onClick={() => handlePageClick('reader')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            FLIPBOOK (IN COLOR)
          </button>
          <button
            onClick={() => handlePageClick('downloads')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            Downloads Center
          </button>
          <button
            onClick={() => handlePageClick('about')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            The Architect (About)
          </button>
          <button
            onClick={() => onOpenCart && onOpenCart()}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            Shopping Cart
          </button>
          <button
            onClick={onOpenLegal}
            className="text-[#888888] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            Age Restriction & Legal Notice
          </button>
        </nav>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#26262a] pt-8 mt-2">
        <p className="font-inter text-xs text-[#888888] italic">
          No animals were harmed in the making of these pages. Humans, however, are debatable.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="font-mono text-[11px] text-[#666666] uppercase tracking-widest">
            © 2026 <span className="text-[#e60026] normal-case">Left Hand Apps</span>. ALL RIGHTS RESERVED.
          </p>
          <button
            onClick={onOpenLegal}
            className="font-mono text-[10px] text-[#e60026] uppercase tracking-widest font-semibold hover:text-[#ffb3ae] transition-colors"
          >
            Age Restriction & Legal Notice (18+)
          </button>
        </div>
      </div>
    </footer>
  );
};
