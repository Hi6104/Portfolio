'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import { toast } from 'react-toastify';
import { Quiz, QuizQuestion } from '../../data/mockData';

// ── Category metadata ──────────────────────────────────────────────────────
const CATEGORY_META: Record<string, { color: string; bg: string; border: string; icon: string; category: string }> = {
  'react-hooks':         { color: 'text-sky-400',     bg: 'bg-sky-400/10',     border: 'border-sky-400/25',     icon: '⚛️',  category: 'Frontend' },
  'javascript-advanced': { color: 'text-yellow-400',  bg: 'bg-yellow-400/10',  border: 'border-yellow-400/25',  icon: '🔥',  category: 'Language' },
  'nextjs-fundamentals': { color: 'text-zinc-900 dark:text-white',        bg: 'bg-white/5',        border: 'border-white/15',       icon: '▲',   category: 'Framework' },
  'css-layout':          { color: 'text-pink-400',     bg: 'bg-pink-400/10',    border: 'border-pink-400/25',    icon: '🎨',  category: 'Styling' },
  'nodejs-backend':      { color: 'text-emerald-400',  bg: 'bg-emerald-400/10', border: 'border-emerald-400/25', icon: '🌿',  category: 'Backend' },
  'typescript-mastery':  { color: 'text-blue-400',     bg: 'bg-blue-400/10',    border: 'border-blue-400/25',    icon: '🔷',  category: 'Language' },
};

const DIFF_STYLES: Record<string, string> = {
  Beginner:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Advanced:     'bg-red-500/10 text-red-400 border-red-500/20',
};

