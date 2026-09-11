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
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Description Left */}
        <div className="flex flex-col gap-6">
          <h2 className="font-headline text-3xl md:text-4xl text-[#e0e0e0] uppercase tracking-tighter flex items-center gap-4 font-bold">
            <BookOpen className="w-8 h-8 text-[#e60026]" />
            <span>The Ink & Ledger</span>
          </h2>

          <p className="font-inter text-base text-[#b0b0b0] border-l-2 border-[#e60026] pl-4 leading-relaxed">
            Subscribe to our exclusive newsletter for behind-the-scenes insights, early access to new volumes, and curated provocations delivered weekly.
          </p>
        </div>

        {/* Subscription Form Right */}
        <form 
          onSubmit={handleSubmit}
          className="bg-[#2a2a2a]/80 backdrop-blur-md p-8 border border-[#333333] flex flex-col gap-6 relative overflow-hidden"
        >
          {status === 'success' ? (
            <div className="py-8 text-center flex flex-col items-center gap-4 animate-fade-in">
              <CheckCircle className="w-12 h-12 text-[#e60026]" />
              <h3 className="font-headline text-2xl text-[#e0e0e0] uppercase">Welcome to the Inner Circle</h3>
              <p className="font-inter text-sm text-[#b0b0b0]">
                A confirmation dispatch has been sent to <span className="text-[#ffb3ae] font-mono">{email}</span>.
              </p>
              <button
                type="button"
                onClick={() => { setStatus('idle'); setName(''); setEmail(''); }}
                className="mt-2 text-xs text-[#e60026] uppercase font-semibold underline hover:text-[#ffb3ae]"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <>
              {/* Name Input */}
              <div className="relative pt-4">
                <input
                  type="text"
                  id="newsletter_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-transparent border-0 border-b border-[#333333] text-[#e0e0e0] font-inter text-base focus:ring-0 focus:border-[#e60026] px-0 py-2 transition-colors outline-none"
                />
                <label
                  htmlFor="newsletter_name"
                  className="absolute left-0 top-0 text-[#b0b0b0] text-[11px] uppercase tracking-wider transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#b7b5b4] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#e60026]"
                >
                  Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative pt-4">
                <input
                  type="email"
                  id="newsletter_email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-transparent border-0 border-b border-[#333333] text-[#e0e0e0] font-inter text-base focus:ring-0 focus:border-[#e60026] px-0 py-2 transition-colors outline-none"
                />
                <label
                  htmlFor="newsletter_email"
                  className="absolute left-0 top-0 text-[#b0b0b0] text-[11px] uppercase tracking-wider transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#b7b5b4] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#e60026]"
                >
                  Email Address
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-4 py-4 bg-[#e60026] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#ffb3ae] hover:text-black transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>{status === 'submitting' ? 'Dispatching...' : 'Subscribe'}</span>
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};
