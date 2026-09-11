import React from 'react';
import { X, ShieldAlert, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Box */}
      <div className="relative w-full max-w-2xl bg-[#0c0c0c] border border-[#333333] p-6 md:p-8 z-10 shadow-2xl flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#333333] pb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#e60026]" />
            <h2 className="font-headline text-xl text-[#e0e0e0] font-bold uppercase tracking-tight">
              Legal Terms & Content Advisory
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#b0b0b0] hover:text-[#e60026] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-4 font-inter text-xs text-[#b0b0b0] leading-relaxed">
          <div className="p-4 bg-[#1c1b1b] border border-[#333333]">
            <h3 className="font-bold text-[#e0e0e0] text-sm mb-1 uppercase font-headline">
              18+ Mature Content Declaration
            </h3>
            <p>
              COLOR ME NSFW publications contain artistic themes, figurative studies, bondage illustration, and industrial body art intended strictly for adults aged 18 years or older.
            </p>
          </div>

          <h4 className="font-bold text-[#e0e0e0] text-sm uppercase font-headline mt-2">
            Intellectual Property & Licensing
          </h4>
          <p>
            All vector line art, sigil illustrations, typography, and original compositions contained within physical archives and digital downloads are copyrighted under International Copyright Law.
          </p>

          <h4 className="font-bold text-[#e0e0e0] text-sm uppercase font-headline mt-2">
            Privacy & Discrete Packaging Policy
          </h4>
          <p>
            Customer address information is strictly processed for dispatch. Orders shipped from our studio are packaged in plain, unbranded black mailer casing with neutral sender labels.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#e60026] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors"
        >
          Acknowledge & Close
        </button>
      </div>
    </div>
  );
};
