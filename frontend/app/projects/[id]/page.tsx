'use client';

import React, { use, useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import GlassCard from '../../../components/GlassCard';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetail({ params }: PageProps) {
  const { id } = use(params);
  const {
    projects,
    comments,
    addComment,
    approveComment,
    flagComment,
    deleteComment,
    likeProject,
    incrementProjectViews,
    isAdmin
  } = useApp();

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const project = projects.find(p => p.id === id);

  // Increment views exactly once when project mounts
  useEffect(() => {
    if (project) {
      incrementProjectViews(project.id);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-xl font-bold text-white">System Architecture Not Found</h2>
        <p className="text-zinc-500 text-sm mt-2">The requested project ID does not exist in our ledger.</p>
        <Link href="/projects" className="text-brand-purple font-bold text-sm mt-4 hover:underline">
          ← Return to Portfolio Grid
        </Link>
      </div>
    );
  }

  // Filter approved comments for public, or ALL comments for Admin moderation
  const projectComments = comments.filter(
    c => c.targetType === 'project' && c.targetId === project.id && (c.isApproved || isAdmin)
  );

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    addComment('project', project.id, authorName, authorEmail, commentContent);
    setCommentContent('');
    alert('Your comment was submitted and queued for administrator moderation.');
  };

  // Find 2 related projects
  const relatedProjects = projects.filter(p => p.id !== project.id).slice(0, 2);

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">
      
      {/* Visual background ambient gradient lights */}
      <div className="ambient-glow -top-24 left-[20%] ambient-indigo" />
      <div className="ambient-glow bottom-[-50px] right-0 ambient-purple" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Breadcrumb path */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-brand-purple transition"
        >
          ← Return to Systems Grid
        </Link>

        {/* ================= HERO AREA ================= */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold bg-brand-purple/10 border border-brand-purple/20 text-brand-purple px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {project.role}
            </span>
            <span className="text-[10px] font-bold text-zinc-500">
              {project.timeline}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white light:text-slate-900 leading-tight">
            {project.title}
          </h1>
          
          <p className="text-base md:text-lg text-zinc-400 light:text-slate-650 leading-relaxed font-medium">
            {project.subtitle}
          </p>

          {/* Core Action triggers */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition active:scale-[0.98] shadow-[0_4px_15px_rgba(139,92,246,0.3)]"
            >
              Launch Live Demo
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 light:bg-slate-100 hover:bg-zinc-850 light:hover:bg-slate-200 border border-zinc-800 light:border-slate-250 text-white light:text-slate-800 text-xs font-bold px-5 py-2.5 rounded-xl transition active:scale-[0.98]"
            >
              Browse Repository
            </a>
            <button
              onClick={() => { likeProject(project.id); alert('Upvoted successfully!'); }}
              className="ml-auto flex items-center gap-1.5 p-2 px-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 text-xs font-bold border border-zinc-850 text-zinc-450 hover:text-red-400 transition"
            >
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {project.likes} upvotes
            </button>
          </div>

          {/* Hero Showcase Mockup Panel */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-zinc-800/60 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ================= TECHNICAL SPECS (PROBLEM -> APPROACH -> SOLUTION) ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-zinc-900 light:border-slate-200 pt-12">
          
          {/* Main Case Study text details (8 columns) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* PROBLEM */}
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-white light:text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-red-500 rounded-full" />
                The Problem
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400 light:text-slate-600 font-medium">
                {project.problem}
              </p>
            </div>

            {/* APPROACH */}
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-white light:text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-indigo rounded-full" />
                Engineering Approach
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400 light:text-slate-650 font-medium">
                {project.approach}
              </p>
            </div>

            {/* CODE BLOCK VISUALIZER */}
            {project.codeSnippet && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-extrabold text-zinc-500 bg-zinc-900/60 border border-zinc-850 px-4 py-2 rounded-t-xl">
                  <span className="uppercase text-brand-cyan">{project.codeLanguage} snippet</span>
                  <span>Syntax Highlighting Enabled</span>
                </div>
                <pre className="p-5 bg-zinc-950 border border-zinc-900 rounded-b-xl overflow-x-auto text-[11px] font-mono text-zinc-300 leading-5">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* SOLUTION */}
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-white light:text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-brand-cyan rounded-full" />
                The Solution
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400 light:text-slate-650 font-medium">
                {project.solution}
              </p>
            </div>

            {/* SCREENSHOTS GALLERY STRIP */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold tracking-widest text-zinc-550 uppercase">Architecture Screenshots</h4>
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((img, i) => (
                  <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-zinc-900 shadow-md">
                    <img src={img} alt="Showcase panels" className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Rail Details (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tech chips sidebar */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5">
              <h4 className="text-xs font-extrabold tracking-wider uppercase text-zinc-400 mb-3 border-b border-zinc-900 pb-2">
                Architectural Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-extrabold bg-brand-indigo/15 border border-brand-indigo/25 text-brand-indigo px-2.5 py-1 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Quantified Metrics bullets panel */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5">
              <h4 className="text-xs font-extrabold tracking-wider uppercase text-zinc-400 mb-3 border-b border-zinc-900 pb-2">
                Measurable Impact
              </h4>
              <ul className="space-y-3 text-[11px] leading-relaxed text-zinc-450 font-medium list-disc list-inside">
                {project.metrics.map((metric, i) => (
                  <li key={i} className="marker:text-brand-purple">
                    {metric}
                  </li>
                ))}
              </ul>
            </GlassCard>

          </div>

        </section>

        {/* ================= RELATED PROJECTS ================= */}
        <section className="border-t border-zinc-900 light:border-slate-200 pt-12 space-y-6">
          <h3 className="text-xl font-bold text-white light:text-slate-900">Explore Other Systems</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map(proj => (
              <GlassCard
                key={proj.id}
                onClick={() => window.location.href = `/projects/${proj.id}`}
                className="flex flex-col border-zinc-900/60 !p-5"
              >
                <h4 className="text-sm font-extrabold text-white light:text-slate-900">{proj.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1">{proj.subtitle}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* ================= INTEGRATED DISCUSSION / COMMENTS AND MODERATION AREA ================= */}
        <section className="border-t border-zinc-900 light:border-slate-200 pt-12 space-y-8">
          
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white light:text-slate-900">Discussion Forum</h3>
            <span className="text-xs font-semibold text-zinc-550">{projectComments.length} active threads</span>
          </div>

          {/* Comment Form for anonymous viewers */}
          <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/40">
            <h4 className="text-xs font-extrabold uppercase text-zinc-400 mb-4 tracking-wider">Leave a comment (Anonymous Reader Mode)</h4>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-550 block mb-1">Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Sarah Chen"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="w-full text-xs bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 rounded-xl px-3.5 py-2.5 text-white light:text-slate-950 focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-550 block mb-1">Email (Optional - Hidden)</label>
                  <input
                    type="email"
                    placeholder="sarah@designops.co"
                    value={authorEmail}
                    onChange={e => setAuthorEmail(e.target.value)}
                    className="w-full text-xs bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 rounded-xl px-3.5 py-2.5 text-white light:text-slate-950 focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-zinc-550 block mb-1">Comment content</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share your thoughts on this architecture plan..."
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  className="w-full text-xs bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-200 rounded-xl p-3.5 text-white light:text-slate-955 focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-600 font-semibold">
                <span>⚠️ Anti-spam enabled: comments containing spam triggers are auto-flagged.</span>
                <button
                  type="submit"
                  className="bg-brand-indigo hover:bg-brand-indigo-dark text-white font-extrabold px-5 py-2 rounded-xl text-xs active:scale-[0.98] transition"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </GlassCard>

          {/* Comments List & Role-based moderation inline */}
          <div className="space-y-4">
            {projectComments.length === 0 ? (
              <p className="text-xs text-zinc-600 italic">No approved discussions. Be the first to start a conversation!</p>
            ) : (
              projectComments.map((comment) => (
                <div 
                  key={comment.id} 
                  className={`p-5 rounded-2xl border text-xs space-y-3 relative overflow-hidden transition-all duration-300
                    ${comment.isFlagged ? 'bg-red-500/5 border-red-500/20' : !comment.isApproved ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-zinc-900/30 light:bg-white border-zinc-900 light:border-slate-200'}
                  `}
                >
                  {/* Status labels for admin */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-1">
                      {comment.isFlagged && (
                        <span className="bg-red-500/20 text-red-400 font-extrabold px-2 py-0.5 rounded text-[8px] uppercase tracking-wide">
                          Flagged
                        </span>
                      )}
                      {!comment.isApproved && !comment.isFlagged && (
                        <span className="bg-yellow-500/20 text-yellow-400 font-extrabold px-2 py-0.5 rounded text-[8px] uppercase tracking-wide">
                          Pending Moderation
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-indigo/15 text-brand-indigo font-bold flex items-center justify-center">
                      {comment.authorName[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-extrabold text-white light:text-slate-800">{comment.authorName}</div>
                      <div className="text-[9px] text-zinc-550 mt-0.5">{comment.date}</div>
                    </div>
                  </div>

                  <p className="leading-relaxed text-zinc-400 light:text-slate-650 font-medium">
                    {comment.content}
                  </p>

                  {/* ADMIN MODERATOR TOOLS (Inline - visible only to logged-in Admin, matching screenshots exactly) */}
                  {isAdmin && (
                    <div className="flex items-center gap-2.5 pt-3 border-t border-zinc-900/80 light:border-slate-100 text-[10px] font-bold">
                      <span className="text-brand-purple">ADMIN ACCESS CONTROL:</span>
                      {!comment.isApproved && (
                        <button
                          onClick={() => approveComment(comment.id)}
                          className="text-emerald-500 hover:underline"
                        >
                          Approve Comment
                        </button>
                      )}
                      {!comment.isFlagged && (
                        <button
                          onClick={() => flagComment(comment.id)}
                          className="text-yellow-500 hover:underline"
                        >
                          Flag Spambot
                        </button>
                      )}
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>

        </section>

      </div>
    </div>
  );
}
