import React, { useState, useEffect } from 'react';
import { ShieldAlert, Flame, Check } from 'lucide-react';

export const AgeGateModal: React.FC = () => {
  const [confirmed, setConfirmed] = useState<boolean>(true);

  useEffect(() => {
    const verified = localStorage.getItem('colormensfw_age_verified');
    if (!verified) {
      setConfirmed(false);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('colormensfw_age_verified', 'true');
    setConfirmed(true);
  };

  if (confirmed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0c0c0c] border border-[#e60026] p-8 md:p-10 shadow-2xl flex flex-col items-center text-center gap-6">
        <div className="w-14 h-14 rounded-full bg-[#e60026]/10 border border-[#e60026] flex items-center justify-center text-[#e60026]">
          <Flame className="w-7 h-7" />
        </div>

        <div>
          <span className="font-mono text-xs text-[#e60026] uppercase tracking-[0.25em] font-bold block mb-1">
            Age Restriction Advisory
          </span>
          <h2 className="font-headline text-3xl text-[#e0e0e0] font-bold uppercase tracking-tight">
            Adult Content Ahead
          </h2>
        </div>

        <p className="font-inter text-xs text-[#b0b0b0] leading-relaxed max-w-sm">
          This archive contains mature figurative line art, dark aesthetic studies, and fetish-inspired illustrations. You must be at least <span className="text-[#e60026] font-bold">18 years of age</span> (or legal majority in your jurisdiction) to proceed.
        </p>

        <div className="flex flex-col w-full gap-3 pt-2">
          <button
            onClick={handleVerify}
            className="w-full py-4 bg-[#e60026] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-all duration-300 glow-effect flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>I am 18+ — Enter Archive</span>
          </button>

          <a
            href="https://google.com"
            className="w-full py-3 bg-transparent border border-[#333333] text-[#808080] hover:text-[#e0e0e0] font-semibold text-xs uppercase tracking-wider transition-colors text-center"
          >
            Exit Site
          </a>
        </div>
      </div>
    </div>
  );
};
