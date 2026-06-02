'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import Link from 'next/link';

export default function DocsList() {
  const { posts, searchQuery, setSearchQuery } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'blog' | 'docs'>('all');

  // Extract unique tags from articles
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);

      const matchesCategory =
        categoryFilter === 'all' || post.category === categoryFilter;

      return matchesSearch && matchesTag && matchesCategory && post.isPublished;
    });
  }, [posts, searchQuery, selectedTag, categoryFilter]);

  const trendingPosts = posts.filter(p => p.isTrending).slice(0, 3);

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">

      {/* Background radial glow visual accents */}
      <div className="ambient-glow -top-24 right-5 ambient-cyan animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] left-5 ambient-purple" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Page Header */}
        <div className="space-y-4 mb-10 text-center md:text-left border-b border-zinc-900 light:border-slate-200 pb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white light:text-slate-900">
            Technical Documentation & Blog
          </h1>
          <p className="text-sm text-zinc-450 light:text-slate-550 max-w-xl">
            Guides, performance optimizations, and backend integrations designed to help you construct resilient systems.
          </p>
        </div>

        {/* Outer Grid (Desktop: 2-column, Mobile: 1-column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main List Area (Left Column - 8/12 layout) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Category tabs */}
            <div className="flex items-center gap-1 bg-zinc-900/60 light:bg-slate-100 p-1.5 rounded-2xl border border-zinc-850 light:border-slate-200 w-fit">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${categoryFilter === 'all' ? 'bg-brand-purple text-white' : 'text-zinc-500 hover:text-zinc-350'}`}
              >
                All Posts
              </button>
              <button
                onClick={() => setCategoryFilter('blog')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${categoryFilter === 'blog' ? 'bg-brand-purple text-white' : 'text-zinc-500 hover:text-zinc-350'}`}
              >
                Blog Articles
              </button>
              <button
                onClick={() => setCategoryFilter('docs')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${categoryFilter === 'docs' ? 'bg-brand-purple text-white' : 'text-zinc-500 hover:text-zinc-350'}`}
              >
                Documentation
              </button>
            </div>

            {/* List entries */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-zinc-950/40 rounded-3xl border border-zinc-900">
                <svg className="mx-auto w-12 h-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-sm font-bold text-zinc-450 mt-4">No technical write-ups found</h3>
                <p className="text-xs text-zinc-600 mt-1">Try broadening your search query tags.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <GlassCard
                    key={post.id}
                    className="flex flex-col border-zinc-900/60 transition group hover:border-brand-purple/20"
                    onClick={() => window.location.href = `/docs/${post.id}`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">

                      {/* Image panel */}
                      <div className="md:w-1/3 aspect-video md:aspect-square rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      {/* Content panel */}
                      <div className="md:w-2/3 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">

                          {/* Tags / Metadata */}
                          <div className="flex items-center justify-between text-[10px] font-extrabold text-zinc-500">
                            <div className="flex gap-1.5">
                              {post.tags.slice(0, 2).map((t, i) => (
                                <span key={i} className="text-brand-cyan uppercase bg-brand-cyan/5 border border-brand-cyan/15 px-2 py-0.5 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <span>{post.date} · {post.readTime}</span>
                          </div>

                          <h3 className="text-base md:text-lg font-extrabold text-white light:text-slate-900 group-hover:text-brand-purple transition leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-xs text-zinc-450 light:text-slate-500 leading-relaxed line-clamp-3">
                            {post.subtitle}
                          </p>

                        </div>

                        {/* Interactive counts */}
                        <div className="flex items-center justify-between mt-4 border-t border-zinc-900/60 light:border-slate-100 pt-4 text-[10px] font-bold text-zinc-500">
                          <span className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 text-zinc-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {post.likes} likes
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3.5 h-3.5 text-zinc-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              {post.commentsCount} comments
                            </span>
                          </span>
                        </div>
                        <span className="text-zinc-450 light:text-slate-650 group-hover:text-brand-purple">Read Guide →</span>
                      </div>

                    </div>
                  </GlassCard>

                ))}
              </div>
            )}

          </div>

          {/* Sidebar Area (Right Column - 4/12 layout) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Quick Profile Bio */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5">
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80"
                  alt="Author Avatar"
                  className="w-10 h-10 rounded-full border border-brand-purple"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-white">Felix De</h4>
                  <p className="text-[10px] text-zinc-550">Lead Architect & Creator</p>
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-450 font-medium">
                I write about optimizing DOM render loops, configuring multi-stage deployments, and clean typescript practices. Follow for weekly deep dives.
              </p>
            </GlassCard>

            {/* Trending Tags Panel */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5">
              <h4 className="text-xs font-extrabold tracking-wider uppercase text-zinc-450 mb-3 border-b border-zinc-900 pb-2">
                Trending Categories
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition
                      ${selectedTag === tag ? 'bg-brand-purple text-white border-brand-purple' : 'bg-zinc-900 light:bg-slate-100 hover:bg-zinc-850 text-zinc-450 light:text-slate-650 border-zinc-850 light:border-slate-200'}
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Trending / Recommended Posts List */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5">
              <h4 className="text-xs font-extrabold tracking-wider uppercase text-zinc-450 mb-3 border-b border-zinc-900 pb-2">
                Trending Deep-Dives
              </h4>
              <div className="space-y-4">
                {trendingPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/docs/${post.id}`}
                    className="block group border-b border-zinc-900/60 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="text-[9px] font-extrabold text-brand-purple uppercase tracking-wider">
                      {post.tags[0]}
                    </div>
                    <h5 className="text-[11px] font-extrabold text-zinc-350 light:text-slate-800 mt-1 leading-normal group-hover:text-brand-purple transition line-clamp-2">
                      {post.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </GlassCard>

            {/* RSS / Subscribe Card */}
            <GlassCard hoverEffect={false} className="bg-gradient-to-tr from-brand-indigo/10 to-brand-purple/5 border border-zinc-900/80 !p-5 relative overflow-hidden shadow-lg">
              <h4 className="text-xs font-extrabold uppercase text-white">Subscribe to RSS</h4>
              <p className="text-[10px] leading-relaxed text-zinc-450 font-semibold mt-1">
                Receive markdown code samples and direct case summaries as they are published.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter feeds successfully!'); }}
                className="mt-3 flex items-center gap-1.5"
              >
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  className="bg-zinc-900 text-[10px] rounded-lg border border-zinc-850 p-2 text-white w-full focus:outline-none placeholder-zinc-650"
                />
                <button
                  type="submit"
                  className="bg-brand-purple hover:bg-brand-purple-dark text-white text-[10px] font-extrabold px-3 py-2 rounded-lg"
                >
                  Join
                </button>
              </form>
            </GlassCard>

          </div>

        </div>

      </div>
    </div >
  );
}
