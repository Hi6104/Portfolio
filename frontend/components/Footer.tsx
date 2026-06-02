'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { theme, toggleTheme } = useApp();

  return (
    <footer className="w-full border-t border-zinc-900 light:border-slate-200 bg-zinc-950 light:bg-slate-50 py-16 px-8 relative overflow-hidden mt-auto">
      {/* Visual glowing backgrounds */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-indigo/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand visual column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-purple flex items-center justify-center text-white font-extrabold text-xs">
              F
            </div>
            <span className="text-lg font-bold text-white light:text-slate-900">Fluxfolio</span>
          </div>
          <p className="text-xs leading-5 text-zinc-500 light:text-slate-500 max-w-[240px]">
            A premium developer portfolio showcasing modular layouts, rich interaction widgets, and code validation.
          </p>
        </div>

        {/* Directory Links Column */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-extrabold tracking-widest text-zinc-400 light:text-slate-500 uppercase">Quick Directory</h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-zinc-500 light:text-slate-500">
            <Link href="/" className="hover:text-brand-purple transition">Home</Link>
            <Link href="/projects" className="hover:text-brand-purple transition">Projects</Link>
            <Link href="/docs" className="hover:text-brand-purple transition">Docs & Blog</Link>
            <Link href="/games" className="hover:text-brand-purple transition">Quiz Games</Link>
            <Link href="/resume" className="hover:text-brand-purple transition">Resume</Link>
            <Link href="/contact" className="hover:text-brand-purple transition">Contact</Link>
          </div>
        </div>

        {/* Connect Column */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-extrabold tracking-widest text-zinc-400 light:text-slate-500 uppercase">Connect</h4>
          <div className="flex flex-col gap-2.5 text-xs font-semibold text-zinc-500 light:text-slate-550">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple transition flex items-center gap-2">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple transition flex items-center gap-2">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-purple transition flex items-center gap-2">
              Twitter
            </a>
          </div>
        </div>

        {/* Newsletter Signup widget */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-extrabold tracking-widest text-zinc-400 light:text-slate-500 uppercase">Newsletter</h4>
          <p className="text-[11px] text-zinc-500 light:text-slate-500 leading-4">
            Get technical case studies and frontend architectural articles directly in your inbox.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}
            className="flex items-center gap-2 w-full mt-1.5"
          >
            <input
              type="email"
              required
              placeholder="email@example.com"
              className="bg-zinc-900 light:bg-white text-xs text-white light:text-slate-900 border border-zinc-850 light:border-slate-200 rounded-xl px-3.5 py-2 w-full focus:outline-none focus:border-brand-purple placeholder-zinc-650"
            />
            <button
              type="submit"
              className="bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition active:scale-[0.97]"
            >
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Footer base bar */}
      <div className="max-w-7xl mx-auto border-t border-zinc-900 light:border-slate-200 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <p className="text-[11px] text-zinc-650 light:text-slate-450 text-center md:text-left">
          © {new Date().getFullYear()} Fluxfolio. Built with React & Tailwind CSS v4. All rights reserved.
        </p>

        {/* Interactive Glassmorphic Theme Switcher Pill */}
        <div className="flex items-center p-0.5 bg-zinc-900 light:bg-slate-100 rounded-full border border-zinc-850 light:border-slate-200">
          <button
            onClick={theme === 'dark' ? undefined : toggleTheme}
            className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold transition-all duration-300 flex items-center gap-1.5 ${theme === 'dark' ? 'bg-brand-indigo text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            DARK
          </button>
          <button
            onClick={theme === 'light' ? undefined : toggleTheme}
            className={`px-3.5 py-1.5 rounded-full text-[10px] font-extrabold transition-all duration-300 flex items-center gap-1.5 ${theme === 'light' ? 'bg-white text-slate-800 shadow-md border border-slate-200' : 'text-zinc-650 hover:text-zinc-400'}`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            LIGHT
          </button>
        </div>
      </div>
    </footer>
  );
}
