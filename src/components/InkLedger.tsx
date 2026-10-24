import React, { useState } from 'react';
import { BookOpen, CheckCircle, Mail } from 'lucide-react';

export const InkLedger: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  return (
    <section id="newsletter" className="py-24 px-6 md:px-16 bg-[#0c0c0c]/90 backdrop-blur-sm z-10 relative border-b border-[#333333]">
      <div className="max-w-3xl mx-auto items-center">
        {/* Description Left */}
        <div className="flex flex-col gap-0">
          <h2 className="font-headline text-3xl md:text-4xl text-[#e0e0e0] uppercase tracking-tighter flex items-center gap-4 font-bold mb-6">
            <BookOpen className="w-8 h-8 text-[#e60026]" />
            <span>The Ink & Ledger</span>
          </h2>

          <p className="font-inter text-base text-[#b0b0b0] border-l-2 border-[#e60026] pl-4 leading-relaxed mb-6">
            Subscribe to our exclusive newsletter for behind-the-scenes insights, early access to new volumes, and curated provocations delivered weekly.
          </p>

          {/* Minimal Subscription */}
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-2"
          >
            {status === 'success' ? (
              <div className="py-4 flex items-center justify-start gap-3 animate-fade-in">
                <CheckCircle className="w-6 h-6 text-[#e60026]" />
                <span className="font-inter text-sm text-[#e0e0e0]">Subscribed!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#141414] border border-[#333333] text-[#e0e0e0] font-inter text-sm focus:border-[#e60026] px-4 py-3 transition-colors outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 bg-[#e60026] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#ffb3ae] transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
