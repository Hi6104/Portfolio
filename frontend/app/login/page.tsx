'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import { useRouter } from 'next/navigation';
import { loginUserApi, registerUser, oauthLoginApi, githubLoginApi } from '../../data/api';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AccessSignIn() {
  const { currentUser, loginUser, logoutUser } = useApp();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle GitHub OAuth callback
  useEffect(() => {
    const handleGitHubCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        setIsLoading(true);
        try {
          const user = await githubLoginApi(code);
          loginUser(user);
          toast.success('Logged in with GitHub!');
          router.push(user.role === 'admin' ? '/admin' : '/');
        } catch (err: any) {
          setErrorMsg(err.response?.data?.error || 'GitHub login failed.');
        } finally {
          setIsLoading(false);
          // Remove code from URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };
    handleGitHubCallback();
  }, [loginUser, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const user = await loginUserApi(email, password);
      loginUser(user);
      if (user.role === 'admin') {
        toast.success('Welcome back, Admin.');
        router.push('/admin');
      } else {
        toast.success('Signed in successfully.');
        router.push('/');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Invalid login credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      await registerUser(name, email, password);
      // Automatically log them in
      const user = await loginUserApi(email, password);
      loginUser(user);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Login Flow
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setErrorMsg('');
        
        // 1. Get user info from Google
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        // 2. Send to our backend
        const user = await oauthLoginApi(
          userInfo.data.name || 'Google User', 
          userInfo.data.email, 
          'google'
        );
        
        loginUser(user);
        toast.success('Logged in with Google!');
        router.push(user.role === 'admin' ? '/admin' : '/');
      } catch (err: any) {
        setErrorMsg(err.response?.data?.error || 'Failed to authenticate with Google.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: error => setErrorMsg('Google login popup failed or was closed.')
  });

  const handleGitHubLoginClick = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    if (!clientId) {
      toast.error('GitHub Client ID not configured.');
      return;
    }
    setIsLoading(true);
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`);
  };

  const handleSimulatedOAuthLogin = async (provider: 'linkedin') => {
    try {
      // Simulate OAuth flow by passing mock user data to the backend
      const mockName = `User ${Math.floor(Math.random() * 1000)}`;
      const mockEmail = `user${Math.floor(Math.random() * 1000)}@${provider}.com`;

      const user = await oauthLoginApi(mockName, mockEmail, provider);
      loginUser(user);
      toast.success(`Simulated secure ${provider.charAt(0).toUpperCase() + provider.slice(1)} OAuth authentication successful.`);
      router.push(user.role === 'admin' ? '/admin' : '/');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || `Failed to authenticate with ${provider}.`);
    }
  };

  return (
    <div className="w-full relative min-h-[80vh] flex items-center justify-center py-12 px-6 overflow-hidden">
      {/* Background glow visuals */}
      <div className="ambient-glow -top-24 left-[20%] ambient-purple animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] right-[10%] ambient-cyan" />

      <div className="w-full max-w-[420px] relative z-10">

        {currentUser ? (
          /* Already Signed In Display */
          <GlassCard hoverEffect={false} className="border-slate-200 dark:border-zinc-800 text-center py-8 space-y-6 bg-slate-50 dark:bg-zinc-950/80">
            <div className="w-12 h-12 rounded-full bg-brand-purple/15 text-brand-purple flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Session Active</h2>
              <p className="text-xs text-zinc-550">
                You are signed in as {currentUser.name} ({currentUser.role === 'admin' ? 'Administrator' : 'User'}).
              </p>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              {currentUser.role === 'admin' && (
                <button onClick={() => router.push('/admin')} className="w-full px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-zinc-900 dark:text-white font-bold rounded-xl text-xs">
                  Go to Admin Hub
                </button>
              )}
              <button onClick={() => { logoutUser(); toast.info('Logged out.'); }} className="w-full px-5 py-2.5 bg-white dark:bg-zinc-900 hover:bg-zinc-850 text-zinc-900 dark:text-white font-bold rounded-xl text-xs">
                Sign Out
              </button>
            </div>
          </GlassCard>
        ) : (
          /* Authentication Card Layout */
          <GlassCard hoverEffect={false} className="border-slate-300 dark:border-zinc-900/60 bg-slate-50 dark:bg-zinc-950/80 !p-8 shadow-2xl relative">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-indigo/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center space-y-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-purple flex items-center justify-center text-zinc-900 dark:text-white font-black text-lg mx-auto shadow-md">
                F
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Access Portal</h2>
              <p className="text-xs text-zinc-550 leading-relaxed">
                Sign in to track game scores, post comments, or access the admin panel.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex w-full mb-6 p-1 bg-white dark:bg-zinc-900/50 rounded-xl">
              <button
                onClick={() => { setActiveTab('login'); setErrorMsg(''); }}
                className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${activeTab === 'login' ? 'bg-zinc-800 text-zinc-900 dark:text-white shadow' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:text-zinc-300'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab('register'); setErrorMsg(''); }}
                className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${activeTab === 'register' ? 'bg-zinc-800 text-zinc-900 dark:text-white shadow' : 'text-slate-500 dark:text-zinc-500 hover:text-slate-700 dark:text-zinc-300'}`}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-[10px] font-bold rounded-xl mb-5 leading-normal">
                {errorMsg}
              </div>
            )}

            {/* Manual Form */}
            <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} className="space-y-4 text-xs font-semibold">
              {activeTab === 'register' && (
                <div>
                  <label className="text-[9px] font-bold text-zinc-550 block mb-1.5">Full Name</label>
                  <input type="text" required placeholder="John Doe" value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900/60 border border-zinc-850 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-purple" />
                </div>
              )}
              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1.5">Email Address</label>
                <input type="email" required placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900/60 border border-zinc-850 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-purple" />
              </div>
              <div>
                <label className="text-[9px] font-bold text-zinc-550 block mb-1.5">Password</label>
                <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900/60 border border-zinc-850 rounded-xl px-3.5 py-2.5 text-zinc-900 dark:text-white focus:outline-none focus:border-brand-purple" />
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isLoading}
                  className="w-full bg-brand-purple hover:bg-brand-purple-dark text-zinc-900 dark:text-white font-extrabold py-3 rounded-2xl transition active:scale-[0.98] shadow-[0_4px_15px_rgba(139,92,246,0.2)] text-xs disabled:opacity-50">
                  {isLoading ? 'Processing...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </form>

            {/* Separator */}
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-slate-300 dark:border-zinc-900"></div>
              <span className="flex-shrink mx-3 text-[9px] text-zinc-650 font-bold uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-slate-300 dark:border-zinc-900"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              {/* Google */}
              <button onClick={() => loginWithGoogle()} disabled={isLoading}
                className="w-full bg-white dark:bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-900 dark:text-white font-extrabold py-2.5 rounded-2xl transition active:scale-[0.97] text-xs flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-zinc-900 dark:text-white" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z" />
                </svg>
                Google
              </button>

              <div className="grid grid-cols-2 gap-3">
                {/* GitHub */}
                <button onClick={handleGitHubLoginClick} disabled={isLoading}
                  className="w-full bg-white dark:bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-900 dark:text-white font-extrabold py-2.5 rounded-2xl transition active:scale-[0.97] text-xs flex items-center justify-center gap-2 disabled:opacity-50">
                  <svg className="w-4 h-4 text-zinc-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </button>
                {/* LinkedIn */}
                <button onClick={() => handleSimulatedOAuthLogin('linkedin')} disabled={isLoading}
                  className="w-full bg-white dark:bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-900 dark:text-white font-extrabold py-2.5 rounded-2xl transition active:scale-[0.97] text-xs flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-zinc-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </button>
              </div>
            </div>

          </GlassCard>
        )}

      </div>
    </div>
  );
}
