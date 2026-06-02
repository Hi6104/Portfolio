'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import { useRouter } from 'next/navigation';

interface EditorBlock {
  id: string;
  type: 'heading' | 'text' | 'code' | 'callout';
  value: string;
  language?: string; // only for code block
  calloutType?: 'info' | 'warning'; // only for callout block
}

export default function WYSIWYGEditor() {
  const { isAdmin, addPost, posts } = useApp();
  const router = useRouter();

  // Redirect non-admins
  useEffect(() => {
    if (!isAdmin) {
      alert('Access restricted. Please sign in as an administrator to load editor suites.');
      router.push('/login');
    }
  }, [isAdmin]);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<'blog' | 'docs'>('blog');
  const [isPublished, setIsPublished] = useState(true);
  const [tagsInput, setTagsInput] = useState('React, Architecture, WebDev');
  const [readTime, setReadTime] = useState('6 min read');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  // Block states
  const [blocks, setBlocks] = useState<EditorBlock[]>([
    { id: 'b1', type: 'heading', value: '1. Core Conceptualization Overview' },
    { id: 'b2', type: 'text', value: 'Input technical descriptions here. You can click Add Block below to introduce customized layouts, code blocks, or alert callouts.' },
    { id: 'b3', type: 'code', value: '// Add source code here\nconsole.log("Fluxfolio Editor Ready");', language: 'typescript' }
  ]);

  // Block history saves simulation
  const [history, setHistory] = useState<{ time: string; blockCount: number }[]>([
    { time: '10 mins ago', blockCount: 3 },
    { time: 'Just now', blockCount: 3 }
  ]);

  const addBlock = (type: 'heading' | 'text' | 'code' | 'callout') => {
    const newBlock: EditorBlock = {
      id: 'block_' + Date.now() + Math.random().toString(36).substr(2, 4),
      type,
      value: type === 'code' ? '// Input code snippet' : type === 'callout' ? 'Alert message content' : 'New block text',
      language: type === 'code' ? 'typescript' : undefined,
      calloutType: type === 'callout' ? 'info' : undefined
    };
    setBlocks([...blocks, newBlock]);
    setHistory([...history, { time: new Date().toLocaleTimeString(), blockCount: blocks.length + 1 }]);
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlockValue = (id: string, val: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, value: val } : b));
  };

  const updateBlockLanguage = (id: string, lang: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, language: lang } : b));
  };

  // Convert editor blocks to simulated HTML rich content
  const compileBlocksToHTML = () => {
    let html = '';
    blocks.forEach(b => {
      if (b.type === 'heading') {
        html += `<h3>${b.value}</h3>\n`;
      } else if (b.type === 'text') {
        html += `<p>${b.value}</p>\n`;
      } else if (b.type === 'code') {
        html += `<pre><code class="language-${b.language || 'typescript'}">${b.value}</code></pre>\n`;
      } else if (b.type === 'callout') {
        html += `
          <div class="callout callout-info">
            <strong>Block Alert Note:</strong> ${b.value}
          </div>\n`;
      }
    });
    return html;
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert('Please provide a post title.');
      return;
    }

    const compiledContent = compileBlocksToHTML();
    const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const postObject = {
      id: newSlug,
      title,
      slug: newSlug,
      subtitle: subtitle || 'Technical report assembled in Fluxfolio Block Editor.',
      author: 'Felix De',
      authorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime,
      category,
      tags: tagsInput.split(',').map(t => t.trim()),
      content: compiledContent,
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80', // Default editor stock image
      isPublished,
      isTrending: false,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || subtitle
    };

    addPost(postObject);
    alert('Case study published successfully to ledger database!');
    router.push(`/docs/${newSlug}`);
  };

  const insertDemoCodeHelper = () => {
    setTitle('Advanced Hydration Fixes in Next.js 15 Client Sub-trees');
    setSubtitle('Resolving standard hydrations discrepancies when mapping real-time canvas states.');
    setTagsInput('Next.js, Optimization, ClientSide');
    setBlocks([
      { id: 'demob1', type: 'heading', value: '1. Resolving Client Hydration mismatches' },
      { id: 'demob2', type: 'text', value: 'When mapping WebGL viewports, standard layouts mismatches can manifest if states read from localStorage before layout mounting. We must restrict client parsing to useEffect intervals.' },
      { id: 'demob3', type: 'code', value: 'const [mounted, setMounted] = useState(false);\nuseEffect(() => {\n  setMounted(true);\n}, []);', language: 'javascript' }
    ]);
  };

  if (!isAdmin) return null;

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">

      {/* Background glow shapes */}
      <div className="ambient-glow -top-20 right-10 ambient-purple" />
      <div className="ambient-glow bottom-[-50px] left-10 ambient-cyan" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">

        {/* Editor Main Header bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-900 light:border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white light:text-slate-900">Case Editor Suite</h1>
            <p className="text-xs text-zinc-500 light:text-slate-500 mt-1">Design and publish technical block articles.</p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-zinc-900 light:bg-slate-100 border border-zinc-800 light:border-slate-250 text-white light:text-slate-800 text-xs font-bold rounded-xl transition"
            >
              {previewMode ? 'Edit Blocks' : 'Live Preview'}
            </button>
            <button
              onClick={insertDemoCodeHelper}
              className="px-4 py-2 bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan text-xs font-bold rounded-xl hover:bg-brand-cyan/35 transition"
            >
              Seed Example Template
            </button>
            <button
              onClick={handlePublish}
              className="px-5 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-extrabold rounded-xl transition active:scale-[0.98] shadow-md"
            >
              Publish Article
            </button>
          </div>
        </div>

        {/* Content & Settings Split view */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main workspace (8/12 layout) */}
          <div className="lg:col-span-8 space-y-6">

            {previewMode ? (
              /* Live Preview Screen representation */
              <GlassCard hoverEffect={false} className="border-zinc-900 bg-zinc-950/80 p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="text-[10px] font-extrabold text-brand-purple uppercase tracking-widest">Live Compiled Sandbox</div>
                <h1 className="text-2xl md:text-3xl font-black text-white">{title || 'Untitled Case Study'}</h1>
                <p className="text-sm text-zinc-400 font-semibold">{subtitle || 'Provide a subtitle in the right rail metadata panel.'}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: compileBlocksToHTML() }}
                  className="rich-content text-sm text-zinc-300 space-y-5 pt-6 border-t border-zinc-900"
                />
              </GlassCard>
            ) : (
              /* Block-based WYSIWYG editor workspace (Matches requirements exactly) */
              <div className="space-y-4">

                {/* Title Input block */}
                <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5">
                  <input
                    type="text"
                    required
                    placeholder="Enter technical title here (e.g. Mastering Web Assembly compiler configurations)"
                    value={title}
                    onChange={e => { setTitle(e.target.value); setSeoTitle(e.target.value); }}
                    className="w-full text-base font-bold bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-zinc-700 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Short description subtitle..."
                    value={subtitle}
                    onChange={e => { setSubtitle(e.target.value); setSeoDescription(e.target.value); }}
                    className="w-full text-xs text-zinc-450 bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-zinc-800 mt-2"
                  />
                </GlassCard>

                {/* Blocks stream */}
                <div className="space-y-4">
                  {blocks.map((block, index) => (
                    <div
                      key={block.id}
                      className="group p-4 bg-zinc-900/30 border border-zinc-900/80 rounded-2xl relative transition hover:border-brand-purple/20"
                    >
                      {/* Floating block type label & Delete trigger */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-extrabold text-zinc-550 uppercase tracking-wider">
                          Block {index + 1}: {block.type}
                        </span>

                        <button
                          onClick={() => deleteBlock(block.id)}
                          className="opacity-0 group-hover:opacity-100 text-[10px] text-red-400 hover:underline transition"
                        >
                          Remove Block
                        </button>
                      </div>

                      {/* Render appropriate block text area */}
                      {block.type === 'heading' && (
                        <input
                          type="text"
                          value={block.value}
                          onChange={e => updateBlockValue(block.id, e.target.value)}
                          className="w-full text-sm font-extrabold bg-transparent border-none focus:ring-0 text-white focus:outline-none placeholder-zinc-750"
                        />
                      )}

                      {block.type === 'text' && (
                        <textarea
                          rows={2}
                          value={block.value}
                          onChange={e => updateBlockValue(block.id, e.target.value)}
                          className="w-full text-xs leading-relaxed bg-transparent border-none focus:ring-0 text-zinc-300 focus:outline-none placeholder-zinc-750"
                        />
                      )}

                      {block.type === 'code' && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] text-zinc-550 font-bold uppercase">Lang:</span>
                            <select
                              value={block.language || 'typescript'}
                              onChange={e => updateBlockLanguage(block.id, e.target.value)}
                              className="bg-zinc-950 border border-zinc-850 rounded p-1 text-[9px] text-brand-cyan focus:outline-none"
                            >
                              <option value="typescript">TypeScript</option>
                              <option value="javascript">JavaScript</option>
                              <option value="css">CSS</option>
                              <option value="html">HTML</option>
                            </select>
                          </div>
                          <textarea
                            rows={4}
                            value={block.value}
                            onChange={e => updateBlockValue(block.id, e.target.value)}
                            className="w-full text-[10px] font-mono bg-zinc-950 p-3 rounded-lg border border-zinc-900 focus:ring-0 text-brand-cyan focus:outline-none"
                          />
                        </div>
                      )}

                      {block.type === 'callout' && (
                        <input
                          type="text"
                          value={block.value}
                          onChange={e => updateBlockValue(block.id, e.target.value)}
                          className="w-full text-xs font-semibold text-brand-purple bg-brand-purple/5 p-3.5 rounded-xl border border-brand-purple/20 focus:outline-none"
                        />
                      )}

                    </div>
                  ))}
                </div>

                {/* Add Block Controls */}
                <div className="flex items-center justify-center gap-2.5 p-4 border-2 border-dashed border-zinc-900 rounded-3xl bg-zinc-950/20">
                  <button
                    onClick={() => addBlock('heading')}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-850 text-white text-[10px] font-extrabold rounded-xl transition"
                  >
                    + Heading Block
                  </button>
                  <button
                    onClick={() => addBlock('text')}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-850 text-white text-[10px] font-extrabold rounded-xl transition"
                  >
                    + Text Block
                  </button>
                  <button
                    onClick={() => addBlock('code')}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-850 text-white text-[10px] font-extrabold rounded-xl transition"
                  >
                    + Code Block
                  </button>
                  <button
                    onClick={() => addBlock('callout')}
                    className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-850 text-white text-[10px] font-extrabold rounded-xl transition"
                  >
                    + Callout Block
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Right Rail Metadata Panel (4/12 layout) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Classification Card */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-2">
                Classification & Publish
              </h3>

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1">Status Status</label>
                <select
                  value={isPublished ? 'published' : 'draft'}
                  onChange={e => setIsPublished(e.target.value === 'published')}
                  className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-xl border border-zinc-850 focus:outline-none"
                >
                  <option value="published">Published (Visible Immediately)</option>
                  <option value="draft">Draft (Restricted to Admins)</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1">Category Category</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCategory('blog')}
                    className={`w-1/2 py-2 text-xs font-bold rounded-xl transition border ${category === 'blog' ? 'bg-brand-purple text-white border-brand-purple' : 'bg-zinc-900 text-zinc-500 border-zinc-850'}`}
                  >
                    Blog Post
                  </button>
                  <button
                    onClick={() => setCategory('docs')}
                    className={`w-1/2 py-2 text-xs font-bold rounded-xl transition border ${category === 'docs' ? 'bg-brand-purple text-white border-brand-purple' : 'bg-zinc-900 text-zinc-500 border-zinc-850'}`}
                  >
                    Documentation
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-xl border border-zinc-850 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1">Read Time Estimate</label>
                <input
                  type="text"
                  value={readTime}
                  onChange={e => setReadTime(e.target.value)}
                  className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-xl border border-zinc-850 focus:outline-none"
                />
              </div>
            </GlassCard>

            {/* SEO Optimization Fields */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-2">
                SEO Search Metadata
              </h3>

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1">SEO Tag Title</label>
                <input
                  type="text"
                  placeholder="Focus keyword mapped titles..."
                  value={seoTitle}
                  onChange={e => setSeoTitle(e.target.value)}
                  className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-xl border border-zinc-850 focus:outline-none placeholder-zinc-700"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1">SEO Description</label>
                <textarea
                  rows={2.5}
                  placeholder="Rich, click-worthy metadata description snippet..."
                  value={seoDescription}
                  onChange={e => setSeoDescription(e.target.value)}
                  className="w-full bg-zinc-900 text-xs text-white p-2.5 rounded-xl border border-zinc-850 focus:outline-none placeholder-zinc-700"
                />
              </div>
            </GlassCard>

            {/* Post history tracker */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-3 border-b border-zinc-900 pb-2">
                Auto-Save History
              </h3>
              <div className="space-y-3 text-[10px] font-semibold text-zinc-500">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-zinc-900/60 pb-2 last:border-0 last:pb-0">
                    <span>Draft save node ({h.blockCount} blocks)</span>
                    <span className="text-zinc-650">{h.time}</span>
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
