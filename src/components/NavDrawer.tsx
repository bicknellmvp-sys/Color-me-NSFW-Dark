import React from 'react';
import { X, Palette, BookOpen, Flame, User, ShoppingBag, ShieldCheck, Download, Grid } from 'lucide-react';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenStudio: () => void;
  onOpenDownloads: () => void;
  onOpenReadBook: () => void;
  onOpenCart: () => void;
  onOpenLegal: () => void;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenStudio,
  onOpenDownloads,
  onOpenReadBook,
  onOpenCart,
  onOpenLegal,
}) => {
  if (!isOpen) return null;

  const handleLinkClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-[#0c0c0c] border-r border-[#333333] h-full flex flex-col justify-between p-8 z-10 overflow-y-auto animate-slide-in-left">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[#333333] pb-6 mb-8">
            <span className="font-headline text-2xl text-[#e60026] uppercase font-bold tracking-tighter">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-2 text-[#b0b0b0] hover:text-[#e60026] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-5">
            <button
              onClick={() => handleLinkClick(() => onNavigate('archives'))}
              className="group flex items-center justify-between text-left py-2 border-b border-[#1c1b1b] hover:border-[#e60026] transition-all"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#e60026]" />
                <span className="font-headline text-lg text-[#e0e0e0] group-hover:text-[#e60026] uppercase tracking-wider font-semibold">
                  The Flagship Book (Vol. 01)
                </span>
              </div>
              <span className="text-xs text-[#808080] font-mono">BOOK</span>
            </button>

            <button
              onClick={() => handleLinkClick(() => onNavigate('pictures-archive'))}
              className="group flex items-center justify-between text-left py-2 border-b border-[#1c1b1b] hover:border-[#e60026] transition-all"
            >
              <div className="flex items-center gap-3">
                <Grid className="w-5 h-5 text-[#e60026]" />
                <span className="font-headline text-lg text-[#e0e0e0] group-hover:text-[#e60026] uppercase tracking-wider font-semibold">
                  The 42-Plate Picture Archive
                </span>
              </div>
              <span className="text-xs text-[#e60026] font-mono font-bold">42 PICS</span>
            </button>

            <button
              onClick={() => handleLinkClick(onOpenReadBook)}
              className="group flex items-center justify-between text-left py-2 border-b border-[#1c1b1b] hover:border-[#e60026] transition-all bg-[#1c1b1b]/50 px-3 py-2.5 border-l-2 border-l-[#e60026]"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#e60026]" />
                <div>
                  <span className="font-headline text-lg text-[#e0e0e0] group-hover:text-[#e60026] uppercase tracking-wider font-semibold block">
                    Read Book (Flipbook)
                  </span>
                  <span className="text-[11px] text-[#ffb3ae] font-inter block">
                    Page through all 42 illustrations
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#e60026] font-mono font-bold">READER</span>
            </button>

            <button
              onClick={() => handleLinkClick(onOpenStudio)}
              className="group flex items-center justify-between text-left py-2 border-b border-[#1c1b1b] hover:border-[#e60026] transition-all"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-[#e60026]" />
                <div>
                  <span className="font-headline text-lg text-[#e0e0e0] group-hover:text-[#e60026] uppercase tracking-wider font-semibold block">
                    Digital Color Studio
                  </span>
                  <span className="text-[11px] text-[#b0b0b0] font-inter block">
                    Paint line art in browser
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#808080] font-mono">STUDIO</span>
            </button>

            <button
              onClick={() => handleLinkClick(onOpenDownloads)}
              className="group flex items-center justify-between text-left py-2 border-b border-[#1c1b1b] hover:border-[#e60026] transition-all"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-[#e60026]" />
                <span className="font-headline text-lg text-[#e0e0e0] group-hover:text-[#e60026] uppercase tracking-wider font-semibold">
                  Downloads Center
                </span>
              </div>
              <span className="text-xs text-[#808080] font-mono">FREE</span>
            </button>

            <button
              onClick={() => handleLinkClick(() => onNavigate('slave-a-demon'))}
              className="group flex items-center justify-between text-left py-2 border-b border-[#1c1b1b] hover:border-[#e60026] transition-all"
            >
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#e60026]" />
                <span className="font-headline text-lg text-[#e0e0e0] group-hover:text-[#e60026] uppercase tracking-wider font-semibold">
                  Slave a Demon (Upcoming)
                </span>
              </div>
              <span className="text-xs text-[#808080] font-mono">02</span>
            </button>

            <button
              onClick={() => handleLinkClick(() => onNavigate('theleftone'))}
              className="group flex items-center justify-between text-left py-2 border-b border-[#1c1b1b] hover:border-[#e60026] transition-all"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-[#e60026]" />
                <span className="font-headline text-lg text-[#e0e0e0] group-hover:text-[#e60026] uppercase tracking-wider font-semibold">
                  The Architect
                </span>
              </div>
              <span className="text-xs text-[#808080] font-mono">03</span>
            </button>

            <button
              onClick={() => handleLinkClick(onOpenCart)}
              className="group flex items-center justify-between text-left py-2 border-b border-[#1c1b1b] hover:border-[#e60026] transition-all"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#e60026]" />
                <span className="font-headline text-lg text-[#e0e0e0] group-hover:text-[#e60026] uppercase tracking-wider font-semibold">
                  Shopping Bag
                </span>
              </div>
              <span className="text-xs text-[#808080] font-mono">CART</span>
            </button>
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="pt-6 border-t border-[#333333] flex flex-col gap-3">
          <button
            onClick={() => handleLinkClick(onOpenLegal)}
            className="flex items-center gap-2 text-xs text-[#b0b0b0] hover:text-[#e60026] uppercase tracking-widest font-semibold"
          >
            <ShieldCheck className="w-4 h-4 text-[#e60026]" />
            <span>Age Restriction & Legal Notice</span>
          </button>
          <p className="font-mono text-[10px] text-[#808080] uppercase">
            Curated Dark Arts Archive © 2024
          </p>
        </div>
      </div>
    </div>
  );
};
