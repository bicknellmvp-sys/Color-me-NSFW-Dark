import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Palette, Printer } from 'lucide-react';
import { ALL_42_PLATES, PlateItem } from '../data/plates';

interface BookPreviewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  plates?: PlateItem[];
  onOpenStudioWithPage: (svgUri: string, title: string) => void;
}

export const BookPreviewerModal: React.FC<BookPreviewerModalProps> = ({
  isOpen,
  onClose,
  plates = ALL_42_PLATES,
  onOpenStudioWithPage,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentPlate = plates[currentPageIndex] || plates[0] || ALL_42_PLATES[0];

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev + 1) % plates.length);
  };

  const handlePrev = () => {
    setCurrentPageIndex((prev) => (prev - 1 + plates.length) % plates.length);
  };

  const handlePrintPage = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>COLOR ME NSFW — Plate ${currentPlate.plateNumber}</title>
            <style>
              body { margin: 0; display: flex; items-center: center; justify-content: center; background: white; }
              img { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <img src="${currentPlate.svgDataUri}" onload="window.print(); window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      {/* Box */}
      <div className="relative w-full max-w-4xl bg-[#0c0c0c] border border-[#e60026] p-6 md:p-8 shadow-2xl flex flex-col gap-6 max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#333333] pb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[#e60026]" />
            <div>
              <span className="font-mono text-xs text-[#e60026] uppercase font-bold block">
                Official Book Previewer • {plates.length} Pages
              </span>
              <h2 className="font-headline text-xl md:text-2xl text-[#e0e0e0] font-bold uppercase tracking-tight">
                COLOR ME NSFW: Vol. 01 — The Bound Form
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#b0b0b0] hover:text-[#e60026] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Page Reader stage */}
        <div className="relative flex-1 bg-black border border-[#222222] min-h-[350px] md:min-h-[480px] flex items-center justify-center overflow-hidden">
          
          {/* Previous Page Button */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/80 hover:bg-[#e60026] text-white border border-[#333333] hover:border-[#e60026] transition-all"
            title="Previous Page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Current Page Display */}
          <div className="w-full h-full max-h-[500px] p-4 flex flex-col items-center justify-center">
            <img
              src={currentPlate.svgDataUri}
              alt={currentPlate.title}
              referrerPolicy="no-referrer"
              className="max-h-[420px] w-auto object-contain shadow-2xl border border-[#222222]"
            />
          </div>

          {/* Next Page Button */}
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/80 hover:bg-[#e60026] text-white border border-[#333333] hover:border-[#e60026] transition-all"
            title="Next Page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Floating Page Badge */}
          <div className="absolute top-4 left-4 bg-black/80 border border-[#333333] px-3 py-1 font-mono text-xs text-[#e60026] font-bold uppercase">
            Page {currentPageIndex + 1} of {plates.length}
          </div>
        </div>

        {/* Page Meta & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#141414] p-4 border border-[#222222]">
          <div>
            <span className="font-mono text-[10px] text-[#808080] uppercase block">
              {currentPlate.category} • Plate #{currentPlate.plateNumber}
            </span>
            <h4 className="font-headline text-lg text-[#e0e0e0] font-bold">
              {currentPlate.title}
            </h4>
            <p className="font-inter text-xs text-[#b0b0b0]">
              {currentPlate.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onOpenStudioWithPage(currentPlate.svgDataUri, `Plate #${currentPlate.plateNumber} - ${currentPlate.title}`);
                onClose();
              }}
              className="px-4 py-2.5 bg-[#e60026] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center gap-2 shrink-0"
            >
              <Palette className="w-4 h-4" />
              <span>Color Page</span>
            </button>

            <button
              onClick={handlePrintPage}
              className="px-3 py-2.5 bg-[#222222] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] text-xs font-semibold uppercase transition-colors shrink-0"
              title="Print Page"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
