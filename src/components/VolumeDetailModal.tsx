import React, { useState } from 'react';
import { X, ShoppingBag, Palette, Book, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { ArchiveVolume } from '../types';

interface VolumeDetailModalProps {
  volume: ArchiveVolume | null;
  onClose: () => void;
  onAddToCart: (volume: ArchiveVolume, format: 'physical' | 'digital' | 'bundle') => void;
  onOpenStudio: (volume: ArchiveVolume) => void;
}

export const VolumeDetailModal: React.FC<VolumeDetailModalProps> = ({
  volume,
  onClose,
  onAddToCart,
  onOpenStudio,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'digital' | 'bundle'>('physical');
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!volume) return null;

  const getFormatPrice = () => {
    if (selectedFormat === 'digital') return 14.00;
    if (selectedFormat === 'bundle') return volume.price + 10.00;
    return volume.price;
  };

  const handleAdd = () => {
    onAddToCart(volume, selectedFormat);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-[#0c0c0c] border border-[#333333] max-h-[90vh] overflow-y-auto z-10 shadow-2xl p-6 md:p-10 flex flex-col gap-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#b0b0b0] hover:text-[#e60026] transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Image & Sample Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-black border border-[#333333] overflow-hidden group">
              <img
                src={volume.samplePages[activeSampleIndex] || volume.coverImage}
                alt={volume.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain bg-black"
              />
              <div className="absolute top-3 left-3 bg-black/70 border border-[#333333] px-3 py-1 text-[11px] font-mono text-[#ffb3ae] uppercase">
                {volume.badge}
              </div>
            </div>

            {/* Thumbnails */}
            {volume.samplePages.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {volume.samplePages.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSampleIndex(idx)}
                    className={`w-16 h-16 bg-black border shrink-0 overflow-hidden ${
                      activeSampleIndex === idx ? 'border-[#e60026]' : 'border-[#333333] opacity-60'
                    }`}
                  >
                    <img src={sample} alt="Sample preview" referrerPolicy="no-referrer" className="w-full h-full object-contain bg-black" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchase */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-xs text-[#e60026] uppercase tracking-widest block font-semibold mb-1">
                {volume.volNumber} Archive
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-[#e0e0e0] font-bold uppercase tracking-tight">
                {volume.title}
              </h2>
              <p className="font-inter text-sm text-[#ffb3ae] mt-1 italic">
                {volume.subtitle}
              </p>
            </div>

            <p className="font-inter text-sm text-[#b0b0b0] leading-relaxed border-l-2 border-[#e60026] pl-3">
              {volume.description}
            </p>

            {/* Spec breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#b0b0b0] bg-[#1c1b1b] p-4 border border-[#333333]">
              <div>
                <span className="text-[#808080] block text-[10px] uppercase">Pages</span>
                <span className="text-[#e0e0e0] font-semibold">{volume.pagesCount} Line Vectors</span>
              </div>
              <div>
                <span className="text-[#808080] block text-[10px] uppercase">Release</span>
                <span className="text-[#e0e0e0] font-semibold">{volume.releaseDate}</span>
              </div>
              <div className="col-span-2 border-t border-[#333333] pt-2 mt-1">
                <span className="text-[#808080] block text-[10px] uppercase">Paper Stock</span>
                <span className="text-[#e0e0e0]">{volume.paperSpec}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#808080] block text-[10px] uppercase">Binding</span>
                <span className="text-[#e0e0e0]">{volume.bindingSpec}</span>
              </div>
            </div>

            {/* Format Picker */}
            <div>
              <label className="block text-xs uppercase text-[#b0b0b0] font-semibold mb-2">
                Select Format Edition:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedFormat('physical')}
                  className={`p-3 text-left border text-xs font-mono flex flex-col justify-between transition-colors ${
                    selectedFormat === 'physical'
                      ? 'border-[#e60026] bg-[#201f1f] text-white'
                      : 'border-[#333333] bg-black text-[#b0b0b0] hover:border-[#b0b0b0]'
                  }`}
                >
                  <span className="font-semibold block">Physical</span>
                  <span className="text-[#e60026] mt-1">${volume.price.toFixed(2)}</span>
                </button>

                <button
                  onClick={() => setSelectedFormat('digital')}
                  className={`p-3 text-left border text-xs font-mono flex flex-col justify-between transition-colors ${
                    selectedFormat === 'digital'
                      ? 'border-[#e60026] bg-[#201f1f] text-white'
                      : 'border-[#333333] bg-black text-[#b0b0b0] hover:border-[#b0b0b0]'
                  }`}
                >
                  <span className="font-semibold block">Digital PDF</span>
                  <span className="text-[#e60026] mt-1">$14.00</span>
                </button>

                <button
                  onClick={() => setSelectedFormat('bundle')}
                  className={`p-3 text-left border text-xs font-mono flex flex-col justify-between transition-colors ${
                    selectedFormat === 'bundle'
                      ? 'border-[#e60026] bg-[#201f1f] text-white'
                      : 'border-[#333333] bg-black text-[#b0b0b0] hover:border-[#b0b0b0]'
                  }`}
                >
                  <span className="font-semibold block">Book + Digital</span>
                  <span className="text-[#e60026] mt-1">${(volume.price + 10).toFixed(2)}</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="flex-1 py-4 bg-[#e60026] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center justify-center gap-2 glow-effect"
              >
                {added ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Edition (${getFormatPrice().toFixed(2)})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onOpenStudio(volume);
                  onClose();
                }}
                className="py-4 px-6 bg-black border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Palette className="w-4 h-4 text-[#e60026]" />
                <span>Color Line Art Online</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
