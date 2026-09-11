import React, { useState } from 'react';
import { X, Download, FileText, Image, Check, Sparkles, Printer } from 'lucide-react';
import { VOLUMES_DATA, UPCOMING_VOLUME } from '../data/volumes';

interface DownloadCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadCenterModal: React.FC<DownloadCenterModalProps> = ({ isOpen, onClose }) => {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const downloadSampleImage = (url: string, filename: string) => {
    // Generate downloadable image or canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 800;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        // Add watermark line art text
        ctx.font = '24px serif';
        ctx.fillStyle = '#333333';
        ctx.fillText('COLOR ME NSFW — SAMPLE ARCHIVE LINE ART', 40, canvas.height - 40);

        const a = document.createElement('a');
        a.download = `${filename}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
      }
    };
    setDownloadedId(filename);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  const downloadAllPacksZip = () => {
    // Create text summary / sample pack file
    const content = `================================================
COLOR ME NSFW — DIGITAL ARCHIVE SAMPLER PACK
================================================

Included Line Art Works:
1. Vol. 01 — The Bound Form (Intricate linework study)
2. Vol. 02 — Basement Protocol (Gritty industrial textures)
3. Vol. 03 — Obsidian & Silk (Sensual geometric contrast)
4. Ritual Vol — Slave a Demon the Solomonic Way (Solomonic Sigils)

Artist: The Architect (Laevus)
Website: COLOR ME NSFW

Instructions:
Import these line art files into your favorite digital painting software (Procreate, Photoshop, Photoshop Elements, Clip Studio Paint) or print on 160gsm+ heavyweight uncoated paper stock.
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ColorMeNSFW-Complete-Archive-Pack-Manifest.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadedId('all-zip');
    setTimeout(() => setDownloadedId(null), 2500);
  };

  const allVolumes = [...VOLUMES_DATA, UPCOMING_VOLUME];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Box */}
      <div className="relative w-full max-w-3xl bg-[#0c0c0c] border border-[#e60026] p-6 md:p-8 z-10 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#333333] pb-4">
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6 text-[#e60026]" />
            <div>
              <h2 className="font-headline text-2xl text-[#e0e0e0] font-bold uppercase tracking-tight">
                Archive Download Center
              </h2>
              <p className="font-inter text-xs text-[#ffb3ae]">
                Download high-resolution line art templates & printable PDF previews
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#b0b0b0] hover:text-[#e60026] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Global Download Banner */}
        <div className="p-4 bg-[#1c1b1b] border border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#e60026] shrink-0" />
            <div>
              <h4 className="font-headline text-base text-[#e0e0e0] font-bold uppercase">
                Complete Project Archive Sampler
              </h4>
              <p className="font-inter text-xs text-[#b0b0b0]">
                Download all high-res line art vector templates and printing manifests in one click.
              </p>
            </div>
          </div>
          <button
            onClick={downloadAllPacksZip}
            className="shrink-0 px-5 py-2.5 bg-[#e60026] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center gap-2"
          >
            {downloadedId === 'all-zip' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download All (ZIP/Pack)</span>
              </>
            )}
          </button>
        </div>

        {/* Individual Volume Downloads */}
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="font-headline text-lg text-[#e0e0e0] uppercase font-semibold border-b border-[#333333] pb-2">
            Available Volume Line Art Downloads
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allVolumes.map((vol) => (
              <div
                key={vol.id}
                className="p-4 bg-[#1c1b1b] border border-[#333333] hover:border-[#e60026]/50 transition-colors flex flex-col justify-between gap-3"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={vol.coverImage}
                    alt={vol.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover bg-black border border-[#333333] shrink-0"
                  />
                  <div>
                    <span className="font-mono text-[10px] text-[#e60026] uppercase block font-semibold">
                      {vol.volNumber}
                    </span>
                    <h4 className="font-headline text-base text-[#e0e0e0] font-bold">
                      {vol.title}
                    </h4>
                    <p className="font-inter text-[11px] text-[#b0b0b0]">
                      {vol.pagesCount} vector line art pages
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-[#333333]/50">
                  <button
                    onClick={() => downloadSampleImage(vol.coverImage, `${vol.id}-line-art-sample`)}
                    className="flex-1 py-2 bg-black border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    {downloadedId === `${vol.id}-line-art-sample` ? (
                      <Check className="w-3.5 h-3.5 text-[#e60026]" />
                    ) : (
                      <Image className="w-3.5 h-3.5 text-[#e60026]" />
                    )}
                    <span>Line Art PNG</span>
                  </button>

                  <button
                    onClick={() => downloadSampleImage(vol.coverImage, `${vol.id}-printable-pdf`)}
                    className="flex-1 py-2 bg-[#2a2a2a] hover:bg-[#e60026] text-white text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#e60026] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors mt-2"
        >
          Close Download Center
        </button>
      </div>
    </div>
  );
};
