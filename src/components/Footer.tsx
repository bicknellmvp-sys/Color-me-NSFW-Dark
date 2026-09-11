import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenLegal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegal }) => {
  return (
    <footer className="bg-[#0c0c0c] border-t border-[#333333] flex flex-col gap-8 px-6 md:px-16 py-16 w-full relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-headline text-2xl md:text-3xl text-[#e60026] uppercase tracking-tighter font-bold hover:opacity-90"
        >
          COLOR ME NSFW
        </a>

        <nav className="flex flex-wrap gap-6 font-inter text-xs font-semibold">
          <button
            onClick={() => onNavigate('archives')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            Archive
          </button>
          <button
            onClick={() => onNavigate('slave-a-demon')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            Slave A Demon
          </button>
          <button
            onClick={() => onNavigate('theleftone')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            THELEFT.ONE
          </button>
          <button
            onClick={() => onNavigate('newsletter')}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            Newsletter
          </button>
          <button
            onClick={onOpenLegal}
            className="text-[#b0b0b0] hover:text-[#e60026] transition-all opacity-80 hover:opacity-100 uppercase tracking-widest"
          >
            Legal
          </button>
        </nav>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#333333]/50 pt-8 mt-4">
        <p className="font-inter text-xs text-[#b7b5b4] italic">
          No animals were harmed in the making of these pages. Humans, however, are debatable.
        </p>
        <p className="font-mono text-[11px] text-[#808080] uppercase tracking-widest">
          © 2024 COLOR ME NSFW. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};
