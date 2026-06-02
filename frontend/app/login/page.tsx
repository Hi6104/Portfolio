'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import { useRouter } from 'next/navigation';

export default function AccessSignIn() {
  const { loginAdmin, isAdmin, logoutAdmin } = useApp();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Pre-seeded credentials check (admin@fluxfolio.dev / admin123)
    if (email === 'admin@fluxfolio.dev' && password === 'admin123') {
      loginAdmin();
      alert('Simulated administrator session validated successfully.');
      router.push('/admin');
    } else {
      setErrorMsg('Invalid login credentials. Please use default credentials: admin@fluxfolio.dev / admin123');
    }
  };

  const handleOAuthLogin = () => {
    // Simulated GitHub OAuth validation
    loginAdmin();
    alert('Simulating secure GitHub OAuth callback authentication... Session approved.');
    router.push('/admin');
  };

  return (
    <div className="w-full relative min-h-[80vh] flex items-center justify-center py-12 px-6 overflow-hidden">

      {/* Background glow visuals */}
      <div className="ambient-glow -top-24 left-[20%] ambient-purple animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] right-[10%] ambient-cyan" />

      <div className="w-full max-w-[420px] relative z-10">

        {isAdmin ? (
          /* Already Signed In Display */
          <GlassCard hoverEffect={false} className="border-zinc-800 text-center py-8 space-y-6 bg-zinc-950/80">
            <div className="w-12 h-12 rounded-full bg-brand-purple/15 text-brand-purple flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">Session Active</h2>
              <p className="text-xs text-zinc-550">You are signed in as Felix De (Administrator).</p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => router.push('/admin')}
                className="px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold rounded-xl text-xs"
              >
                Go to Admin Hub
              </button>
              <button
                onClick={() => { logoutAdmin(); alert('Logged out.'); }}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white font-bold rounded-xl text-xs"
              >
                Sign Out
              </button>
            </div>
          </GlassCard>
        ) : (
          /* Sign In Card Layout */
          <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/80 !p-8 shadow-2xl relative">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-indigo/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-purple flex items-center justify-center text-white font-black text-lg mx-auto shadow-md">
                F
              </div>
              <h2 className="text-xl font-bold text-white">Administrator Access</h2>
              <p className="text-xs text-zinc-550 leading-relaxed">
                Unlock WYSIWYG editors, seeder wizards, and comment moderation boards.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-[10px] font-bold rounded-xl mb-5 leading-normal">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleManualLogin} className="space-y-4 text-xs font-semibold">

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="admin@fluxfolio.dev"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  placeholder="admin123"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-850 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-extrabold py-3 rounded-2xl transition active:scale-[0.98] shadow-[0_4px_15px_rgba(139,92,246,0.2)] text-xs"
                >
                  Verify Credentials
                </button>
              </div>

            </form>

            {/* Separator */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-zinc-900"></div>
              <span className="flex-shrink mx-3 text-[9px] text-zinc-650 font-bold uppercase tracking-wider">Or OAuth Connection</span>
              <div className="flex-grow border-t border-zinc-900"></div>
            </div>

            {/* Simulated GitHub OAuth */}
            <button
              onClick={handleOAuthLogin}
              className="w-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-white font-extrabold py-2.5 rounded-2xl transition active:scale-[0.97] text-xs flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
              Sign In with GitHub
            </button>

            {/* Pre-seeded credentials tooltip */}
            <div className="mt-6 p-3 bg-brand-purple/5 border border-brand-purple/10 rounded-xl text-[9px] text-zinc-550 leading-relaxed">
              💡 <strong>Pre-seeded Credentials:</strong> Email: <code className="text-brand-cyan">admin@fluxfolio.dev</code> / Password: <code className="text-brand-cyan">admin123</code>. You can copy-paste them to login instantly.
            </div>

          </GlassCard>
        )}

      </div>
    </div>
  );
}
