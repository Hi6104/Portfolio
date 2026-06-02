'use client';

import React, { useState } from 'react';
import GlassCard from '../../components/GlassCard';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subscribe, setSubscribe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    alert(`Thank you, ${name}! Your transmission has been broadcast. A response will compile in your inbox shortly.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  const socials = [
    { label: 'GitHub Repository', url: 'https://github.com', value: 'github.com/fluxfolio', handle: 'fluxfolio' },
    { label: 'LinkedIn Profile', url: 'https://linkedin.com', value: 'linkedin.com/in/felix', handle: 'felix-de' },
    { label: 'Twitter Feed', url: 'https://twitter.com', value: 'twitter.com/felix_dev', handle: 'felix_dev' }
  ];

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">

      {/* Background ambient glow shapes */}
      <div className="ambient-glow -top-20 left-10 ambient-cyan animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] right-10 ambient-purple" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">

        {/* Page Header */}
        <div className="border-b border-zinc-900 light:border-slate-200 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white light:text-slate-900 leading-tight">
            Contact & Connections
          </h1>
          <p className="text-sm text-zinc-450 light:text-slate-550 mt-1">
            Initiate communication pipelines or follow active development repositories.
          </p>
        </div>

        {/* Outer split grid (Contact Form on Left, Map/Socials on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Contact form (7/12 layout) */}
          <div className="lg:col-span-7">
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-6 md:p-8">
              <h2 className="text-base font-bold text-white mb-6 uppercase tracking-wider">Leave a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-550 block mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Sarah Chen"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 rounded-xl px-4 py-3 text-white light:text-slate-900 focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-550 block mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@designops.co"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 rounded-xl px-4 py-3 text-white light:text-slate-900 focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-550 block mb-1.5">Transmission Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your architectural plan, hiring requirements, or system questions..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 rounded-xl p-4 text-white light:text-slate-900 focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <label className="flex items-center gap-2.5 p-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={subscribe}
                    onChange={e => setSubscribe(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-purple bg-zinc-900 border-zinc-700 accent-brand-purple focus:ring-brand-purple focus:outline-none"
                  />
                  <span className="text-[10px] text-zinc-500 font-semibold">
                    Opt-in to get technical case summaries directly in your inbox.
                  </span>
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-brand-purple hover:bg-brand-purple-dark text-white font-extrabold px-6 py-3 rounded-2xl transition active:scale-[0.98] shadow-lg text-xs"
                  >
                    Broadcast Transmission
                  </button>
                </div>

              </form>
            </GlassCard>
          </div>

          {/* Socials & Location visual map (5/12 layout) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Visual hand-drawn geo map illustration */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5 relative overflow-hidden flex flex-col justify-between aspect-video md:aspect-auto">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-500 mb-3 border-b border-zinc-900 pb-2">
                Operational Coordinates
              </h3>

              <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden border border-zinc-900/80 bg-zinc-950/20">
                {/* SVG Abstract maps nodes */}
                <svg viewBox="0 0 200 100" className="w-full h-full p-2 opacity-60">
                  <path d="M10,80 Q40,30 80,70 T150,20" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="3,3" />
                  <path d="M20,90 Q90,10 120,60 T180,40" fill="none" stroke="#8b5cf6" strokeWidth="0.75" />

                  {/* Central base node circle */}
                  <g transform="translate(120, 60)" className="animate-pulse">
                    <circle cx="0" cy="0" r="8" fill="#06b6d4" className="opacity-25" />
                    <circle cx="0" cy="0" r="3.5" fill="#06b6d4" />
                  </g>
                  <text x="120" y="50" textAnchor="middle" className="text-[7px] font-bold fill-brand-cyan uppercase">Felix Base</text>
                </svg>
              </div>

              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-4">
                Location: <span className="text-white">San Francisco Bay Area, CA</span>
              </div>
            </GlassCard>

            {/* Social channels card */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400 border-b border-zinc-900 pb-2">
                Social Profiles
              </h3>
              <div className="space-y-3.5 text-xs">
                {socials.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-900 hover:border-brand-purple/20 rounded-xl transition duration-300"
                  >
                    <div>
                      <div className="text-[9px] font-extrabold text-zinc-550 uppercase">{soc.label}</div>
                      <div className="font-extrabold text-white mt-0.5">{soc.handle}</div>
                    </div>
                    <span className="text-[10px] text-zinc-500 group-hover:text-brand-purple">
                      {soc.value}
                    </span>
                  </a>
                ))}
              </div>
            </GlassCard>

          </div>

        </div>

      </div>
    </div>
  );
}
