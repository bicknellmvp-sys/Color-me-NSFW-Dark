import React, { useState } from 'react';
import { X, Upload, Check, Trash2, Image as ImageIcon, Sparkles, FolderPlus } from 'lucide-react';
import { PlateItem } from '../data/plates';

interface BatchUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  customPlates: PlateItem[];
  onSaveCustomPlates: (plates: PlateItem[]) => void;
  onResetToDefault: () => void;
}

export const BatchUploadModal: React.FC<BatchUploadModalProps> = ({
  isOpen,
  onClose,
  customPlates,
  onSaveCustomPlates,
  onResetToDefault,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ id: string; name: string; previewUri: string }>
  >([]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files) as File[];
    const newItems: Array<{ id: string; name: string; previewUri: string }> = [];

    let countProcessed = 0;
    files.forEach((file: File, idx: number) => {
      const reader = new FileReader();
      reader.onload = (evt: ProgressEvent<FileReader>) => {
        if (evt.target?.result) {
          newItems.push({
            id: `uploaded-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            previewUri: evt.target.result as string,
          });
        }
        countProcessed++;
        if (countProcessed === files.length) {
          setUploadedFiles((prev) => [...prev, ...newItems]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveUploaded = (id: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPlates = () => {
    if (uploadedFiles.length === 0) return;

    const categories: PlateItem['category'][] = [
      'Bondage Studies',
      'Industrial Chains',
      'Sigils & Occult',
      'Latex & Silhouette',
      'Erotic Geometry'
    ];

    const formattedPlates: PlateItem[] = uploadedFiles.map((item, index) => ({
      id: item.id,
      plateNumber: index + 1,
      title: item.name || `Book Plate #${index + 1}`,
      category: categories[index % categories.length],
      description: `User uploaded coloring artwork plate #${index + 1}.`,
      svgDataUri: item.previewUri,
    }));

    onSaveCustomPlates(formattedPlates);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0c0c0c] border border-[#e60026] p-6 md:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#333333] pb-4">
          <div className="flex items-center gap-3">
            <Upload className="w-6 h-6 text-[#e60026]" />
            <div>
              <span className="font-mono text-xs text-[#e60026] uppercase font-bold block">
                Batch Artwork Import
              </span>
              <h2 className="font-headline text-xl md:text-2xl text-[#e0e0e0] font-bold uppercase tracking-tight">
                Import Your Actual 42 Book Pictures
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

        <p className="font-inter text-xs md:text-sm text-[#b0b0b0] leading-relaxed">
          Select your actual coloring book image files (<strong className="text-[#e0e0e0]">PNG, JPG, SVG, WebP</strong>) directly from your phone's Photo Library/Camera Roll or computer. No ZIP file needed! They will instantly replace the placeholder pictures in the <span className="text-[#e60026]">Gallery</span>, <span className="text-[#e60026]">Flipbook Reader</span>, and <span className="text-[#e60026]">Digital Studio</span>.
        </p>

        {/* Drop Zone */}
        <label className="border-2 border-dashed border-[#333333] hover:border-[#e60026] bg-[#121212] p-6 md:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group">
          <div className="p-4 bg-[#1c1b1b] border border-[#333333] group-hover:border-[#e60026] rounded-full text-[#e60026]">
            <FolderPlus className="w-8 h-8" />
          </div>
          <div>
            <span className="font-headline text-base text-[#e0e0e0] font-bold uppercase block group-hover:text-[#e60026]">
              Tap Here to Select Photos from Camera Roll / Device
            </span>
            <span className="font-mono text-xs text-[#808080] block mt-1">
              Supports selecting multiple images at once (PNG, JPG, WebP)
            </span>
          </div>
          <input
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.webp,.svg"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Uploaded List Preview */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-col gap-3 flex-1 overflow-hidden">
            <div className="flex items-center justify-between font-mono text-xs text-[#e0e0e0]">
              <span>Selected Images (<strong className="text-[#e60026]">{uploadedFiles.length}</strong>)</span>
              <button
                onClick={() => setUploadedFiles([])}
                className="text-[#808080] hover:text-[#e60026] underline text-[11px]"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 overflow-y-auto max-h-[220px] p-2 bg-[#080808] border border-[#222222]">
              {uploadedFiles.map((file, idx) => (
                <div key={file.id} className="relative group bg-[#141414] border border-[#333333] aspect-square flex flex-col items-center justify-center p-1">
                  <img
                    src={file.previewUri}
                    alt={file.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1 left-1 bg-black/80 text-[9px] font-mono text-[#e60026] px-1 font-bold">
                    #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveUploaded(file.id)}
                    className="absolute top-1 right-1 p-1 bg-black/80 hover:bg-[#e60026] text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#333333]">
          {customPlates.length > 0 ? (
            <button
              onClick={() => {
                onResetToDefault();
                setUploadedFiles([]);
              }}
              className="px-4 py-2.5 bg-[#1c1b1b] border border-[#333333] text-[#808080] hover:text-[#e60026] hover:border-[#e60026] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reset to Standard Sample Plates
            </button>
          ) : (
            <span className="text-[11px] font-mono text-[#808080]">
              {uploadedFiles.length === 0 ? 'No custom pictures uploaded yet' : `${uploadedFiles.length} files ready`}
            </span>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-[#141414] border border-[#333333] text-[#b0b0b0] text-xs font-semibold uppercase tracking-wider hover:text-white"
            >
              Cancel
            </button>

            <button
              disabled={uploadedFiles.length === 0}
              onClick={handleApplyPlates}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest flex items-center gap-2 transition-all ${
                uploadedFiles.length > 0
                  ? 'bg-[#e60026] text-white hover:bg-[#ffb3ae] hover:text-black cursor-pointer'
                  : 'bg-[#222222] text-[#666666] cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Apply {uploadedFiles.length} Pictures to Book</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
