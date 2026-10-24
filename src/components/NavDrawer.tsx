import React from 'react';
import { 
  X, 
  CircleDot,
  ChevronRight,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { AppPage, PlateCategory } from '../types';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: AppPage;
  activeCategory?: PlateCategory;
  onNavigatePage: (page: AppPage, category?: PlateCategory) => void;
  onOpenCart: () => void;
  onOpenLegal: () => void;
  cartCount?: number;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  activeCategory = 'All',
  onNavigatePage,
  onOpenCart,
  onOpenLegal,
  cartCount = 0,
}) => {
  if (!isOpen) return null;

  const handleSelectPage = (page: AppPage, category?: PlateCategory) => {
    onNavigatePage(page, category);
    onClose();
  };

  const categories: Array<{ name: PlateCategory; count: string; desc: string; icon: string }> = [
    { name: 'Bondage Studies', count: '10 Plates', desc: 'Rope tension, suspension & anatomical contours', icon: '⛓️' },
    { name: 'Sigils & Occult', count: '8 Plates', desc: 'Demon seals, pentagrams & arcane glyphs', icon: '🔮' },
    { name: 'Industrial Chains', count: '8 Plates', desc: 'Steel links, iron lattices & rigging shackles', icon: '⚙️' },
    { name: 'Latex & Silhouette', count: '8 Plates', desc: 'High-gloss contours, corsets & noir sheen', icon: '🖤' },
    { name: 'Erotic Geometry', count: '8 Plates', desc: 'Golden spirals, sacred lines & human form', icon: '📐' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-[#0c0c0e] border-r border-[#26262a] h-full flex flex-col justify-between p-6 md:p-8 z-10 overflow-y-auto shadow-2xl">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[#26262a] pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#e60026] rounded-full animate-pulse" />
              <span className="font-headline text-2xl text-[#ffffff] uppercase font-bold tracking-tighter">
                COLOR ME NSFW
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#888888] hover:text-[#e60026] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Section 1: Main Pages */}
          <div className="mb-6">
            <span className="text-[10px] font-mono text-[#e60026] uppercase font-bold tracking-[0.2em] block mb-3">
              Main Pages
            </span>
            <nav className="flex flex-col gap-1.5">
              {/* Home Page */}
              <button
                onClick={() => handleSelectPage('home')}
                className={`group w-full flex items-center justify-between p-2.5 text-left border transition-all ${
                  currentPage === 'home'
                    ? 'border-[#e60026] text-white font-semibold'
                    : 'border-transparent text-[#888888] hover:text-white hover:bg-[#141416]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-headline text-sm uppercase tracking-wider">
                    Home (Overview)
                  </span>
                </div>
                {currentPage === 'home' && <CircleDot className="w-3.5 h-3.5 text-[#e60026]" />}
              </button>

              {/* Color by Numbers Studio */}
              <button
                onClick={() => handleSelectPage('studio')}
                className={`group w-full flex items-center justify-between p-2.5 text-left border transition-all ${
                  currentPage === 'studio'
                    ? 'border-[#e60026] text-white font-semibold'
                    : 'border-transparent text-[#888888] hover:text-white hover:bg-[#141416]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <span className="font-headline text-sm uppercase tracking-wider block">
                      DECOMPRESS W/ EROTIC ART
                    </span>
                    <span className="text-[10px] font-inter text-[#666666] block">
                      Dark-themed palette studio
                    </span>
                  </div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 font-mono font-bold uppercase ${currentPage === 'studio' ? 'text-white' : 'text-[#888888]'}`}>
                  DARK STUDIO
                </span>
              </button>

              {/* Flagship Volume 01 */}
              <button
                onClick={() => handleSelectPage('volume')}
                className={`group w-full flex items-center justify-between p-2.5 text-left border transition-all ${
                  currentPage === 'volume'
                    ? 'border-[#e60026] text-white font-semibold'
                    : 'border-transparent text-[#888888] hover:text-white hover:bg-[#141416]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-headline text-sm uppercase tracking-wider">
                    COLOR ME NSFW
                    <br />
                    Vol. 01 — The Bound Form
                  </span>
                </div>
                <div className="rotate-12 flex flex-col border border-[#e60026] overflow-hidden shrink-0">
                  <span className="bg-[#e60026] text-white px-1 py-0 text-[7px] font-mono font-bold uppercase">
                    NOW ON SALE!
                  </span>
                  <span className="bg-[#0c0c0e] text-[#e60026] px-1 py-0 text-[7px] font-mono font-bold uppercase">
                    FIRST EDITION
                  </span>
                </div>
              </button>

              {/* FLIPBOOK (IN COLOR) */}
              <button
                onClick={() => handleSelectPage('reader')}
                className={`group w-full flex items-center justify-between p-2.5 text-left border transition-all ${
                  currentPage === 'reader'
                    ? 'border-[#e60026] text-white font-semibold'
                    : 'border-transparent text-[#888888] hover:text-white hover:bg-[#141416]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-headline text-sm uppercase tracking-wider">
                    FLIPBOOK (IN COLOR)
                  </span>
                </div>
                <span className="text-[10px] text-[#666666] font-mono">42 PAGES</span>
              </button>

              {/* Download Center */}
              <button
                onClick={() => handleSelectPage('downloads')}
                className={`group w-full flex items-center justify-between p-2.5 text-left border transition-all ${
                  currentPage === 'downloads'
                    ? 'border-[#e60026] text-white font-semibold'
                    : 'border-transparent text-[#888888] hover:text-white hover:bg-[#141416]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-headline text-sm uppercase tracking-wider">
                    Downloads Center
                  </span>
                </div>
                <span className="text-[10px] text-[#666666] font-mono">FREE PACKS</span>
              </button>

              {/* The Architect */}
              <button
                onClick={() => handleSelectPage('about')}
                className={`group w-full flex items-center justify-between p-2.5 text-left border transition-all ${
                  currentPage === 'about'
                    ? 'border-[#e60026] text-white font-semibold'
                    : 'border-transparent text-[#888888] hover:text-white hover:bg-[#141416]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-headline text-sm uppercase tracking-wider">
                    The Architect (About)
                  </span>
                </div>
                <span className="text-[10px] text-[#666666] font-mono">MANIFESTO</span>
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => {
                  onOpenCart();
                  onClose();
                }}
                className={`group w-full flex items-center justify-between p-2.5 text-left border transition-all ${
                  currentPage === 'cart'
                    ? 'border-[#e60026] text-white font-semibold'
                    : 'border-transparent text-[#888888] hover:text-white hover:bg-[#141416]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-headline text-sm uppercase tracking-wider font-semibold">
                    Shopping Cart
                  </span>
                </div>
                {cartCount > 0 ? (
                  <span className="bg-[#e60026] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                    {cartCount} items
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-[#777777]">Empty</span>
                )}
              </button>
            </nav>
          </div>

          {/* Section 2: Separate Categories By Page */}
          <div className="border-t border-[#26262a] pt-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-[#e60026] uppercase font-bold tracking-[0.2em] block">
                Browse Categories
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => {
                const isCatActive = currentPage === 'category' && activeCategory === cat.name;

                return (
                  <button
                    key={cat.name}
                    onClick={() => handleSelectPage('category', cat.name)}
                    className={`group w-full flex items-center justify-between p-2.5 text-left border transition-all ${
                      isCatActive
                        ? 'border-[#e60026] text-white font-semibold'
                        : 'border-transparent text-[#888888] hover:text-white hover:bg-[#141416]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="font-headline text-xs uppercase tracking-wider block">
                          {cat.name}
                        </span>
                        <span className="text-[10px] font-inter text-[#666666] block truncate max-w-[200px]">
                          {cat.desc}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-mono text-[#888888]">
                        {cat.count}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isCatActive ? 'text-[#e60026]' : 'text-[#555555]'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="pt-5 border-t border-[#26262a] flex flex-col gap-2">
          <button
            onClick={() => {
              onOpenLegal();
              onClose();
            }}
            className="flex items-center gap-2 text-xs text-[#888888] hover:text-[#e60026] uppercase tracking-widest font-semibold"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#e60026]" />
            <span>Age Restriction & Legal Notice (18+)</span>
          </button>
          <p className="font-mono text-[10px] text-[#555555] uppercase">
            Curated Dark Arts Archive • Color By Numbers Edition
          </p>
        </div>
      </div>
    </div>
  );
};
