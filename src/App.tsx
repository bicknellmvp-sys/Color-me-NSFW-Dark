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
import { BatchUploadModal } from './components/BatchUploadModal';
import { VOLUMES_DATA, SVG_SOLOMONIC_DEMON } from './data/volumes';
import { ALL_42_PLATES, PlateItem } from './data/plates';
import { ArchiveVolume, CartItem } from './types';

export default function App() {
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

  // Section Navigation
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStudioWithVolume = (volume: ArchiveVolume) => {
    setSelectedVolume(volume);
    setCustomStudioPlate(null);
    setIsStudioOpen(true);
  };

  const handleOpenStudioWithPlate = (svgUri: string, title: string) => {
    setCustomStudioPlate({ svgUri, title });
    setIsStudioOpen(true);
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen relative bg-[#131313] text-[#e0e0e0] font-inter overflow-x-hidden">
      {/* Age Gate 18+ Advisory */}
      <AgeGateModal />

      {/* Fixed Watermark Sigil Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-10">
        <img
          alt="Laevus Sigil"
          referrerPolicy="no-referrer"
          className="w-full max-w-none md:w-[120%] h-auto object-contain mix-blend-screen scale-150"
          src={SVG_SOLOMONIC_DEMON}
        />
      </div>

      {/* Top Header */}
      <Header
        onOpenNav={() => setIsNavOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenDownloads={() => setIsDownloadsOpen(true)}
        onOpenReadBook={() => setIsBookReaderOpen(true)}
        onOpenBatchUpload={() => setIsBatchUploadOpen(true)}
        onScrollToPictures={() => scrollToSection('pictures-archive')}
        cartCount={cartTotalCount}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 relative z-10">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('pictures-archive')}
          onStudioClick={() => setIsStudioOpen(true)}
          onReadBookClick={() => setIsBookReaderOpen(true)}
        />

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
          onOpenBatchUpload={() => setIsBatchUploadOpen(true)}
        />

        {/* The Ink & Ledger Newsletter */}
        <InkLedger />

        {/* Upcoming Release Teaser */}
        <UpcomingRelease />

        {/* About Creator: The Architect */}
        <AboutCreator />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenLegal={() => setIsLegalOpen(true)}
      />

      {/* Navigation Drawer */}
      <NavDrawer
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onNavigate={scrollToSection}
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenDownloads={() => setIsDownloadsOpen(true)}
        onOpenReadBook={() => setIsBookReaderOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLegal={() => setIsLegalOpen(true)}
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
          setIsStudioOpen(true);
        }}
      />

      {/* Interactive Digital Ink Studio */}
      <DigitalColoringStudio
        isOpen={isStudioOpen}
        onClose={() => {
          setIsStudioOpen(false);
          setCustomStudioPlate(null);
        }}
        selectedVolume={selectedVolume}
        customPlate={customStudioPlate}
      />

      {/* Official Book Reader / Flipbook Modal */}
      <BookPreviewerModal
        isOpen={isBookReaderOpen}
        onClose={() => setIsBookReaderOpen(false)}
        plates={activePlates}
        onOpenStudioWithPage={handleOpenStudioWithPlate}
      />

      {/* Batch Import Pictures Modal */}
      <BatchUploadModal
        isOpen={isBatchUploadOpen}
        onClose={() => setIsBatchUploadOpen(false)}
        customPlates={customPlates}
        onSaveCustomPlates={handleSaveCustomPlates}
        onResetToDefault={handleResetCustomPlates}
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
    </div>
  );
}
