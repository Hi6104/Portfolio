'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import SkillRadar from '../components/SkillRadar';

export default function Home() {
  const { projects, posts } = useApp();
  const router = useRouter();

  // Get featured projects
  const featuredProjects = projects.filter(p => p.isFeatured).slice(0, 3);

  // Get latest 3 posts
  const latestPosts = posts.slice(0, 3);

  // Skill badges inside Hero
  const skillBadges = ['React 19', 'Next.js 15', 'TypeScript', 'Python', 'WebAssembly', 'WebSockets'];

  const sampleQuizQuestion = {
    text: "What is the primary benefit of React 19's Server Actions?",
    options: [
      "They replace standard CSS styles.",
      "They allow client forms to trigger backend functions directly with zero API routing overhead.",
      "They disable React component state hydration.",
      "They double the browser render frame rates."
    ],
    correctIdx: 1,
    explanation: "Server Actions allow forms to call functions on the server directly, bypassing manual fetch calls and routing configuration."
  };

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">

      {/* Background ambient glow shapes */}
      <div className="ambient-glow -top-20 right-10 ambient-purple" />
      <div className="ambient-glow top-[40%] left-[-150px] ambient-cyan" />
      <div className="ambient-glow bottom-[-100px] right-[-100px] bg-brand-indigo/10" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">

        {/* ================= HERO BLOCK ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 md:pt-16">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo text-xs font-bold uppercase tracking-wider animate-pulse">
              <span className="w-2 h-2 rounded-full bg-brand-indigo" />
              Frontend Systems Architect
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white light:text-slate-900">
              Level up your <span className="bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]">engineering craft</span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 dark:text-zinc-400 light:text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Welcome to <strong>Fluxfolio</strong>. I design elegant, modular interfaces using React 19, high-performance styling systems, and client-side database synchronization.
            </p>

            {/* Skill tags badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              {skillBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1 rounded-xl bg-white dark:bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 text-slate-600 dark:text-zinc-400 light:text-slate-650 hover:text-brand-purple hover:border-brand-purple/40 transition cursor-default"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/projects"
                className="w-full sm:w-auto text-center bg-brand-purple hover:bg-brand-purple-dark text-zinc-900 dark:text-white font-bold px-7 py-3 rounded-2xl transition active:scale-[0.98] shadow-[0_4px_20px_rgba(139,92,246,0.35)]"
              >
                View Projects
              </Link>
              <Link
                href="/docs"
                className="w-full sm:w-auto text-center glass-container hover:bg-white/5 light:hover:bg-slate-100 text-zinc-350 light:text-slate-800 font-bold px-7 py-3 rounded-2xl transition active:scale-[0.98]"
              >
                Read Docs & Blog
              </Link>
            </div>

          </div>

          {/* Interactive Hero Illustration: SVG Artboard */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <GlassCard hoverEffect={false} className="w-full max-w-[420px] aspect-square flex items-center justify-center !p-0 shadow-2xl relative border-slate-200 dark:border-zinc-800/80">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/5 to-brand-purple/5 pointer-events-none" />

              {/* Abstract code visual artboard */}
              <svg viewBox="0 0 400 400" className="w-full h-full p-4">
                {/* Simulated Grid code canvas */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-900 light:text-slate-200" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" className="opacity-40" />

                {/* Central Glowing Orb */}
                <circle cx="200" cy="200" r="70" fill="url(#orb-glow)" className="animate-pulse-slow" />
                <defs>
                  <radialGradient id="orb-glow">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Simulated Floating Glass Card panels */}
                <g className="animate-pulse-slow">
                  <rect x="50" y="80" width="160" height="90" rx="16" fill="rgba(10,10,12,0.65)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" className="shadow-lg" />
                  <circle cx="75" cy="105" r="5" fill="#ef4444" />
                  <circle cx="90" cy="105" r="5" fill="#f59e0b" />
                  <circle cx="105" cy="105" r="5" fill="#10b981" />
                  <rect x="70" y="125" width="120" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
                  <rect x="70" y="140" width="80" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
                </g>

                <g className="transition-transform duration-1000 hover:translate-y-[-10px]">
                  <rect x="180" y="220" width="180" height="110" rx="16" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.25)" strokeWidth="1.5" className="backdrop-blur-md" />
                  {/* Glowing text simulations */}
                  <rect x="205" y="245" width="60" height="8" rx="4" fill="#6366f1" className="opacity-80" />
                  <rect x="205" y="265" width="130" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
                  <rect x="205" y="280" width="100" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
                  <rect x="205" y="295" width="80" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />

                  {/* Decorative tag */}
                  <rect x="295" y="240" width="40" height="16" rx="8" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
                  <circle cx="305" cy="248" r="3" fill="#06b6d4" />
                </g>

                {/* Connecting Web lines */}
                <line x1="130" y1="170" x2="180" y2="230" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4,4" className="opacity-40" />
                <line x1="210" y1="130" x2="280" y2="220" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4,4" className="opacity-40" />

                {/* Floating Node Badge labels */}
                <g transform="translate(250, 60)">
                  <circle cx="0" cy="0" r="14" fill="#06b6d4" className="opacity-15 animate-ping" />
                  <circle cx="0" cy="0" r="6" fill="#06b6d4" />
                </g>
                <g transform="translate(100, 310)">
                  <circle cx="0" cy="0" r="14" fill="#8b5cf6" className="opacity-15 animate-ping" />
                  <circle cx="0" cy="0" r="6" fill="#8b5cf6" />
                </g>
              </svg>
            </GlassCard>
          </div>
        </section>

        {/* ================= FEATURED PROJECTS STRIP ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white light:text-slate-900">Featured Systems & Case Studies</h2>
              <p className="text-xs md:text-sm text-zinc-450 light:text-slate-500 mt-1">High-performance custom design tokens and live data dashboards.</p>
            </div>
            <Link
              href="/projects"
              className="text-xs md:text-sm font-bold text-brand-purple hover:underline flex items-center gap-1 group"
            >
              Browse All Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Carousel representation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <GlassCard
                key={project.id}
                glowColor={project.id === 'neo-futurism-ui-kit' ? 'purple' : 'indigo'}
                className="flex flex-col h-full border-slate-300 dark:border-zinc-900/60"
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 border border-slate-200 dark:border-zinc-800/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating tech chips */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {project.techStack.slice(0, 2).map((tech, i) => (
                      <span key={i} className="text-[10px] font-extrabold bg-black/75 text-slate-700 dark:text-zinc-300 px-2 py-0.5 rounded-md border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-zinc-900 dark:text-white light:text-slate-900 group-hover:text-brand-purple transition">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-450 light:text-slate-500 mt-2 flex-grow line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>

                <div className="flex items-center justify-between mt-5 border-t border-slate-300 dark:border-zinc-900 light:border-slate-100 pt-4 text-[10px] font-bold text-slate-500 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-zinc-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {project.views} views
                  </span>
                  <span className="text-brand-purple group-hover:underline flex items-center gap-0.5">
                    View Case Study
                    <span>→</span>
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ================= SKILL SNAPSHOT SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-b border-slate-300 dark:border-zinc-900 light:border-slate-200 py-16">
          <div className="lg:col-span-5 flex justify-center">
            <GlassCard hoverEffect={false} className="w-full max-w-[360px] border-slate-300 dark:border-zinc-900/60 shadow-xl bg-slate-50 dark:bg-zinc-950/80">
              <h3 className="text-sm font-extrabold tracking-widest text-zinc-550 text-center uppercase mb-1">Interactive Vector Radar</h3>
              <SkillRadar />
            </GlassCard>
          </div>

          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white light:text-slate-900">
              Rigorous technology execution snapshot
            </h2>

            <p className="text-sm leading-relaxed text-zinc-450 light:text-slate-650 font-medium max-w-xl">
              I align product aesthetics with deep compiler optimizations. Through responsive layout strategies, rigorous asset processing pipelines, and component abstraction libraries, I deliver top visual ratings.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              <div className="p-4 bg-white dark:bg-zinc-900/30 light:bg-slate-100 rounded-2xl border border-zinc-850 light:border-slate-200">
                <div className="text-xl font-black text-brand-purple">96%</div>
                <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-extrabold mt-0.5 uppercase tracking-wider">React & Web API</div>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-900/30 light:bg-slate-100 rounded-2xl border border-zinc-850 light:border-slate-200">
                <div className="text-xl font-black text-brand-indigo">92%</div>
                <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-extrabold mt-0.5 uppercase tracking-wider">Design Architecture</div>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-900/30 light:bg-slate-100 rounded-2xl border border-zinc-850 light:border-slate-200">
                <div className="text-xl font-black text-brand-cyan">88%</div>
                <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-extrabold mt-0.5 uppercase tracking-wider">Engine Performance</div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/resume"
                className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 hover:bg-zinc-850 light:bg-slate-100 light:hover:bg-slate-200 border border-slate-200 dark:border-zinc-800 light:border-slate-250 text-zinc-900 dark:text-white light:text-slate-800 font-bold px-6 py-3 rounded-2xl transition active:scale-[0.98] text-sm"
              >
                <svg className="w-4 h-4 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Inspect Progressive Resume
              </a>
            </div>
          </div>
        </section>

        {/* ================= LATEST DOCS & BLOGS PREVIEW ================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white light:text-slate-900">Latest technical articles</h2>
              <p className="text-xs md:text-sm text-zinc-450 light:text-slate-500 mt-1">Deep dives into browser optimizations, microservice pipelines, and design specs.</p>
            </div>
            <Link
              href="/docs"
              className="text-xs md:text-sm font-bold text-brand-purple hover:underline flex items-center gap-1 group"
            >
              Browse Technical Archives
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <GlassCard
                key={post.id}
                className="flex flex-col justify-between border-slate-300 dark:border-zinc-900/60"
                onClick={() => router.push(`/docs/${post.id}`)}
              >
                <div className="space-y-4">
                  {/* Header info */}
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 dark:text-zinc-500">
                    <span className="bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {post.tags[0]}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white light:text-slate-900 leading-snug group-hover:text-brand-purple transition">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-450 light:text-slate-500 line-clamp-3 leading-relaxed">
                    {post.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-300 dark:border-zinc-900 light:border-slate-100 text-[10px] font-bold text-slate-500 dark:text-zinc-500">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.commentsCount} comments
                    </span>
                  </span>
                  <span className="text-zinc-450 light:text-slate-650 group-hover:text-brand-purple">Read Article →</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ================= CODE GAMES / QUIZ TEASER ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-tr from-brand-indigo/5 to-brand-purple/5 border border-slate-300 dark:border-zinc-900 light:border-slate-200 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold uppercase tracking-wider">
              Interactive Learning Section
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white light:text-slate-900">
              Validate your structural knowledge
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-zinc-400 light:text-slate-600 leading-relaxed font-medium max-w-xl">
              Engage in short multiple-choice coding challenges designed to test compilation, grid layouts, and advanced TypeScript type theory. Track your progress.
            </p>
            <div className="pt-2">
              <Link
                href="/games"
                className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-zinc-900 dark:text-white font-bold px-6 py-2.5 rounded-2xl transition active:scale-[0.98] text-xs shadow-[0_4px_15px_rgba(139,92,246,0.3)]"
              >
                Try the Coding Quizzes
              </Link>
            </div>
          </div>

          {/* Interactive Question Teaser Mock */}
          <div className="lg:col-span-5 w-full">
            <GlassCard hoverEffect={false} className="border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-950/80">
              <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 dark:text-zinc-500 mb-3">
                <span className="text-brand-cyan uppercase">React 19 Preview Question</span>
                <span>Beginner Quiz</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 dark:text-white light:text-slate-900 mb-4 leading-normal">
                {sampleQuizQuestion.text}
              </p>

              <div className="space-y-2">
                {sampleQuizQuestion.options.slice(0, 2).map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => toast.info(`Submit score validation inside our complete /games dashboard! Explanation: ${sampleQuizQuestion.explanation}`)}
                    className="w-full text-left text-[11px] p-3 rounded-xl border border-slate-300 dark:border-zinc-900 light:border-slate-250 bg-white dark:bg-zinc-900/40 hover:bg-white dark:bg-zinc-900/80 light:hover:bg-slate-100 hover:border-brand-purple/45 text-slate-600 dark:text-zinc-400 light:text-slate-650 font-semibold transition"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-50 dark:bg-zinc-950 light:bg-slate-200 border border-zinc-850 text-[10px] font-bold text-slate-600 dark:text-zinc-400 mr-2">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

      </div>
    </div>
  );
}
