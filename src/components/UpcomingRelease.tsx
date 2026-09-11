import React, { useState } from 'react';
import { Flame, Check, ShieldAlert } from 'lucide-react';

export const UpcomingRelease: React.FC = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simulate random position in queue between 400 and 800
    const randPos = Math.floor(Math.random() * 400) + 412;
    setPosition(randPos);
    setJoined(true);
  };

  return (
    <section id="slave-a-demon" className="py-24 px-6 md:px-16 bg-[#0e0e0e]/80 backdrop-blur-sm border-b border-[#333333] relative overflow-hidden z-10">
      {/* Background Micro Dots */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        <span className="font-inter text-xs text-[#e60026] uppercase tracking-[0.25em] font-bold flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#e60026]" />
          <span>Upcoming Release</span>
        </span>

        <h2 className="font-headline text-3xl sm:text-5xl text-[#e0e0e0] leading-tight font-bold">
          Slave a Demon the Solomonic Way: <br />
          <span className="text-[#b0b0b0] text-2xl sm:text-3xl font-normal italic block mt-2">
            A Ritual Coloring Book
          </span>
        </h2>

        <p className="font-inter text-base text-[#b0b0b0] max-w-xl leading-relaxed">
          Prepare for our most esoteric and complex volume yet. Join the inner circle to be notified upon release.
        </p>

        {joined ? (
          <div className="w-full max-w-md bg-[#201f1f] border border-[#e60026] p-6 text-center flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e60026]/20 border border-[#e60026] flex items-center justify-center text-[#e60026]">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-xl text-[#e0e0e0] font-bold uppercase">
              Sigil Granted
            </h3>
            <p className="font-inter text-xs text-[#b0b0b0]">
              You are assigned position <span className="text-[#ffb3ae] font-mono font-bold">#{position}</span> in the Solomonic waitlist ritual.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-[#b0b0b0] uppercase tracking-wider mt-1">
              <ShieldAlert className="w-3.5 h-3.5 text-[#e60026]" />
              <span>Priority Access Key reserved for {email}</span>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleJoin}
            className="w-full max-w-md flex flex-col sm:flex-row gap-4 mt-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              className="flex-grow bg-transparent border-0 border-b border-[#333333] text-[#e0e0e0] font-inter text-sm focus:ring-0 focus:border-[#e60026] placeholder:text-[#808080] px-0 py-3 transition-colors outline-none tracking-wider uppercase"
            />
            <button
              type="submit"
              className="shrink-0 px-8 py-3.5 border border-[#e60026] text-[#e60026] font-semibold text-xs uppercase tracking-widest hover:bg-[#e60026] hover:text-white transition-all duration-300"
            >
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
