'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface ImportWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportWizard({ isOpen, onClose }: ImportWizardProps) {
  const { seedDemoData } = useApp();
  const [isSeeding, setIsSeeding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [seedingDone, setSeedingDone] = useState(false);
  const [categories, setCategories] = useState({
    projects: true,
    posts: true,
    quizzes: true
  });

  if (!isOpen) return null;

  const handleStartImport = () => {
    setIsSeeding(true);
    setSeedingDone(false);
    setProgress(0);
    setCurrentStep('Initializing Environment...');

    seedDemoData(
      categories,
      (currentProgress, stepLabel, isFinished) => {
        setProgress(currentProgress);
        setCurrentStep(stepLabel);
        if (isFinished) {
          setSeedingDone(true);
        }
      },
      () => {
        // Seeding completed callback
      }
    );
  };

  const renderCheckIcon = () => (
    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );

  const renderLoadingSpinner = () => (
    <svg className="animate-spin w-4 h-4 text-brand-purple" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  const renderEmptyCircle = () => (
    <div className="w-4 h-4 rounded-full border-2 border-zinc-700 light:border-slate-350" />
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred overlay backdrop */}
      <div 
        onClick={!isSeeding ? onClose : undefined} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
      />

      {/* Glass Modal Card */}
      <div className="relative z-10 w-full max-w-[500px] bg-zinc-950/90 light:bg-white/95 rounded-3xl border border-zinc-800 light:border-slate-200 p-8 shadow-2xl overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3.5 bg-brand-purple/15 rounded-2xl border border-brand-purple/20 text-brand-purple">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white light:text-slate-900">Import Demo Data</h2>
            <p className="text-sm text-zinc-450 light:text-slate-500 mt-0.5">Seed your Fluxfolio with sample projects and posts.</p>
          </div>
        </div>

        {!isSeeding ? (
          /* Selection Interface */
          <div>
            <div className="space-y-4 my-6">
              <label className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 light:hover:bg-slate-100 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={categories.projects}
                  onChange={(e) => setCategories({ ...categories, projects: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-purple bg-zinc-900 border-zinc-700 accent-brand-purple focus:ring-brand-purple"
                />
                <div>
                  <div className="text-sm font-semibold text-white light:text-slate-900">Seed 6-8 Technical Projects</div>
                  <div className="text-xs text-zinc-500">Includes timeline metrics, rich write-ups, and screenshots</div>
                </div>
              </label>

              <label className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 light:hover:bg-slate-100 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={categories.posts}
                  onChange={(e) => setCategories({ ...categories, posts: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-purple bg-zinc-900 border-zinc-700 accent-brand-purple focus:ring-brand-purple"
                />
                <div>
                  <div className="text-sm font-semibold text-white light:text-slate-900">Seed 8-12 Blogs & Documentation</div>
                  <div className="text-xs text-zinc-500">Includes evergreen guides, callouts, and modular assets</div>
                </div>
              </label>

              <label className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/5 light:hover:bg-slate-100 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={categories.quizzes}
                  onChange={(e) => setCategories({ ...categories, quizzes: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-purple bg-zinc-900 border-zinc-700 accent-brand-purple focus:ring-brand-purple"
                />
                <div>
                  <div className="text-sm font-semibold text-white light:text-slate-900">Seed 10-15 Coding Quizzes</div>
                  <div className="text-xs text-zinc-500">Includes React Hooks, CSS architectures, and TypeScript types</div>
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:text-white light:hover:text-slate-900 hover:bg-zinc-900 light:hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStartImport}
                disabled={!categories.projects && !categories.posts && !categories.quizzes}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-purple text-white hover:bg-brand-purple-dark active:scale-[0.98] disabled:opacity-50 transition"
              >
                Start Seeding
              </button>
            </div>
          </div>
        ) : (
          /* Seeding Progress Simulation (Matches Visly mockups perfectly) */
          <div className="py-4">
            <div className="flex items-center justify-between text-sm font-medium mb-2.5">
              <span className="text-zinc-400 light:text-slate-500">Overall Progress</span>
              <span className="text-brand-purple font-bold">{progress}% Complete</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-zinc-900 light:bg-slate-100 rounded-full overflow-hidden mb-6 border border-zinc-850 light:border-slate-150">
              <div 
                className="h-full bg-brand-purple rounded-full transition-all duration-150 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>

            {/* Step list checkpoints */}
            <div className="space-y-3.5 bg-zinc-900/40 light:bg-slate-50/50 border border-zinc-900 light:border-slate-150 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${progress >= 25 ? 'text-zinc-300 light:text-slate-700 line-through opacity-60' : 'text-white light:text-slate-900'}`}>
                  Fetching Remote Assets
                </span>
                {progress >= 25 ? renderCheckIcon() : progress > 0 ? renderLoadingSpinner() : renderEmptyCircle()}
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm ${progress >= 55 ? 'text-zinc-300 light:text-slate-700 line-through opacity-60' : progress >= 25 ? 'text-white light:text-slate-900' : 'text-zinc-550'}`}>
                  Parsing Project JSON
                </span>
                {progress >= 55 ? renderCheckIcon() : progress >= 25 ? renderLoadingSpinner() : renderEmptyCircle()}
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm ${progress >= 85 ? 'text-zinc-300 light:text-slate-700 line-through opacity-60' : progress >= 55 ? 'text-white light:text-slate-900' : 'text-zinc-550'}`}>
                  Optimizing Media Content
                </span>
                {progress >= 85 ? renderCheckIcon() : progress >= 55 ? renderLoadingSpinner() : renderEmptyCircle()}
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-sm ${progress >= 100 ? 'text-zinc-300 light:text-slate-700 line-through opacity-60' : progress >= 85 ? 'text-white light:text-slate-900' : 'text-zinc-550'}`}>
                  Finalizing Database Migration
                </span>
                {progress >= 100 ? renderCheckIcon() : progress >= 85 ? renderLoadingSpinner() : renderEmptyCircle()}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              {!seedingDone ? (
                <button
                  disabled
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-zinc-900 text-zinc-500 opacity-60"
                >
                  Importing...
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    setIsSeeding(false);
                    setProgress(0);
                    setSeedingDone(false);
                  }}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-brand-purple text-white hover:bg-brand-purple-dark active:scale-[0.98] transition"
                >
                  Finish Import
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
