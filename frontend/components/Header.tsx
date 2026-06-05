'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import ImportWizard from './ImportWizard';

export default function Header() {
  const { currentUser, isAdmin, logoutAdmin, logoutUser, searchQuery, setSearchQuery } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Docs', href: '/docs' },
    { label: 'Games', href: '/games' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Auto redirect to search-relevant pages if user searches from elsewhere
    if (pathname !== '/projects' && pathname !== '/docs' && pathname !== '/') {
      router.push('/projects');
    }
  };

  const activeClass = (href: string) => {
    const isExact = pathname === href;
    const isSub = pathname.startsWith(href) && href !== '/';
    return isExact || isSub
      ? 'text-brand-purple font-semibold bg-brand-purple/10 border border-brand-purple/20 px-3 py-1.5 rounded-xl'
      : 'text-slate-600 dark:text-zinc-400 light:text-slate-650 hover:text-zinc-900 dark:text-white light:hover:text-slate-900 px-3 py-1.5 transition-colors';
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-300 dark:border-zinc-900 light:border-slate-200 bg-slate-50 dark:bg-zinc-950/80 light:bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Brand Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-purple flex items-center justify-center text-zinc-900 dark:text-white font-extrabold text-lg shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-all">
              F
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-450 light:from-slate-900 light:to-slate-700 bg-clip-text text-transparent group-hover:opacity-90 transition">
              Fluxfolio
            </span>
          </Link>

          {/* Search bar (Center Desktop) */}
          <div className="hidden md:flex items-center relative max-w-md w-full">
            <span className="absolute left-3.5 text-zinc-550">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search site..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full text-sm bg-white dark:bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 focus:border-brand-purple/65 focus:outline-none focus:ring-1 focus:ring-brand-purple/65 rounded-full pl-10 pr-4 py-2 text-zinc-900 dark:text-white light:text-slate-900 placeholder-zinc-500 light:placeholder-slate-400 transition"
            />
          </div>

          {/* Navigation Links (Right Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={activeClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth triggers & Admin controls (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2.5">
                {/* Floating seeder action */}
                <button
                  onClick={() => setWizardOpen(true)}
                  className="bg-brand-purple/15 text-brand-purple border border-brand-purple/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-brand-purple/25 transition active:scale-[0.98] flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  title="Import Seeder Wizard"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Demo Seeder
                </button>

                <Link
                  href="/editor"
                  className="bg-white dark:bg-zinc-900 light:bg-slate-100 hover:bg-zinc-850 light:hover:bg-slate-200 border border-slate-200 dark:border-zinc-800 light:border-slate-200 text-zinc-900 dark:text-white light:text-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-[0.98]"
                >
                  + New Post
                </Link>
                
                <Link
                  href="/admin"
                  className="flex items-center gap-2 bg-white dark:bg-zinc-900 light:bg-slate-100 hover:bg-zinc-850 border border-zinc-850 light:border-slate-200 p-1 pr-3 rounded-full text-slate-700 dark:text-zinc-300 light:text-slate-700 transition active:scale-[0.97]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80"
                    alt="Admin Avatar"
                    className="w-7 h-7 rounded-full border border-brand-purple"
                  />
                  <span className="text-xs font-bold">Admin Hub</span>
                </Link>

                <button
                  onClick={logoutUser}
                  className="text-xs font-semibold text-slate-500 dark:text-zinc-500 hover:text-red-400 p-1.5 transition"
                >
                  Sign Out Admin
                </button>
              </div>
            ) : currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">
                  Hi, {currentUser.name.split(' ')[0]}
                </span>
                <button
                  onClick={logoutUser}
                  className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 px-4 py-1.5 rounded-xl text-xs font-semibold active:scale-[0.98] transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-brand-indigo text-zinc-900 dark:text-white hover:bg-brand-indigo/90 px-5 py-2 rounded-xl text-sm font-semibold active:scale-[0.98] transition shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Hamburger (Mobile) */}
          <div className="flex md:hidden items-center gap-2">
            {!currentUser && (
              <Link
                href="/login"
                className="bg-brand-indigo text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-zinc-400 hover:text-zinc-900 dark:text-white focus:outline-none rounded-lg hover:bg-white dark:bg-zinc-900"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile dropdown drawer list */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-slate-300 dark:border-zinc-900 light:border-slate-200 pt-4 flex flex-col gap-2.5 animate-fadeIn">
            {/* Mobile Search input */}
            <div className="relative mb-2 w-full">
              <span className="absolute left-3 top-2.5 text-zinc-550">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search site..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full text-sm bg-white dark:bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 rounded-full pl-9 pr-4 py-2 text-zinc-900 dark:text-white light:text-slate-900 placeholder-zinc-500 light:placeholder-slate-400 focus:outline-none"
              />
            </div>

            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`py-2 px-3 rounded-lg text-sm ${pathname === item.href ? 'bg-brand-purple/15 text-brand-purple font-bold' : 'text-slate-600 dark:text-zinc-400 light:text-slate-650'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isAdmin && (
              <div className="border-t border-slate-300 dark:border-zinc-900 light:border-slate-200 pt-3.5 mt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setWizardOpen(true);
                  }}
                  className="w-full text-left py-2 px-3 text-brand-purple text-sm font-semibold hover:bg-brand-purple/10 rounded-lg"
                >
                  Demo Seeder Seeding
                </button>
                <Link
                  href="/editor"
                  className="py-2 px-3 text-sm text-zinc-200 light:text-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  + Create New Post
                </Link>
                <Link
                  href="/admin"
                  className="py-2 px-3 text-sm text-brand-purple font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Go to Admin Hub
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 text-sm text-red-400"
                >
                  Sign Out Admin
                </button>
              </div>
            )}
            {currentUser && !isAdmin && (
              <div className="border-t border-slate-300 dark:border-zinc-900 light:border-slate-200 pt-3.5 mt-2 flex flex-col gap-2.5">
                <div className="py-2 px-3 text-xs font-bold text-slate-500 dark:text-zinc-500">
                  Signed in as {currentUser.name}
                </div>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 text-sm text-red-400 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Persistent Bottom Mobile Nav Bar (Matches layout screenshots) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-50 dark:bg-zinc-950/90 light:bg-white/95 backdrop-blur-lg border-t border-slate-300 dark:border-zinc-900 light:border-slate-150 py-3.5 px-6 flex items-center justify-around text-zinc-450 light:text-slate-500 shadow-2xl">
        <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === '/' ? 'text-brand-purple' : ''}`}>
          <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-semibold">Home</span>
        </Link>
        <Link href="/projects" className={`flex flex-col items-center gap-1 ${pathname.startsWith('/projects') ? 'text-brand-purple' : ''}`}>
          <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-[10px] font-semibold">Projects</span>
        </Link>
        <Link href="/docs" className={`flex flex-col items-center gap-1 ${pathname.startsWith('/docs') ? 'text-brand-purple' : ''}`}>
          <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-[10px] font-semibold">Docs</span>
        </Link>
        <Link href="/games" className={`flex flex-col items-center gap-1 ${pathname.startsWith('/games') ? 'text-brand-purple' : ''}`}>
          <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span className="text-[10px] font-semibold">Games</span>
        </Link>
      </nav>

      {/* Floating Demo Seeder Modals */}
      <ImportWizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
    </>
  );
}
