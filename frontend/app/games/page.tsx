'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import { Quiz, QuizQuestion } from '../../data/mockData';
import { useRouter } from 'next/router';

export default function GamesCenter() {
  const { quizzes, quizProgress, submitQuizScore, isAdmin, addOrUpdateQuiz, deleteQuiz } = useApp();

  // Navigation / Gameplay states
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Admin states
  const [adminMode, setAdminMode] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizDesc, setNewQuizDesc] = useState('');
  const [newQuizDiff, setNewQuizDiff] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [newQuizQuestions, setNewQuizQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q1',
      text: 'What does CSS Flexbox align-content regulate?',
      options: ['Lines of child items along the cross axis', 'Individual children spacing', 'Direct absolute float margins', 'Browser default font sizing'],
      correctOptionIndex: 0,
      explanation: 'align-content aligns a flex container\'s lines within it when there is extra space in the cross-axis, whereas align-items aligns individual items.'
    }
  ]);

  const router = useRouter();

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

    const question = activeQuiz.questions[currentQuestionIdx];
    if (selectedOption === question.correctOptionIndex) {
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
      // Completed!
      submitQuizScore(activeQuiz.id, score);
      setQuizCompleted(true);
    }
  };

  const handleCreateQuiz = () => {
    if (!newQuizTitle.trim() || !newQuizDesc.trim()) {
      alert('Please fill out all quiz details.');
      return;
    }

    const quizObject: Quiz = {
      id: 'quiz_' + Date.now(),
      title: newQuizTitle,
      description: newQuizDesc,
      difficulty: newQuizDiff,
      timeLimit: '10 min',
      questionsCount: newQuizQuestions.length,
      tags: [newQuizDiff, 'Seeded'],
      questions: newQuizQuestions
    };

    addOrUpdateQuiz(quizObject);
    alert('Quiz added successfully!');
    setAdminMode(false);
    setNewQuizTitle('');
    setNewQuizDesc('');
  };

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">

      {/* Background glow visuals */}
      <div className="ambient-glow -top-24 right-5 ambient-purple animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] left-5 ambient-cyan" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-900 light:border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white light:text-slate-900 leading-tight">
              Level up your <span className="text-brand-purple">craft</span>
            </h1>
            <p className="text-xs text-zinc-500 light:text-slate-500 mt-1">
              Bite-sized technical challenges designed to validate your expertise.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setAdminMode(!adminMode)}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-white text-xs font-bold rounded-xl border border-zinc-800"
            >
              {adminMode ? 'Cancel Quiz Creator' : '+ Create Quiz'}
            </button>
          )}
        </div>

        {/* ACTIVE QUIZ SCREEN PLAYING */}
        {activeQuiz && (
          <div className="max-w-2xl mx-auto">
            {quizCompleted ? (
              /* RESULTS SUMMARY DISPLAY */
              <GlassCard hoverEffect={false} className="border-zinc-800 text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-brand-purple/15 text-brand-purple flex items-center justify-center mx-auto text-2xl font-black">
                  🎉
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">Quiz Completed!</h2>
                  <p className="text-xs text-zinc-550">Nice attempt at verifying system configurations.</p>
                </div>

                <div className="py-4 border-t border-b border-zinc-900 max-w-sm mx-auto">
                  <div className="text-[10px] text-zinc-550 font-bold uppercase tracking-wider">Your Final Score</div>
                  <div className="text-4xl font-black text-white mt-1">
                    {score} / {activeQuiz.questions.length}
                  </div>
                  <div className="text-[10px] text-brand-cyan font-bold mt-1">
                    {Math.round((score / activeQuiz.questions.length) * 100)}% Accuracy Rating
                  </div>
                </div>

                {/* Badge notification if scoring high */}
                {score >= activeQuiz.questions.length * 0.7 && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Earned Badge: {score === activeQuiz.questions.length ? `${activeQuiz.title} Expert` : `${activeQuiz.title} Intermediate`}
                  </div>
                )}

                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleStartQuiz(activeQuiz)}
                    className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white font-bold rounded-xl text-xs"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold rounded-xl text-xs"
                  >
                    Return to Lobby
                  </button>
                </div>
              </GlassCard>
            ) : (
              /* ACTIVE GAME QUESTION CARD */
              <div className="space-y-6">

                {/* Progress bar info */}
                <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold">
                  <span>Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}</span>
                  <span>Difficulty: <span className="text-brand-purple uppercase">{activeQuiz.difficulty}</span></span>
                </div>

                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-purple transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx) / activeQuiz.questions.length) * 100}%` }}
                  />
                </div>

                {/* Main Card */}
                <GlassCard hoverEffect={false} className="border-zinc-850 bg-zinc-950/60 p-6 space-y-6">

                  <h3 className="text-sm md:text-base font-extrabold text-white">
                    {activeQuiz.questions[currentQuestionIdx].text}
                  </h3>

                  {/* Optional code snippet */}
                  {activeQuiz.questions[currentQuestionIdx].codeSnippet && (
                    <div className="space-y-2">
                      <div className="text-[9px] font-mono text-zinc-550">Syntax Snippet Context</div>
                      <pre className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 text-[10px] font-mono text-brand-cyan overflow-x-auto">
                        <code>{activeQuiz.questions[currentQuestionIdx].codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Options select */}
                  <div className="space-y-3">
                    {activeQuiz.questions[currentQuestionIdx].options.map((opt, oIdx) => {
                      const isSelected = selectedOption === oIdx;
                      const isCorrect = oIdx === activeQuiz.questions[currentQuestionIdx].correctOptionIndex;

                      let buttonStyles = 'border-zinc-900 bg-zinc-900/30 text-zinc-400 hover:border-brand-purple/40 hover:bg-zinc-900/80';

                      if (isAnswered) {
                        if (isCorrect) {
                          buttonStyles = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold';
                        } else if (isSelected) {
                          buttonStyles = 'border-red-500/30 bg-red-500/10 text-red-400 font-bold';
                        } else {
                          buttonStyles = 'border-zinc-900 bg-zinc-900/10 text-zinc-600 opacity-60';
                        }
                      } else if (isSelected) {
                        buttonStyles = 'border-brand-purple bg-brand-purple/10 text-white font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(oIdx)}
                          disabled={isAnswered}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs transition flex items-center ${buttonStyles}`}
                        >
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold mr-3
                            ${isAnswered && isCorrect ? 'bg-emerald-500 text-white' : isAnswered && isSelected ? 'bg-red-500 text-white' : isSelected ? 'bg-brand-purple text-white' : 'bg-zinc-950 text-zinc-500'}
                          `}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Grading Feedback Explanation block */}
                  {isAnswered && (
                    <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-900 text-xs text-zinc-400 space-y-2 animate-fadeIn">
                      <div className="font-extrabold text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-4 bg-brand-cyan rounded" />
                        Explanation Narrative
                      </div>
                      <p className="leading-relaxed">
                        {activeQuiz.questions[currentQuestionIdx].explanation}
                      </p>
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="flex justify-end pt-4 border-t border-zinc-900/80">
                    {!isAnswered ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedOption === null}
                        className="px-6 py-2.5 bg-brand-purple hover:bg-brand-purple-dark disabled:opacity-50 text-white text-xs font-bold rounded-xl active:scale-[0.98] transition"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl active:scale-[0.98] transition"
                      >
                        {currentQuestionIdx === activeQuiz.questions.length - 1 ? 'Finish & Save Score' : 'Next Question →'}
                      </button>
                    )}
                  </div>

                </GlassCard>
              </div>
            )}
          </div>
        )}

        {/* ADMIN CREATE QUIZ SCREEN */}
        {adminMode && (
          <GlassCard hoverEffect={false} className="border-zinc-800 bg-zinc-950/60 max-w-2xl mx-auto !p-6 space-y-5">
            <h3 className="text-sm font-extrabold uppercase text-white tracking-widest border-b border-zinc-900 pb-3">
              Quiz Setup Config
            </h3>

            <div className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-zinc-550 block mb-1">Quiz Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js 15 Routing"
                    value={newQuizTitle}
                    onChange={e => setNewQuizTitle(e.target.value)}
                    className="w-full bg-zinc-900 p-2.5 rounded-xl border border-zinc-850 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-zinc-550 block mb-1">Difficulty</label>
                  <select
                    value={newQuizDiff}
                    onChange={e => setNewQuizDiff(e.target.value as any)}
                    className="w-full bg-zinc-900 p-2.5 rounded-xl border border-zinc-850 focus:outline-none text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1">Description summary</label>
                <input
                  type="text"
                  placeholder="Master Next.js file-based routing and middleware setups."
                  value={newQuizDesc}
                  onChange={e => setNewQuizDesc(e.target.value)}
                  className="w-full bg-zinc-900 p-2.5 rounded-xl border border-zinc-850 focus:outline-none"
                />
              </div>

              {/* Simple inline single question mapping */}
              <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-xl space-y-3">
                <h4 className="text-[10px] font-bold uppercase text-brand-cyan">Mock Question 1 config</h4>

                <input
                  type="text"
                  value={newQuizQuestions[0].text}
                  onChange={e => {
                    const updated = [...newQuizQuestions];
                    updated[0].text = e.target.value;
                    setNewQuizQuestions(updated);
                  }}
                  className="w-full bg-zinc-900 text-xs p-2 rounded border border-zinc-850"
                  placeholder="Question text"
                />

                <div className="grid grid-cols-2 gap-2">
                  {newQuizQuestions[0].options.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      value={opt}
                      onChange={e => {
                        const updated = [...newQuizQuestions];
                        updated[0].options[i] = e.target.value;
                        setNewQuizQuestions(updated);
                      }}
                      className="bg-zinc-900 text-[10px] p-2 rounded border border-zinc-850"
                      placeholder={`Choice ${String.fromCharCode(65 + i)}`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[8px] font-bold text-zinc-550 block mb-1">Correct Index (0-3)</label>
                    <input
                      type="number"
                      min={0}
                      max={3}
                      value={newQuizQuestions[0].correctOptionIndex}
                      onChange={e => {
                        const updated = [...newQuizQuestions];
                        updated[0].correctOptionIndex = parseInt(e.target.value) || 0;
                        setNewQuizQuestions(updated);
                      }}
                      className="w-full bg-zinc-900 p-2 rounded border border-zinc-850"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-bold text-zinc-550 block mb-1">Explanation</label>
                    <input
                      type="text"
                      value={newQuizQuestions[0].explanation}
                      onChange={e => {
                        const updated = [...newQuizQuestions];
                        updated[0].explanation = e.target.value;
                        setNewQuizQuestions(updated);
                      }}
                      className="w-full bg-zinc-900 p-2 rounded border border-zinc-850"
                      placeholder="Why is A correct?"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900">
                <button
                  onClick={() => setAdminMode(false)}
                  className="px-4 py-2 text-zinc-550 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateQuiz}
                  className="px-5 py-2 bg-brand-purple text-white font-extrabold rounded-xl"
                >
                  Publish Quiz
                </button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* DEFAULT QUIZZES SELECTION LOBBY GRID (Matches image3.png layout) */}
        {!activeQuiz && !adminMode && (
          <div className="space-y-12">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quizzes.map((quiz) => {
                const progress = quizProgress[quiz.id];
                const isCompleted = progress?.completed;

                return (
                  <GlassCard
                    key={quiz.id}
                    className="flex flex-col justify-between h-full border-zinc-900/60 transition group hover:border-brand-purple/20 relative"
                    onClick={() => handleStartQuiz(quiz)}
                  >
                    {isCompleted && (
                      <div className="absolute top-2.5 right-2.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wide">
                        Score: {progress.score}/{quiz.questionsCount}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* difficulty / questions counts */}
                      <div className="flex items-center justify-between text-[9px] font-extrabold text-zinc-500">
                        <span className={`px-2 py-0.5 rounded uppercase tracking-wider
                          ${quiz.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' : quiz.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}
                        `}>
                          {quiz.difficulty}
                        </span>
                        <span>{quiz.timeLimit}</span>
                      </div>

                      <h3 className="text-base font-extrabold text-white light:text-slate-900 group-hover:text-brand-purple transition leading-tight">
                        {quiz.title}
                      </h3>

                      <p className="text-xs text-zinc-450 light:text-slate-500 leading-normal line-clamp-3">
                        {quiz.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-900 light:border-slate-100 pt-4 mt-6 text-[10px] font-bold text-zinc-500">
                      <span>{quiz.questionsCount} questions</span>
                      <span className="text-brand-purple group-hover:underline">
                        Start Quiz →
                      </span>
                    </div>

                  </GlassCard>
                );
              })}
            </div>

            {/* Bottom Want to test CTA panel (matches Visly image3.png layout exactly) */}
            <GlassCard hoverEffect={false} className="bg-gradient-to-tr from-brand-indigo/10 to-brand-purple/5 border border-zinc-900/80 !p-8 relative overflow-hidden shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Want to test your specific tech stack?</h3>
                <p className="text-xs text-zinc-450 leading-relaxed max-w-lg font-medium">
                  We're constantly adding new structural developer challenges. Sign in to track your progress, earn permanent skills badges for your profile, and compete on the global developer leaderboard.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => router.push('/login')}
                  className="w-1/2 md:w-auto bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-extrabold px-6 py-3 rounded-2xl active:scale-[0.98] transition shadow-md whitespace-nowrap"
                >
                  Create Account
                </button>
                <button
                  onClick={() => alert('Loading categories...')}
                  className="w-1/2 md:w-auto bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white text-xs font-extrabold px-6 py-3 rounded-2xl active:scale-[0.98] transition whitespace-nowrap"
                >
                  Browse All Categories
                </button>
              </div>
            </GlassCard>

          </div>
        )}

      </div>
    </div>
  );
}
