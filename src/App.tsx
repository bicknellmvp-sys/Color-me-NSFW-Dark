import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedArchives } from './components/FeaturedArchives';
import { PlatesArchiveGallery } from './components/PlatesArchiveGallery';
import { BookPreviewerModal } from './components/BookPreviewerModal';
import { InkLedger } from './components/InkLedger';
import { UpcomingRelease } from './components/UpcomingRelease';
import { AboutCreator } from './components/AboutCreator';
import { Footer } from './components/Footer';
import { NavDrawer } from './components/NavDrawer';
import { CartDrawer } from './components/CartDrawer';
import { VolumeDetailModal } from './components/VolumeDetailModal';
import { DigitalColoringStudio } from './components/DigitalColoringStudio';
import { LegalModal } from './components/LegalModal';
import { AgeGateModal } from './components/AgeGateModal';
import { DownloadCenterModal } from './components/DownloadCenterModal';
import { VOLUMES_DATA, SVG_SOLOMONIC_DEMON } from './data/volumes';
import { ALL_42_PLATES, PlateItem } from './data/plates';
import { ArchiveVolume, CartItem, AppPage, PlateCategory } from './types';

export default function App() {
  // Navigation & Page routing state
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [activeCategory, setActiveCategory] = useState<PlateCategory>('All');

  // Modal states
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isBookReaderOpen, setIsBookReaderOpen] = useState(false);
  const [isBatchUploadOpen, setIsBatchUploadOpen] = useState(false);

  // Custom plates state (loaded from localStorage if present)
  const [customPlates, setCustomPlates] = useState<PlateItem[]>(() => {
    try {
      const saved = localStorage.getItem('color_me_nsfw_custom_plates');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load custom plates', e);
    }
    return [];
  });

  const activePlates = customPlates.length > 0 ? customPlates : ALL_42_PLATES;

  // Selected volume for detail modal
  const [selectedVolume, setSelectedVolume] = useState<ArchiveVolume | null>(null);

  // Custom plate selected for coloring studio
  const [customStudioPlate, setCustomStudioPlate] = useState<{ svgUri: string; title: string } | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      volume: VOLUMES_DATA[0],
      quantity: 1,
      format: 'physical'
    }
  ]);

  const handleSaveCustomPlates = (plates: PlateItem[]) => {
    setCustomPlates(plates);
    try {
      localStorage.setItem('color_me_nsfw_custom_plates', JSON.stringify(plates));
    } catch (e) {
      console.error('Failed to save custom plates to localStorage', e);
    }
  };

  const handleResetCustomPlates = () => {
    setCustomPlates([]);
    try {
      localStorage.removeItem('color_me_nsfw_custom_plates');
    } catch (e) {
      console.error('Failed to reset custom plates', e);
    }
  };

  // Cart Handlers
  const handleAddToCart = (
    volume: ArchiveVolume,
    format: 'physical' | 'digital' | 'bundle' = 'physical'
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.volume.id === volume.id && item.format === format
      );
      if (existing) {
        return prev.map((item) =>
          item.volume.id === volume.id && item.format === format
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { volume, quantity: 1, format }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (volumeId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.volume.id === volumeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (volumeId: string) => {
    setCartItems((prev) => prev.filter((item) => item.volume.id !== volumeId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Page Navigation Handler
  const handleNavigatePage = (page: AppPage, category?: PlateCategory) => {
    setCurrentPage(page);
    if (category) {
      setActiveCategory(category);
    }
    // If navigating to reader or downloads, open corresponding modal as well
    if (page === 'reader') {
      setIsBookReaderOpen(true);
    } else if (page === 'downloads') {
      setIsDownloadsOpen(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section Navigation (for smooth scrolling within pages)
  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStudioWithVolume = (volume: ArchiveVolume) => {
    setSelectedVolume(volume);
    setCustomStudioPlate(null);
    setCurrentPage('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStudioWithPlate = (svgUri: string, title: string) => {
    setCustomStudioPlate({ svgUri, title });
    setCurrentPage('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen relative bg-[#09090b] text-[#e0e0e0] font-inter overflow-x-hidden">
      {/* Age Gate 18+ Advisory */}
      <AgeGateModal />



      {/* Top Header */}
      <Header
        onOpenNav={() => setIsNavOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        currentPage={currentPage}
        activeCategory={activeCategory}
        onNavigatePage={handleNavigatePage}
        cartCount={cartTotalCount}
      />

      {/* Dynamic Page Views based on Hamburger Menu & Navigation */}
      <main className="flex-grow pt-24 relative z-10">
        
        {/* PAGE 1: Dedicated Color by Numbers Studio */}
        {currentPage === 'studio' && (
          <DigitalColoringStudio
            isOpen={true}
            isPageMode={true}
            onClose={() => setCurrentPage('home')}
            selectedVolume={selectedVolume}
            customPlate={customStudioPlate}
          />
        )}

        {/* PAGE 2: Dedicated Category Page (Separate page via hamburger menu) */}
        {currentPage === 'category' && (
          <div>
            <PlatesArchiveGallery
              plates={activePlates}
              initialCategory={activeCategory}
              isCategoryPageMode={true}
              onSelectCategory={(cat) => setActiveCategory(cat)}
              onOpenStudioWithPlate={handleOpenStudioWithPlate}
              onOpenDownloads={() => setIsDownloadsOpen(true)}
            />
          </div>
        )}

        {/* PAGE 3: All 42 Plates Gallery Page */}
        {currentPage === 'gallery' && (
          <div>
            <PlatesArchiveGallery
              plates={activePlates}
              initialCategory="All"
              isCategoryPageMode={true}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                if (cat !== 'All') {
                  setCurrentPage('category');
                }
              }}
              onOpenStudioWithPlate={handleOpenStudioWithPlate}
              onOpenDownloads={() => setIsDownloadsOpen(true)}
            />
          </div>
        )}

        {/* PAGE 4: The Flagship Volume 01 Page */}
        {currentPage === 'volume' && (
          <div className="py-12">
            <FeaturedArchives
              volumes={VOLUMES_DATA}
              onSelectVolume={(vol) => setSelectedVolume(vol)}
              onAddToCart={handleAddToCart}
              onOpenStudioWithVolume={handleOpenStudioWithVolume}
              onOpenReadBook={() => setIsBookReaderOpen(true)}
            />
            <PlatesArchiveGallery
              plates={activePlates}
              initialCategory="All"
              onOpenStudioWithPlate={handleOpenStudioWithPlate}
              onOpenDownloads={() => setIsDownloadsOpen(true)}
            />
          </div>
        )}

        {/* PAGE 5: The Architect (About & Manifesto) */}
        {currentPage === 'about' && (
          <div className="py-12">
            <InkLedger />
          </div>
        )}

        {/* PAGE 6: Home / Overview Page (Default) */}
        {currentPage === 'home' && (
          <>
        {/* PAGE 6: Home / Overview Page (Default) */}
        {currentPage === 'home' && (
          <>
            {/* Featured Flagship Book Section */}
            <FeaturedArchives
              volumes={VOLUMES_DATA}
              onSelectVolume={(vol) => setSelectedVolume(vol)}
              onAddToCart={handleAddToCart}
              onOpenStudioWithVolume={handleOpenStudioWithVolume}
              onOpenReadBook={() => setIsBookReaderOpen(true)}
            />

            {/* Line Art Picture Gallery */}
            <PlatesArchiveGallery
              plates={activePlates}
              onOpenStudioWithPlate={handleOpenStudioWithPlate}
              onOpenDownloads={() => setIsDownloadsOpen(true)}
              onSelectCategory={(cat) => {
                if (cat !== 'All') {
                  handleNavigatePage('category', cat);
                }
              }}
            />
          </>
        )}
          </>
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenLegal={() => setIsLegalOpen(true)}
        onNavigatePage={handleNavigatePage}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Navigation Drawer (Separated Options & Categories by Page) */}
      <NavDrawer
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        currentPage={currentPage}
        activeCategory={activeCategory}
        onNavigatePage={handleNavigatePage}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLegal={() => setIsLegalOpen(true)}
        cartCount={cartTotalCount}
      />

      {/* Shopping Bag / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Volume Detail Modal */}
      <VolumeDetailModal
        volume={selectedVolume}
        onClose={() => setSelectedVolume(null)}
        onAddToCart={handleAddToCart}
        onOpenStudio={(vol) => {
          setSelectedVolume(vol);
          setCurrentPage('studio');
        }}
      />

      {/* Modal fallback for DigitalColoringStudio if opened as modal */}
      {isStudioOpen && currentPage !== 'studio' && (
        <DigitalColoringStudio
          isOpen={isStudioOpen}
          onClose={() => {
            setIsStudioOpen(false);
            setCustomStudioPlate(null);
          }}
          selectedVolume={selectedVolume}
          customPlate={customStudioPlate}
        />
      )}

      {/* Official Book Reader / Flipbook Modal */}
      <BookPreviewerModal
        isOpen={isBookReaderOpen}
        onClose={() => setIsBookReaderOpen(false)}
        plates={activePlates}
        onOpenStudioWithPage={handleOpenStudioWithPlate}
      />

      {/* Download Center Modal */}
      <DownloadCenterModal
        isOpen={isDownloadsOpen}
        onClose={() => setIsDownloadsOpen(false)}
      />

      {/* Legal Notice Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
      />

      {/* Native Mobile Bottom App Bar (Android / Mobile Optimized) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-md border-t border-[#26262a] flex items-center justify-around py-2 px-2 md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl">
        <button
          onClick={() => handleNavigatePage('home')}
          className={`flex flex-col items-center gap-0.5 transition-colors p-1 ${currentPage === 'home' ? 'text-[#e60026]' : 'text-[#888888] hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-lg">home</span>
          <span className="text-[9px] font-mono uppercase tracking-wider font-bold">Home</span>
        </button>
        <button
          onClick={() => handleNavigatePage('gallery')}
          className={`flex flex-col items-center gap-0.5 transition-colors p-1 ${currentPage === 'gallery' || currentPage === 'category' ? 'text-[#e60026]' : 'text-[#888888] hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-lg">grid_view</span>
          <span className="text-[9px] font-mono uppercase tracking-wider font-bold">Gallery</span>
        </button>
        <button
          onClick={() => handleNavigatePage('studio')}
          className={`flex flex-col items-center gap-0.5 transition-colors p-1 ${currentPage === 'studio' ? 'text-[#e60026]' : 'text-[#888888] hover:text-white'}`}
        >
          <span className="material-symbols-outlined text-lg">palette</span>
          <span className="text-[9px] font-mono uppercase tracking-wider font-bold">Studio</span>
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[#888888] hover:text-white relative p-1"
        >
          <span className="material-symbols-outlined text-lg">shopping_bag</span>
          <span className="text-[9px] font-mono uppercase tracking-wider font-bold">Cart</span>
          {cartTotalCount > 0 && (
            <span className="absolute -top-0.5 right-1.5 w-3.5 h-3.5 bg-[#e60026] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {cartTotalCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}