const ALL_CATEGORIES = ['All', 'Frontend', 'Backend', 'Language', 'Framework', 'Styling'];
const ALL_DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function GamesCenter() {
  const { quizzes, quizProgress, submitQuizScore, isAdmin, addOrUpdateQuiz } = useApp();

  // ── Quiz gameplay state ──
  const [activeQuiz, setActiveQuiz]         = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [score, setScore]                   = useState(0);
  const [quizCompleted, setQuizCompleted]   = useState(false);

  // ── Lobby filter state ──
  const [activeCategory, setActiveCategory]     = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [searchQuery, setSearchQuery]           = useState('');

  // ── Admin state ──
  const [adminMode, setAdminMode]       = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizDesc, setNewQuizDesc]   = useState('');
  const [newQuizDiff, setNewQuizDiff]   = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newQuizQuestions, setNewQuizQuestions] = useState<QuizQuestion[]>([{
    id: 'q1',
    text: '',
    options: ['', '', '', ''],
    correctOptionIndex: 0,
    explanation: ''
  }]);

  // ── Filtered quizzes ──
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(q => {
      const meta = CATEGORY_META[q.id];
      const matchCat  = activeCategory === 'All' || meta?.category === activeCategory;
      const matchDiff = activeDifficulty === 'All' || q.difficulty === activeDifficulty;
      const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchDiff && matchSearch;
    });
  }, [quizzes, activeCategory, activeDifficulty, searchQuery]);

  // ── Handlers ──
  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered || !activeQuiz) return;
    setIsAnswered(true);
    if (selectedOption === activeQuiz.questions[currentQuestionIdx].correctOptionIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      submitQuizScore(activeQuiz.id, score);
      setQuizCompleted(true);
    }
  };

  const handleCreateQuiz = () => {
    if (!newQuizTitle.trim() || !newQuizDesc.trim()) {
      toast.error('Please fill out all quiz details.');
      return;
    }
    const quizObject: Quiz = {
      id: 'quiz_' + Date.now(),
      title: newQuizTitle,
      description: newQuizDesc,
      difficulty: newQuizDiff,
      timeLimit: '10 min',
      questionsCount: newQuizQuestions.length,
      tags: [newQuizDiff],
      questions: newQuizQuestions
    };
    addOrUpdateQuiz(quizObject);
    alert('Quiz added successfully!');
    setAdminMode(false);
    setNewQuizTitle('');
    setNewQuizDesc('');
  };

  const totalCompleted = Object.values(quizProgress).filter(p => p.completed).length;
  const totalQuestions = quizzes.reduce((acc, q) => acc + q.questionsCount, 0);

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">
      <div className="ambient-glow -top-24 right-5 ambient-purple animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] left-5 ambient-cyan" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10">

        {/* ── Page Header ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-300 dark:border-zinc-900 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
              Level up your <span className="text-brand-purple">craft</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">
              {quizzes.length} curated challenges across {ALL_CATEGORIES.length - 1} categories · {totalCompleted} completed
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setAdminMode(!adminMode)}
              className="px-4 py-2 bg-white dark:bg-zinc-900 hover:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold rounded-xl border border-slate-200 dark:border-zinc-800 transition"
            >
              {adminMode ? 'Cancel' : '+ Create Quiz'}
            </button>
          )}
        </div>

        {/* ── ACTIVE QUIZ ── */}
        {activeQuiz && (
          <div className="max-w-2xl mx-auto">
            {quizCompleted ? (
              /* ── RESULTS ── */
              <GlassCard hoverEffect={false} className="border-slate-200 dark:border-zinc-800 text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-brand-purple/15 flex items-center justify-center mx-auto text-2xl">🎉</div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Quiz Completed!</h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-500">{activeQuiz.title}</p>
                </div>
                <div className="py-4 border-t border-b border-slate-300 dark:border-zinc-900 max-w-sm mx-auto">
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-wider">Your Score</div>
                  <div className="text-5xl font-black text-zinc-900 dark:text-white mt-2">{score}<span className="text-2xl text-zinc-600">/{activeQuiz.questions.length}</span></div>
                  <div className="text-[11px] text-brand-cyan font-bold mt-2">
                    {Math.round((score / activeQuiz.questions.length) * 100)}% Accuracy
                  </div>
                  {/* Progress arc */}
                  <div className="mt-3 w-full h-2 bg-white dark:bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full transition-all duration-700"
                      style={{ width: Math.round((score / activeQuiz.questions.length) * 100) + '%' }} />
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button onClick={() => handleStartQuiz(activeQuiz)} className="px-5 py-2.5 bg-white dark:bg-zinc-900 hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold rounded-xl text-xs border border-slate-200 dark:border-zinc-800 transition">
                    Retake
                  </button>
                  <button onClick={() => setActiveQuiz(null)} className="px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-zinc-900 dark:text-white font-bold rounded-xl text-xs transition">
                    Back to Lobby
                  </button>
                </div>
              </GlassCard>
            ) : (
              /* ── QUESTION ── */
              <div className="space-y-5">
                {/* Back + progress */}
                <div className="flex items-center justify-between">
                  <button onClick={() => setActiveQuiz(null)} className="text-xs text-slate-500 dark:text-zinc-500 hover:text-zinc-900 dark:text-white transition flex items-center gap-1">
                    ← Back
                  </button>
                  <span className="text-xs text-slate-500 dark:text-zinc-500 font-semibold">
                    Q{currentQuestionIdx + 1} / {activeQuiz.questions.length}
                    &nbsp;·&nbsp;<span className="text-brand-purple">{activeQuiz.difficulty}</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white dark:bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan transition-all duration-500"
                    style={{ width: (currentQuestionIdx / activeQuiz.questions.length * 100) + '%' }} />
                </div>

                <GlassCard hoverEffect={false} className="border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 !p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-brand-purple/20 text-brand-purple text-xs font-black flex items-center justify-center">
                      {currentQuestionIdx + 1}
                    </span>
                    <h3 className="text-sm md:text-base font-extrabold text-zinc-900 dark:text-white leading-snug">
                      {activeQuiz.questions[currentQuestionIdx].text}
                    </h3>
                  </div>

                  {activeQuiz.questions[currentQuestionIdx].codeSnippet && (
                    <pre className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-300 dark:border-zinc-900 text-[10px] font-mono text-brand-cyan overflow-x-auto">
                      <code>{activeQuiz.questions[currentQuestionIdx].codeSnippet}</code>
                    </pre>
                  )}

                  <div className="space-y-2.5">
                    {activeQuiz.questions[currentQuestionIdx].options.map((opt, oIdx) => {
                      const isSelected = selectedOption === oIdx;
                      const isCorrect  = oIdx === activeQuiz.questions[currentQuestionIdx].correctOptionIndex;
                      let styles = 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 text-slate-600 dark:text-zinc-400 hover:border-brand-purple/40 hover:bg-white dark:bg-zinc-900/60';
                      if (isAnswered) {
                        if (isCorrect)       styles = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold';
                        else if (isSelected) styles = 'border-red-500/40 bg-red-500/10 text-red-400 font-bold';
                        else                 styles = 'border-slate-300 dark:border-zinc-900 opacity-40';
                      } else if (isSelected) {
                        styles = 'border-brand-purple bg-brand-purple/10 text-zinc-900 dark:text-white font-bold';
                      }
                      return (
                        <button key={oIdx} onClick={() => handleSelectOption(oIdx)} disabled={isAnswered}
                          className={'w-full text-left p-3.5 rounded-2xl border text-xs transition flex items-center gap-3 ' + styles}>
                          <span className={'inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-black shrink-0 ' +
                            (isAnswered && isCorrect ? 'bg-emerald-500 text-zinc-900 dark:text-white' :
                             isAnswered && isSelected ? 'bg-red-500 text-zinc-900 dark:text-white' :
                             isSelected ? 'bg-brand-purple text-zinc-900 dark:text-white' : 'bg-white dark:bg-zinc-900 text-slate-500 dark:text-zinc-500')}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400 space-y-1.5">
                      <div className="font-extrabold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-4 bg-brand-cyan rounded" />
                        Explanation
                      </div>
                      <p className="leading-relaxed">{activeQuiz.questions[currentQuestionIdx].explanation}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-slate-300 dark:border-zinc-900">
                    <span className="text-xs text-zinc-600 font-semibold">Score: {score}/{currentQuestionIdx + (isAnswered ? 1 : 0)}</span>
                    {!isAnswered ? (
                      <button onClick={handleSubmitAnswer} disabled={selectedOption === null}
                        className="px-6 py-2.5 bg-brand-purple hover:bg-brand-purple-dark disabled:opacity-40 text-zinc-900 dark:text-white text-xs font-bold rounded-xl transition">
                        Submit Answer
                      </button>
                    ) : (
                      <button onClick={handleNextQuestion}
                        className="px-6 py-2.5 bg-brand-indigo hover:opacity-90 text-zinc-900 dark:text-white text-xs font-bold rounded-xl transition">
                        {currentQuestionIdx === activeQuiz.questions.length - 1 ? 'Finish Quiz 🏁' : 'Next →'}
                      </button>
                    )}
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {/* ── ADMIN CREATE QUIZ ── */}
        {adminMode && !activeQuiz && (
          <GlassCard hoverEffect={false} className="border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 max-w-2xl mx-auto !p-6 space-y-5">
            <h3 className="text-sm font-extrabold uppercase text-zinc-900 dark:text-white tracking-widest border-b border-slate-300 dark:border-zinc-900 pb-3">Create Quiz</h3>
            <div className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-slate-500 dark:text-zinc-500 block mb-1">Title</label>
                  <input type="text" value={newQuizTitle} onChange={e => setNewQuizTitle(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 focus:outline-none text-zinc-900 dark:text-white" />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 dark:text-zinc-500 block mb-1">Difficulty</label>
                  <select value={newQuizDiff} onChange={e => setNewQuizDiff(e.target.value as 'Beginner'|'Intermediate'|'Advanced')}
                    className="w-full bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 focus:outline-none text-zinc-900 dark:text-white">
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-bold text-slate-500 dark:text-zinc-500 block mb-1">Description</label>
                <input type="text" value={newQuizDesc} onChange={e => setNewQuizDesc(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 focus:outline-none text-zinc-900 dark:text-white" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-300 dark:border-zinc-900">
                <button onClick={() => setAdminMode(false)} className="px-4 py-2 text-slate-500 dark:text-zinc-500 hover:text-zinc-900 dark:text-white text-xs">Cancel</button>
                <button onClick={handleCreateQuiz} className="px-5 py-2 bg-brand-purple text-zinc-900 dark:text-white font-extrabold rounded-xl text-xs">Publish</button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* ── LOBBY ── */}
        {!activeQuiz && !adminMode && (
          <div className="space-y-8">

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Quizzes', value: quizzes.length, color: 'text-brand-purple' },
                { label: 'Completed', value: totalCompleted, color: 'text-emerald-400' },
                { label: 'Total Questions', value: totalQuestions, color: 'text-brand-cyan' },
                { label: 'Categories', value: ALL_CATEGORIES.length - 1, color: 'text-yellow-400' },
              ].map((s, i) => (
                <GlassCard key={i} hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/60 !p-4 text-center">
                  <div className={'text-2xl font-black ' + s.color}>{s.value}</div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500 font-bold uppercase tracking-wider mt-1">{s.label}</div>
                </GlassCard>
              ))}
            </div>

            {/* Filter bar */}
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-600 focus:outline-none focus:border-brand-purple/50 transition"
                />
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={'px-3.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition ' +
                      (activeCategory === cat
                        ? 'bg-brand-purple text-zinc-900 dark:text-white border-brand-purple'
                        : 'bg-white dark:bg-zinc-900/60 text-slate-500 dark:text-zinc-500 border-slate-200 dark:border-zinc-800 hover:border-zinc-600 hover:text-slate-700 dark:text-zinc-300')}>
                    {cat}
                  </button>
                ))}
                <div className="w-px bg-zinc-800 mx-1" />
                {ALL_DIFFICULTIES.map(diff => (
                  <button key={diff} onClick={() => setActiveDifficulty(diff)}
                    className={'px-3.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition ' +
                      (activeDifficulty === diff
                        ? (diff === 'Beginner' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                           diff === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                           diff === 'Advanced' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                           'bg-brand-purple text-zinc-900 dark:text-white border-brand-purple')
                        : 'bg-white dark:bg-zinc-900/60 text-slate-500 dark:text-zinc-500 border-slate-200 dark:border-zinc-800 hover:border-zinc-600 hover:text-slate-700 dark:text-zinc-300')}>
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-xs text-zinc-600 font-semibold">
              Showing {filteredQuizzes.length} of {quizzes.length} quizzes
            </div>

            {/* Quiz grid */}
            {filteredQuizzes.length === 0 ? (
              <div className="text-center py-16 text-zinc-600 text-sm">
                No quizzes match your filters. Try adjusting the category or difficulty.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredQuizzes.map(quiz => {
                  const progress = quizProgress[quiz.id];
                  const isCompleted = progress?.completed;
                  const meta = CATEGORY_META[quiz.id] || { color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/25', icon: '📝', category: 'General' };
                  const accuracy = isCompleted ? Math.round((progress.score / quiz.questionsCount) * 100) : null;

                  return (
                    <GlassCard key={quiz.id}
                      className={'flex flex-col justify-between h-full border transition-all duration-300 group cursor-pointer relative hover:scale-[1.01] ' + meta.border}
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      <div className="space-y-3">
                        {/* Icon + category */}
                        <div className="flex items-center justify-between">
                          <div className={'w-10 h-10 rounded-xl flex items-center justify-center text-lg ' + meta.bg}>
                            {meta.icon}
                          </div>
                          <div className="flex items-center gap-2">
                            {isCompleted && (
                              <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase">
                                ✓ {accuracy}%
                              </span>
                            )}
                            <span className={'text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ' + DIFF_STYLES[quiz.difficulty]}>
                              {quiz.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Category label */}
                        <div className={'text-[9px] font-extrabold uppercase tracking-widest ' + meta.color}>
                          {meta.category}
                        </div>

                        <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white group-hover:text-brand-purple transition leading-tight">
                          {quiz.title}
                        </h3>

                        <p className="text-[11px] text-slate-500 dark:text-zinc-500 leading-normal line-clamp-2">
                          {quiz.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-slate-300 dark:border-zinc-900/80 pt-3 mt-4 text-[10px] font-bold text-zinc-600">
                        <div className="flex items-center gap-3">
                          <span>{quiz.questionsCount} Qs</span>
                          <span>·</span>
                          <span>{quiz.timeLimit}</span>
                        </div>
                        <span className={'font-extrabold transition group-hover:translate-x-0.5 ' + meta.color}>
                          {isCompleted ? 'Retake →' : 'Start →'}
                        </span>
                      </div>

                      {/* Progress bar for completed */}
                      {isCompleted && accuracy !== null && (
                        <div className="mt-2 w-full h-1 bg-white dark:bg-zinc-900 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: accuracy + '%' }} />
                        </div>
                      )}
                    </GlassCard>
                  );
                })}
              </div>
            )}

            {/* Sidebar CTA */}
            <div className="space-y-5">
              <GlassCard hoverEffect={false} className="border-brand-purple/20 bg-brand-purple/5 p-6">
                <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Build your knowledge</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Test your skills and track your progress across multiple web development topics.
                </p>
              </GlassCard>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
