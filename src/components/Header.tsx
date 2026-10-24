import React from 'react';
import { Menu, ShoppingBag, Palette, Download, BookOpen, Grid, Upload, ChevronRight } from 'lucide-react';
import { AppPage, PlateCategory } from '../types';
import handcuffsImage from '../assets/images/black_handcuffs_transparent_1791069962032.jpg';

interface HeaderProps {
  onOpenNav: () => void;
  onOpenCart: () => void;
  currentPage: AppPage;
  activeCategory?: PlateCategory;
  onNavigatePage: (page: AppPage, category?: PlateCategory) => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNav,
  onOpenCart,
  currentPage,
  activeCategory = 'All',
  onNavigatePage,
  cartCount,
}) => {
  // Page label descriptor
  const getPageDescriptor = () => {
    switch (currentPage) {
      case 'studio':
        return 'Color by Numbers';
      case 'category':
        return activeCategory;
      case 'gallery':
        return '42 Pictures Gallery';
      case 'volume':
        return 'Vol. 01 — The Bound Form';
      case 'reader':
        return 'Flipbook Reader';
      case 'downloads':
        return 'Downloads Center';
      case 'about':
        return 'The Architect';
      default:
        return null;
    }
  };

  const pageDesc = getPageDescriptor();

  return (
    <header className="bg-[#0c0c0e]/95 backdrop-blur-md border-b-4 border-[#26262a] fixed top-0 w-full z-50 h-24 grid grid-cols-3 items-center">
      {/* Left Menu (Column 1) */}
      <div className="flex items-center justify-start">
        <button
          onClick={onOpenNav}
          className="text-[#e0e0e0] hover:text-[#e60026] transition-all p-1.5 md:p-2 bg-[#141418] border-2 border-[#26262a] hover:border-[#e60026] flex items-center justify-center w-[50px] h-[50px]"
          aria-label="Open hamburger menu"
          title="Open Menu & Categories"
        >
          <Menu className="w-4 h-4 md:w-5 md:h-5 text-[#e60026]" />
        </button>
      </div>

      {/* Brand Title & Active Category Breadcrumb (Column 2 - Centered) */}
      <div className="flex flex-col items-center justify-center text-center">
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            onNavigatePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
          className="relative font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter text-[#e60026] font-extrabold uppercase hover:opacity-90 transition-all duration-300 select-none leading-none"
        >
          <img 
            src={handcuffsImage} 
            alt="Handcuffs" 
            className="absolute inset-0 w-full h-full object-contain opacity-60 mix-blend-multiply" 
          />
          COLOR ME NSFW
        </a>

        {pageDesc && (
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#888888] uppercase tracking-widest mt-1">
            <span className="text-[#555555]">/</span>
            <span className="text-[#e0e0e0] font-semibold">{pageDesc}</span>
          </div>
        )}
      </div>

      {/* Right Controls (Column 3 - Right aligned) */}
      <div className="flex items-center justify-end gap-2 md:gap-3">
        {/* Shopping Cart Drawer Trigger */}
        <button
          onClick={onOpenCart}
          className="relative text-[#e0e0e0] hover:text-[#e60026] transition-all p-1.5 bg-[#141418] border-2 border-[#26262a] hover:border-[#e60026] flex items-center justify-center w-[50px] h-[50px]"
          aria-label="Shopping bag"
        >
          <ShoppingBag className="w-[30px] h-[30px] text-[#e60026]" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#e60026] text-white text-[8px] font-mono font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#0c0c0c] shadow-md">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
