'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import Link from 'next/link';

export default function ProjectsList() {
  const { projects, searchQuery, setSearchQuery, likeProject } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract all unique tech tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.techStack.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [projects]);

  // Filter and Sort projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Site search bar + local filter
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesTag = selectedTag === 'All' || project.techStack.includes(selectedTag);

        return matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === 'popularity') {
          return b.views - a.views;
        }
        // Simulated chronological order sorting
        return b.likes - a.likes; // Popularity fallback in this context
      });
  }, [projects, searchQuery, selectedTag, sortBy]);

  // Calculate project stats for desktop sidebar
  const stats = useMemo(() => {
    const total = projects.length;
    const totalViews = projects.reduce((acc, curr) => acc + curr.views, 0);
    const techCounts: Record<string, number> = {};
    projects.forEach(p => p.techStack.forEach(t => {
      techCounts[t] = (techCounts[t] || 0) + 1;
    }));
    const topTech = Object.entries(techCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);

    return { total, totalViews, topTech };
  }, [projects]);

  const testimonials = [
    { name: 'Marcus Sterling', company: 'NextTech Corp', quote: 'Felix restructured our UI design token delivery system, shrinking build-compilation cycles from minutes to 4.2 seconds.' },
    { name: 'Elena Rostova', company: 'CloudCore Inc', quote: 'The real-time node rendering engines deployed by Felix are lightweight, accessible, and elegant.' }
  ];

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">

      {/* Glow shapes */}
      <div className="ambient-glow -top-24 left-10 ambient-indigo" />
      <div className="ambient-glow bottom-[-100px] right-[10%] ambient-purple" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Page Header */}
        <div className="space-y-4 mb-10 text-center md:text-left border-b border-slate-300 dark:border-zinc-900 light:border-slate-200 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white light:text-slate-900">
            Systems Portfolio Grid
          </h1>
          <p className="text-sm text-zinc-450 light:text-slate-550 max-w-xl">
            A comprehensive index of design architectures, high-contrast dashboards, and browser optimization case studies.
          </p>
        </div>

        {/* Outer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Area (75% on Desktop) */}
          <div className="lg:col-span-9 space-y-8">

            {/* Filter Toolbar (Desktop) */}
            <div className="hidden md:flex items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-zinc-950/60 light:bg-white border border-slate-300 dark:border-zinc-900 light:border-slate-200 rounded-2xl">
              {/* Category pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {allTags.slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${selectedTag === tag ? 'bg-brand-purple text-zinc-900 dark:text-white' : 'bg-white dark:bg-zinc-900 light:bg-slate-100 hover:bg-zinc-850 text-slate-600 dark:text-zinc-400 light:text-slate-650'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Sorting triggers */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-slate-500 dark:text-zinc-500">Sort by:</span>
                <button
                  onClick={() => setSortBy('date')}
                  className={`p-2 rounded-lg transition ${sortBy === 'date' ? 'text-brand-purple bg-brand-purple/10' : 'text-zinc-450 hover:text-zinc-900 dark:text-white light:hover:text-slate-900'}`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setSortBy('popularity')}
                  className={`p-2 rounded-lg transition ${sortBy === 'popularity' ? 'text-brand-purple bg-brand-purple/10' : 'text-zinc-450 hover:text-zinc-900 dark:text-white light:hover:text-slate-900'}`}
                >
                  Views
                </button>
              </div>
            </div>

            {/* Mobile Filter Trigger Button */}
            <div className="md:hidden flex items-center justify-between gap-3">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 bg-white dark:bg-zinc-900 light:bg-slate-100 border border-slate-200 dark:border-zinc-800 text-xs font-bold px-4 py-2.5 rounded-xl text-zinc-900 dark:text-white light:text-slate-800"
              >
                <svg className="w-4 h-4 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter: {selectedTag}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity')}
                className="bg-white dark:bg-zinc-900 text-xs font-bold p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-purple"
              >
                <option value="date">Featured</option>
                <option value="popularity">Views</option>
              </select>
            </div>

            {/* Mobile Filter Drawer (Collapsible) */}
            {mobileFiltersOpen && (
              <div className="md:hidden bg-white dark:bg-zinc-900/60 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 space-y-3 animate-fadeIn">
                <h3 className="text-xs font-extrabold uppercase text-zinc-550">Category Filter</h3>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(tag);
                        setMobileFiltersOpen(false);
                      }}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-lg ${selectedTag === tag ? 'bg-brand-purple text-zinc-900 dark:text-white' : 'bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border border-zinc-850'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Search stats */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-16 bg-slate-50 dark:bg-zinc-950/40 rounded-3xl border border-slate-300 dark:border-zinc-900">
                <svg className="mx-auto w-12 h-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-sm font-bold text-slate-600 dark:text-zinc-400 mt-4">No matching architectural entries</h3>
                <p className="text-xs text-zinc-550 mt-1">Try updating your filters or search keywords.</p>
                <button
                  onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
                  className="mt-4 text-xs font-bold text-brand-purple hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Grid display layout (3-column on desktop, 1-column on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <GlassCard
                  key={project.id}
                  glowColor={project.isFeatured ? 'purple' : 'none'}
                  className="flex flex-col justify-between h-full border-slate-300 dark:border-zinc-900/60"
                  onClick={() => window.location.href = `/projects/${project.id}`}
                >
                  <div className="space-y-4">

                    {/* Mockup image */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-zinc-800/40">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {project.isFeatured && (
                        <div className="absolute top-2.5 right-2.5 bg-brand-purple text-zinc-900 dark:text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-md border border-white/10 uppercase tracking-wide">
                          Featured
                        </div>
                      )}
                    </div>

                    <h3 className="text-base font-extrabold text-zinc-900 dark:text-white light:text-slate-900 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-zinc-450 light:text-slate-500 leading-relaxed line-clamp-2">
                      {project.subtitle}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-extrabold bg-white dark:bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 text-slate-500 dark:text-zinc-500 light:text-slate-650 px-2 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between border-t border-slate-300 dark:border-zinc-900 light:border-slate-100 pt-4 mt-6 text-[10px] font-bold text-slate-500 dark:text-zinc-500">
                    <span className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-zinc-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {project.views} views
                    </span>
                    <span className="text-brand-purple group-hover:underline">
                      Inspect Case Study →
                    </span>
                  </div>

                </GlassCard>
              ))}
            </div>

          </div>

          {/* Sidebar Area (25% on Desktop - hidden on mobile) */}
          <div className="hidden lg:col-span-3 lg:flex flex-col gap-6">

            {/* Quick Stats Panel */}
            <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-4 border-b border-slate-300 dark:border-zinc-900 pb-2">
                Metrics & Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-wider">Total Deployments</div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-white">{stats.total}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-wider">Audit Viewership</div>
                  <div className="text-2xl font-black text-brand-purple">{stats.totalViews}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-wider">Core Foundations</div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {stats.topTech.map((tech, i) => (
                      <span key={i} className="text-[9px] font-bold bg-brand-indigo/10 border border-brand-indigo/25 text-brand-indigo px-2 py-0.5 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Testimonials Sidecar */}
            <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-4 border-b border-slate-300 dark:border-zinc-900 pb-2">
                Operations Feedback
              </h3>
              <div className="space-y-6">
                {testimonials.map((test, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-[11px] leading-relaxed text-zinc-450 italic">
                      "{test.quote}"
                    </p>
                    <div className="text-[10px]">
                      <span className="font-extrabold text-zinc-900 dark:text-white">{test.name}</span>
                      <span className="text-zinc-600 block">{test.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>

        </div>

      </div>
    </div>
  );
}
