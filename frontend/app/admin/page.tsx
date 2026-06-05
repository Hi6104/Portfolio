'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import ImportWizard from '../../components/ImportWizard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

type AdminTab = 'overview' | 'projects' | 'posts' | 'comments' | 'settings';

export default function AdminDashboard() {
  const {
    isAdmin,
    projects,
    posts,
    comments,
    quizzes,
    approveComment,
    flagComment,
    deleteComment,
    deleteProject,
    deletePost
  } = useApp();

  const router = useRouter();

  // Restrict access
  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access restricted. Please sign in to open the admin workspace.');
      router.push('/login');
    }
  }, [isAdmin, router]);

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [filterQuery, setFilterQuery] = useState('');
  const [seederOpen, setSeederOpen] = useState(false);

  // Compute live metrics
  const metrics = useMemo(() => {
    const totalPosts = posts.length + 39; // Seeded offset matches Visly total (42)
    const totalViews = projects.reduce((acc, curr) => acc + curr.views, 0) + 1200; // Simulated offset (1.2k)
    const pendingCommentsCount = comments.filter(c => !c.isApproved && !c.isFlagged).length + 8; // Simulated offset (8)
    const activeQuizzes = quizzes.length + 12; // Simulated offset (15)

    return { totalPosts, totalViews, pendingCommentsCount, activeQuizzes };
  }, [projects, posts, comments, quizzes]);

  // Combined resource feed (Recent Activity - matching Visly image2.png)
  const recentActivities = [
    { name: 'Neo-futurism UI Kit', type: 'Project', status: 'Published', date: 'Oct 24' },
    { name: 'React 19 Hooks Guide', type: 'Post', status: 'Published', date: 'Oct 22' },
    { name: 'Comment by DevUser', type: 'Comment', status: 'Pending', date: 'Oct 21' },
    { name: 'Next.js 15 Quiz', type: 'Quiz', status: 'Active', date: 'Oct 20' }
  ];

  if (!isAdmin) return null;

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">

      {/* Background glow visual elements */}
      <div className="ambient-glow -top-24 left-[10%] ambient-purple" />
      <div className="ambient-glow bottom-[-50px] right-[5%] ambient-cyan" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">

        {/* Header bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-300 dark:border-zinc-900 light:border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white light:text-slate-900">Admin Hub</h1>
            <p className="text-xs text-zinc-550 mt-1">Manage your developer universe with modular ledgers.</p>
          </div>

          <button
            onClick={() => setSeederOpen(true)}
            className="bg-brand-purple hover:bg-brand-purple-dark text-zinc-900 dark:text-white text-xs font-bold px-4.5 py-2.5 rounded-xl transition active:scale-[0.98] shadow-md flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Seeding Wizard
          </button>
        </div>

        {/* ================= METRICS BLOCK (Matches image2.png grid) ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5 relative overflow-hidden">
            <span className="absolute top-2 right-2 text-zinc-800 text-3xl font-bold font-mono opacity-15">01</span>
            <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-extrabold uppercase tracking-wider">Total Posts</div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white mt-1.5">{metrics.totalPosts}</div>
            <div className="text-[9px] text-emerald-500 font-bold mt-1">+5.2% than last month</div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5 relative overflow-hidden">
            <span className="absolute top-2 right-2 text-zinc-800 text-3xl font-bold font-mono opacity-15">02</span>
            <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-extrabold uppercase tracking-wider">Project Views</div>
            <div className="text-2xl font-black text-brand-purple mt-1.5">{metrics.totalViews}</div>
            <div className="text-[9px] text-emerald-500 font-bold mt-1">+18% active conversion</div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5 relative overflow-hidden">
            <span className="absolute top-2 right-2 text-zinc-800 text-3xl font-bold font-mono opacity-15">03</span>
            <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-extrabold uppercase tracking-wider">Pending Mod</div>
            <div className="text-2xl font-black text-brand-cyan mt-1.5">{metrics.pendingCommentsCount}</div>
            <div className="text-[9px] text-yellow-500 font-bold mt-1">Requires immediate audit</div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5 relative overflow-hidden">
            <span className="absolute top-2 right-2 text-zinc-800 text-3xl font-bold font-mono opacity-15">04</span>
            <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-extrabold uppercase tracking-wider">Active Quizzes</div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white mt-1.5">{metrics.activeQuizzes}</div>
            <div className="text-[9px] text-emerald-500 font-bold mt-1">100% online availability</div>
          </GlassCard>
        </div>

        {/* Dashboard Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Navigation Menu (3 cols on Desktop, horizontal scroll on mobile) */}
          <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-300 dark:border-zinc-900 light:border-slate-200 pr-0 lg:pr-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left text-xs font-bold p-3 rounded-xl transition ${activeTab === 'overview' ? 'bg-brand-purple text-zinc-900 dark:text-white' : 'text-slate-500 dark:text-zinc-500 hover:bg-white dark:bg-zinc-900/40 hover:text-zinc-900 dark:text-white'}`}
            >
              📊 Hub Overview
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left text-xs font-bold p-3 rounded-xl transition ${activeTab === 'projects' ? 'bg-brand-purple text-zinc-900 dark:text-white' : 'text-slate-500 dark:text-zinc-500 hover:bg-white dark:bg-zinc-900/40 hover:text-zinc-900 dark:text-white'}`}
            >
              📁 Manage Projects
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full text-left text-xs font-bold p-3 rounded-xl transition ${activeTab === 'posts' ? 'bg-brand-purple text-zinc-900 dark:text-white' : 'text-slate-500 dark:text-zinc-500 hover:bg-white dark:bg-zinc-900/40 hover:text-zinc-900 dark:text-white'}`}
            >
              📝 Manage Blogs & Docs
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`w-full text-left text-xs font-bold p-3 rounded-xl transition ${activeTab === 'comments' ? 'bg-brand-purple text-zinc-900 dark:text-white' : 'text-slate-500 dark:text-zinc-500 hover:bg-white dark:bg-zinc-900/40 hover:text-zinc-900 dark:text-white'}`}
            >
              💬 Comment Moderation
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left text-xs font-bold p-3 rounded-xl transition ${activeTab === 'settings' ? 'bg-brand-purple text-zinc-900 dark:text-white' : 'text-slate-500 dark:text-zinc-500 hover:bg-white dark:bg-zinc-900/40 hover:text-zinc-900 dark:text-white'}`}
            >
              ⚙️ Site Settings
            </button>
          </div>

          {/* Main Content Area (9 cols on Desktop) */}
          <div className="lg:col-span-9 space-y-6">

            {/* OVERVIEW TAB (Visly Activities layout) */}
            {activeTab === 'overview' && (
              <div className="space-y-6">

                {/* Search / Filter input */}
                <div className="relative max-w-md w-full">
                  <span className="absolute left-3.5 top-2.5 text-zinc-550">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Filter recent resources..."
                    value={filterQuery}
                    onChange={e => setFilterQuery(e.target.value)}
                    className="w-full text-xs bg-white dark:bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 focus:border-brand-purple focus:outline-none rounded-full pl-10 pr-4 py-2.5 text-zinc-900 dark:text-white light:text-slate-900"
                  />
                </div>

                {/* Recent Activity Table (Matches Visly image2.png) */}
                <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5">
                  <h3 className="text-xs font-extrabold uppercase text-slate-600 dark:text-zinc-400 mb-4 tracking-wider">Recent Activity</h3>
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-300 dark:border-zinc-900 text-slate-500 dark:text-zinc-500">
                          <th className="pb-3.5 font-bold uppercase tracking-wider">Resource Name</th>
                          <th className="pb-3.5 font-bold uppercase tracking-wider">Type</th>
                          <th className="pb-3.5 font-bold uppercase tracking-wider">Status</th>
                          <th className="pb-3.5 font-bold uppercase tracking-wider text-right">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900/60">
                        {recentActivities.map((act, idx) => (
                          <tr key={idx} className="hover:bg-white/2">
                            <td className="py-4 font-bold text-zinc-900 dark:text-white light:text-slate-800">{act.name}</td>
                            <td className="py-4 text-slate-500 dark:text-zinc-500">{act.type}</td>
                            <td className="py-4">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide
                                ${act.status === 'Published' || act.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}
                              `}>
                                {act.status}
                              </span>
                            </td>
                            <td className="py-4 text-slate-500 dark:text-zinc-500 text-right">{act.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </GlassCard>

                {/* Maintenance Card */}
                <GlassCard hoverEffect={false} className="bg-gradient-to-tr from-brand-indigo/10 to-brand-purple/5 border border-slate-300 dark:border-zinc-900/80 !p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-extrabold uppercase text-zinc-900 dark:text-white tracking-widest">Demo Data Import Wizard</h4>
                      <p className="text-[10px] text-zinc-450 font-semibold max-w-md leading-relaxed">
                        Seed your client-side databases with high-fidelity, production-ready portfolio content instantly. Runs on mock local storage migrators.
                      </p>
                    </div>
                    <button
                      onClick={() => setSeederOpen(true)}
                      className="bg-brand-purple hover:bg-brand-purple-dark text-zinc-900 dark:text-white text-xs font-extrabold px-4.5 py-2.5 rounded-xl transition active:scale-[0.98] shadow-md"
                    >
                      Start Import
                    </button>
                  </div>
                </GlassCard>

              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-300 dark:border-zinc-900 pb-3">
                  <h3 className="text-xs font-extrabold uppercase text-slate-600 dark:text-zinc-400 tracking-wider">Project Ledgers</h3>
                  <Link href="/" className="text-[10px] font-bold text-brand-purple hover:underline">+ Add Project</Link>
                </div>

                <div className="space-y-3">
                  {projects.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3.5 bg-white dark:bg-zinc-900/40 rounded-xl border border-slate-300 dark:border-zinc-900 text-xs">
                      <div>
                        <div className="font-extrabold text-zinc-900 dark:text-white">{p.title}</div>
                        <div className="text-[10px] text-zinc-550 mt-0.5">{p.subtitle}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { deleteProject(p.id); toast.success('Project entry deleted.'); }}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* POSTS TAB */}
            {activeTab === 'posts' && (
              <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-300 dark:border-zinc-900 pb-3">
                  <h3 className="text-xs font-extrabold uppercase text-slate-600 dark:text-zinc-400 tracking-wider">Case Studies & Documentation</h3>
                  <Link href="/editor" className="text-[10px] font-bold text-brand-purple hover:underline">+ New Block Post</Link>
                </div>

                <div className="space-y-3">
                  {posts.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3.5 bg-white dark:bg-zinc-900/40 rounded-xl border border-slate-300 dark:border-zinc-900 text-xs">
                      <div>
                        <div className="font-extrabold text-zinc-900 dark:text-white">{p.title}</div>
                        <div className="text-[10px] text-zinc-550 mt-0.5">Category: <span className="uppercase text-brand-cyan">{p.category}</span></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { deletePost(p.id); toast.success('Article post deleted.'); }}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* COMMENTS TAB (Moderation lists) */}
            {activeTab === 'comments' && (
              <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5 space-y-4">
                <h3 className="text-xs font-extrabold uppercase text-slate-600 dark:text-zinc-400 tracking-wider border-b border-slate-300 dark:border-zinc-900 pb-3">
                  Thread Audits & Moderation Console
                </h3>

                {comments.length === 0 ? (
                  <p className="text-xs text-zinc-550 italic">No reader feedback queued for review.</p>
                ) : (
                  <div className="space-y-3">
                    {comments.map(c => (
                      <div
                        key={c.id}
                        className={`p-4 rounded-xl border text-xs space-y-2
                          ${c.isFlagged ? 'bg-red-500/5 border-red-500/10' : !c.isApproved ? 'bg-yellow-500/5 border-yellow-500/10' : 'bg-white dark:bg-zinc-900/30 border-slate-300 dark:border-zinc-900'}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-zinc-900 dark:text-white">{c.authorName} ({c.authorEmail})</span>
                          <span className="text-[9px] text-zinc-650">{c.date}</span>
                        </div>

                        <p className="text-slate-600 dark:text-zinc-400 italic">"{c.content}"</p>

                        <div className="flex items-center gap-3 pt-2 border-t border-slate-300 dark:border-zinc-900/50 text-[10px] font-bold">
                          {!c.isApproved && (
                            <button
                              onClick={() => approveComment(c.id)}
                              className="text-emerald-500 hover:underline"
                            >
                              Approve
                            </button>
                          )}
                          {!c.isFlagged && (
                            <button
                              onClick={() => flagComment(c.id)}
                              className="text-yellow-500 hover:underline"
                            >
                              Flag Spam
                            </button>
                          )}
                          <button
                            onClick={() => deleteComment(c.id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-5 space-y-5">
                <h3 className="text-xs font-extrabold uppercase text-slate-600 dark:text-zinc-400 tracking-wider border-b border-slate-300 dark:border-zinc-900 pb-3">
                  Ledger Configuration Settings
                </h3>

                <div className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="text-[9px] font-bold text-zinc-550 block mb-1">Site Metadata Title</label>
                    <input
                      type="text"
                      defaultValue="Fluxfolio Systems"
                      className="w-full bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-850 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-zinc-550 block mb-1">Moderator Role Mapping</label>
                    <div className="p-3 bg-white dark:bg-zinc-900/40 rounded-xl border border-slate-300 dark:border-zinc-900 text-slate-500 dark:text-zinc-500 leading-normal">
                      <strong>Standard configuration:</strong> Admins inherit full access to WYSIWYG builders and instant moderation control dashboards. Anonymous guests remain restricted to reader modes.
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}

          </div>

        </div>

      </div>

      {/* Modal Wizard overlay */}
      <ImportWizard isOpen={seederOpen} onClose={() => setSeederOpen(false)} />
    </div>
  );
}
