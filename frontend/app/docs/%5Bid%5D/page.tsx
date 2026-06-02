'use client';

import React, { use, useState } from 'react';
import { useApp } from '../../../context/AppContext';
import GlassCard from '../../../components/GlassCard';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetail({ params }: PageProps) {
  const { id } = use(params);
  const {
    posts,
    comments,
    addComment,
    approveComment,
    flagComment,
    deleteComment,
    likePost,
    isAdmin
  } = useApp();

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-xl font-bold text-white">Article Not Found</h2>
        <p className="text-zinc-500 text-sm mt-2">The requested write-up does not exist in our system database.</p>
        <Link href="/docs" className="text-brand-purple font-bold text-sm mt-4 hover:underline">
          ← Return to Docs Directory
        </Link>
      </div>
    );
  }

  // Filter comments (approved for public, all for Admin moderation)
  const postComments = comments.filter(
    c => c.targetType === 'post' && c.targetId === post.id && (c.isApproved || isAdmin)
  );

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    addComment('post', post.id, authorName, authorEmail, commentContent);
    setCommentContent('');
    alert('Thank you! Your discussion thread is submitted and awaiting moderator approval.');
  };

  // Find 2 recommended reading posts
  const recommendedPosts = posts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">
      
      {/* Background glow graphics */}
      <div className="ambient-glow -top-24 left-[15%] ambient-purple animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] right-[10%] ambient-cyan" />

      <div className="max-w-3xl mx-auto space-y-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/docs" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-brand-purple transition"
        >
          ← Return to Technical Directory
        </Link>

        {/* ================= ARTICLE HERO ================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-extrabold bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {post.tags[0]}
            </span>
            <span className="text-[10px] font-bold text-zinc-500">{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white light:text-slate-900 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-sm md:text-base text-zinc-400 light:text-slate-650 leading-relaxed font-semibold">
            {post.subtitle}
          </p>

          {/* Author metadata block */}
          <div className="flex items-center gap-3 border-t border-b border-zinc-900 light:border-slate-200 py-4 mt-8">
            <img 
              src={post.authorAvatar} 
              alt={post.author} 
              className="w-10 h-10 rounded-full border border-zinc-800" 
            />
            <div>
              <div className="text-xs font-extrabold text-white light:text-slate-800">By {post.author}</div>
              <div className="text-[10px] text-zinc-550 mt-0.5">Published on {post.date}</div>
            </div>
            
            {/* Inline Upvote button */}
            <button
              onClick={() => { likePost(post.id); alert('Upvoted article successfully!'); }}
              className="ml-auto flex items-center gap-1.5 p-2 px-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 text-xs font-bold border border-zinc-850 text-zinc-450 hover:text-red-400 transition"
            >
              <svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {post.likes} Likes
            </button>
          </div>

          {/* Hero visual image */}
          <div className="w-full aspect-video rounded-3xl overflow-hidden border border-zinc-800/40 shadow-2xl relative">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ================= ARTICLE BODY & RICH BLOCKS ================= */}
        <section className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed text-zinc-300 light:text-slate-650 space-y-6">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="rich-content space-y-6"
          />

          {/* Premium Static visual CTAs inside articles (matches image5.png) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            
            <GlassCard hoverEffect={false} className="bg-gradient-to-tr from-brand-purple/15 to-transparent border border-brand-purple/20">
              <h4 className="text-sm font-extrabold text-white">Ready to test your skills?</h4>
              <p className="text-[10px] text-zinc-400 mt-1 leading-normal">Take our CSS Architecture quiz and earn a structural badge for your resume.</p>
              <Link 
                href="/games" 
                className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-brand-purple text-white px-3.5 py-1.5 rounded-lg mt-4 active:scale-[0.98] transition"
              >
                Start Quiz →
              </Link>
            </GlassCard>

            <GlassCard hoverEffect={false} className="bg-gradient-to-tr from-brand-cyan/15 to-transparent border border-brand-cyan/20">
              <h4 className="text-sm font-extrabold text-white">Watch the Implementation</h4>
              <p className="text-[10px] text-zinc-400 mt-1 leading-normal">See a live-coding session where we build these frosted glass effects from scratch.</p>
              <button 
                onClick={() => alert('Launching video canvas presentation...')}
                className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-brand-cyan text-white px-3.5 py-1.5 rounded-lg mt-4 active:scale-[0.98] transition"
              >
                Watch Video →
              </button>
            </GlassCard>

          </div>
        </section>

        {/* ================= DISCUSSION / COMMENTS WIDGET ================= */}
        <section className="border-t border-zinc-900 light:border-slate-200 pt-12 space-y-8">
          
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white light:text-slate-900">Discussion ({postComments.length})</h3>
            <span className="text-xs font-semibold text-zinc-550">Reader Interaction Forum</span>
          </div>

          {/* Comment submission form */}
          <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/40">
            <h4 className="text-xs font-extrabold uppercase text-zinc-400 mb-4 tracking-wider">Join the conversation...</h4>
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-zinc-550 block mb-1">Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Sarah Chen"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="w-full text-xs bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-250 rounded-xl px-3.5 py-2.5 text-white light:text-slate-900 focus:outline-none focus:border-brand-purple"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-550 block mb-1">Email (Optional - Hidden)</label>
                  <input
                    type="email"
                    placeholder="sarah@designops.co"
                    value={authorEmail}
                    onChange={e => setAuthorEmail(e.target.value)}
                    className="w-full text-xs bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-250 rounded-xl px-3.5 py-2.5 text-white light:text-slate-900 focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-zinc-550 block mb-1">Your Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share a thought, ask a question, or contribute insights..."
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  className="w-full text-xs bg-zinc-900/60 light:bg-slate-100 border border-zinc-850 light:border-slate-250 rounded-xl p-3.5 text-white light:text-slate-900 focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex items-center justify-end text-[10px] text-zinc-650 font-semibold gap-4">
                <span>Comments are held for moderation to maintain discussion quality.</span>
                <button
                  type="submit"
                  className="bg-brand-purple hover:bg-brand-purple-dark text-white font-extrabold px-6 py-2.5 rounded-xl text-xs active:scale-[0.98] transition shadow-md"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </GlassCard>

          {/* Comments list feed */}
          <div className="space-y-4">
            {postComments.length === 0 ? (
              <p className="text-xs text-zinc-650 italic text-center py-6">No discussions active. Start the thread!</p>
            ) : (
              postComments.map((comment) => (
                <div 
                  key={comment.id}
                  className={`p-5 rounded-2xl border text-xs space-y-3 relative overflow-hidden transition-all duration-300
                    ${comment.isFlagged ? 'bg-red-500/5 border-red-500/20' : !comment.isApproved ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-zinc-900/30 light:bg-white border-zinc-900 light:border-slate-200'}
                  `}
                >
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex gap-1">
                      {comment.isFlagged && (
                        <span className="bg-red-500/20 text-red-400 font-extrabold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Flagged spambot</span>
                      )}
                      {!comment.isApproved && !comment.isFlagged && (
                        <span className="bg-yellow-500/20 text-yellow-400 font-extrabold px-2 py-0.5 rounded text-[8px] uppercase tracking-wider">Awaiting review</span>
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

                  <p className="leading-relaxed text-zinc-450 light:text-slate-650 font-medium">
                    {comment.content}
                  </p>

                  {/* Inline Admin Controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-2.5 pt-3 border-t border-zinc-900/80 light:border-slate-100 text-[10px] font-bold">
                      <span className="text-brand-purple">MODERATION ACTIONS:</span>
                      {!comment.isApproved && (
                        <button
                          onClick={() => approveComment(comment.id)}
                          className="text-emerald-500 hover:underline"
                        >
                          Approve Publish
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

        {/* ================= RECOMMENDED READING CAROUSEL ================= */}
        <section className="border-t border-zinc-900 light:border-slate-200 pt-12 space-y-6">
          <h3 className="text-lg font-extrabold text-white light:text-slate-900">Suggested Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedPosts.map(p => (
              <GlassCard
                key={p.id}
                onClick={() => window.location.href = `/docs/${p.id}`}
                className="flex flex-col border-zinc-900/60 !p-5"
              >
                <div className="text-[9px] font-extrabold text-brand-cyan uppercase tracking-wider">{p.tags[0]}</div>
                <h4 className="text-sm font-extrabold text-white light:text-slate-900 mt-1 leading-snug line-clamp-1">{p.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">{p.subtitle}</p>
              </GlassCard>
            ))}
          </div>
        </section>

      </div>

      {/* Sticky Mobile Reactions Bar (matches screenshot image4.png at the viewport bottom) */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-zinc-950/95 light:bg-white/95 backdrop-blur-md border-t border-zinc-900 light:border-slate-150 py-3.5 px-6 flex items-center justify-between text-zinc-400 light:text-slate-500 shadow-2xl">
        <button 
          onClick={() => { likePost(post.id); alert('Upvoted successfully!'); }}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-400"
        >
          <svg className="w-5.5 h-5.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          {post.likes} Likes
        </button>
        
        <button 
          onClick={() => {
            const el = document.getElementById('comment-form');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-400"
        >
          <svg className="w-5.5 h-5.5 text-zinc-550" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {postComments.length} comments
        </button>

        <button 
          onClick={() => alert('Link copied to clipboard!')}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-400"
        >
          <svg className="w-5.5 h-5.5 text-zinc-550" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l4.636-2.318m0 0a3 3 0 102.686-2.686m-2.686 2.686a3 3 0 11-2.685 4.636M15 5.25a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Share
        </button>
      </div>

    </div>
  );
}
