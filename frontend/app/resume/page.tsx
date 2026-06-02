'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import SkillRadar from '../../components/SkillRadar';

export default function ResumeScreen() {
  const { quizProgress } = useApp();

  // Extract all dynamic badges earned from local storage progress
  const earnedBadges = Object.values(quizProgress)
    .flatMap(p => p.badgesEarned)
    .filter(Boolean);

  const timelineEntries = [
    {
      role: 'Lead Frontend Systems Architect',
      company: 'FluxCore Technologies',
      duration: '2023 - Present',
      bullets: [
        'Orchestrated UI Design Token schemas using Tailwind CSS v4 custom theme definitions, reducing layout compilation overhead by 40%.',
        'Built dynamic module federation architectures supporting client-side asset optimizations and conditional code bundle chunking.',
        'Mentored 8 mid-level developers, establishing rigid automated accessibility audits (Lighthouse averaging 98%).'
      ]
    },
    {
      role: 'Fullstack Security Architect',
      company: 'QuantumSync Inc',
      duration: '2021 - 2023',
      bullets: [
        'Designed cryptographic blockchain node ledger explorers using SVG vector rendering systems.',
        'Deployed push notification microservice orchestration gateways using WebSockets, handling peak loads of 15,000 req/min.',
        'Implemented security auditing protocols to guarantee WCAG and secure OAuth authentication standards.'
      ]
    },
    {
      role: 'UX Developer Specialist',
      company: 'PixelCraft Systems',
      duration: '2019 - 2021',
      bullets: [
        'Assembled custom block-based WYSIWYG article managers backed by React state synchronization engines.',
        'Engineered 3D graphic rendering canvas components using the WebGL browser API.',
        'Optimized core web vitals, improving LCP scores by 1.2 seconds across e-commerce pipelines.'
      ]
    }
  ];

  const coreSkills = [
    { name: 'React 19 & Next.js 15', level: 96 },
    { name: 'TypeScript & Generics', level: 94 },
    { name: 'CSS Grid, Flex & Tailwind v4', level: 92 },
    { name: 'WebSocket Systems', level: 85 },
    { name: 'Webpack / Module Federation', level: 88 },
    { name: 'WASM & Performance', level: 75 }
  ];

  const handleDownload = () => {
    alert('Simulating PDF Resume compilation... Your download will commence shortly.');
  };

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">

      {/* Background radial glows */}
      <div className="ambient-glow -top-20 left-10 ambient-indigo animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] right-5 ambient-purple" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-900 light:border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white light:text-slate-900 leading-tight">
              Interactive Resume
            </h1>
            <p className="text-sm text-zinc-450 light:text-slate-550 mt-1">
              A comprehensive chronicle of technical implementations and earned capability badges.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-bold px-5 py-3 rounded-2xl transition active:scale-[0.98] shadow-lg flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download compiled PDF
          </button>
        </div>

        {/* Split Grid (Timeline on Left, Skills/Badges on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Chronological Timeline (7/12 layout) */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-lg font-bold text-white light:text-slate-900 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
              Professional Experience
            </h2>

            <div className="relative border-l-2 border-zinc-900 light:border-slate-200 pl-6 ml-3.5 space-y-10">
              {timelineEntries.map((entry, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <span className="absolute -left-[32px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-brand-purple group-hover:bg-brand-purple transition duration-300" />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-brand-purple">{entry.duration}</span>
                      <span className="text-zinc-550">{entry.company}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-white light:text-slate-800">
                      {entry.role}
                    </h3>

                    <ul className="space-y-2 text-xs leading-relaxed text-zinc-450 light:text-slate-600 font-medium list-disc list-inside">
                      {entry.bullets.map((bullet, i) => (
                        <li key={i} className="marker:text-brand-indigo">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Radar & Badges (5/12 layout) */}
          <div className="lg:col-span-5 space-y-8">

            {/* Visual Radar container */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white light:text-slate-900 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                Capability Vector
              </h2>
              <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-4">
                <SkillRadar />
              </GlassCard>
            </div>

            {/* Core Skills Meter list */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-zinc-400 border-b border-zinc-900 pb-2">
                Core Foundations
              </h3>
              <div className="space-y-3 text-[11px] font-semibold text-zinc-450">
                {coreSkills.map((skill, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span>{skill.name}</span>
                      <span className="text-brand-cyan">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-cyan rounded-full" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Dynamic Certifications & Badges Area (Unlocked via Quizzes!) */}
            <GlassCard hoverEffect={false} className="border-brand-purple/20 bg-zinc-950/60 !p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-zinc-400 border-b border-zinc-900 pb-2 flex items-center justify-between">
                <span>Quiz Certifications & Badges</span>
                <span className="text-[10px] text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20">
                  {earnedBadges.length} Earned
                </span>
              </h3>

              {earnedBadges.length === 0 ? (
                <div className="text-center py-4 space-y-2">
                  <p className="text-xs text-zinc-550 italic">No badges earned yet.</p>
                  <p className="text-[10px] text-zinc-600 leading-normal">
                    Complete any quiz question inside our <a href="/games" className="text-brand-purple hover:underline font-bold">Games Center</a> with an accuracy of 70% or more to unlock badges dynamically!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  {earnedBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                      <svg className="w-4 h-4 shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746a1 1 0 01.532.89v5.474a9.98 9.98 0 01-5.183 8.783L10 20l-3.183-1.706a9.98 9.98 0 01-5.183-8.783V5.79a1 1 0 01.532-.89zM10 3.24L4 6.1v4.37a7.98 7.98 0 004.146 7.026L10 18.528l1.854-1.032A7.98 7.98 0 0016 10.47V6.1l-6-2.86zM9 7a1 1 0 012 0v4a1 1 0 11-2 0V7zm1 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                      <span className="line-clamp-1">{badge}</span>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

          </div>

        </div>

      </div>
    </div>
  );
}
