import React from 'react';
import { Menu, ShoppingBag, Palette, Download, BookOpen, Grid, Upload } from 'lucide-react';

interface HeaderProps {
  onOpenNav: () => void;
  onOpenCart: () => void;
  onOpenStudio: () => void;
  onOpenDownloads: () => void;
  onOpenReadBook: () => void;
  onOpenBatchUpload: () => void;
  onScrollToPictures: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNav,
  onOpenCart,
  onOpenStudio,
  onOpenDownloads,
  onOpenReadBook,
  onOpenBatchUpload,
  onScrollToPictures,
  cartCount
}) => {
  return (
    <header className="bg-[#0c0c0c] border-b border-[#333333] fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-12 h-20">
      {/* Left Menu & Quick Tools */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onOpenNav}
          className="text-[#e0e0e0] hover:text-[#e60026] transition-colors p-2 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <button
          onClick={onOpenBatchUpload}
          className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-white bg-[#e60026] hover:bg-[#ffb3ae] hover:text-black uppercase px-2.5 py-1.5 transition-all duration-300"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Import Pictures</span>
        </button>

        <button
          onClick={onScrollToPictures}
          className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#b0b0b0] hover:text-[#e60026] uppercase border border-[#333333] px-2.5 py-1.5 transition-all duration-300 hover:border-[#e60026]"
        >
          <Grid className="w-3.5 h-3.5 text-[#e60026]" />
          <span>42 Pictures</span>
        </button>

        <button
          onClick={onOpenReadBook}
          className="hidden lg:flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#b0b0b0] hover:text-[#e60026] uppercase border border-[#333333] px-2.5 py-1.5 transition-all duration-300 hover:border-[#e60026]"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#e60026]" />
          <span>Read Book</span>
        </button>
      </div>

      {/* Brand Title */}
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="font-headline text-2xl md:text-3xl tracking-tighter text-[#e60026] font-bold uppercase hover:opacity-90 transition-opacity"
      >
        COLOR ME NSFW
      </a>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onOpenStudio}
          className="hidden lg:flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#b0b0b0] hover:text-[#e60026] uppercase border border-[#333333] px-2.5 py-1.5 transition-all duration-300 hover:border-[#e60026]"
        >
          <Palette className="w-3.5 h-3.5 text-[#e60026]" />
          <span>Color Studio</span>
        </button>

        <button
          onClick={onOpenDownloads}
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#b0b0b0] hover:text-[#e60026] uppercase border border-[#333333] px-2.5 py-1.5 transition-all duration-300 hover:border-[#e60026]"
        >
          <Download className="w-3.5 h-3.5 text-[#e60026]" />
          <span>Downloads</span>
        </button>

        <button
          onClick={onOpenCart}
          className="relative text-[#e0e0e0] hover:text-[#e60026] transition-colors p-2 focus:outline-none"
          aria-label="Shopping bag"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#e60026] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-[#0c0c0c]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
