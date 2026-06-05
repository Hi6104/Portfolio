import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fluxfolio | Developer Portfolio',
  description: 'Explore technical case studies, structural microservice blogs, interactive coding quizzes, and design tokens built with Next.js 15 and Tailwind CSS v4.',
  keywords: ['developer portfolio', 'nextjs', 'react 19', 'tailwind v4', 'glassmorphism', 'coding quizzes'],
  authors: [{ name: 'Himanshu Vishwakarma' }]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use the actual Client ID from environment variables, or a fallback empty string
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-zinc-950 light:bg-slate-50 text-zinc-100 light:text-slate-900 transition-colors duration-300">
        <GoogleOAuthProvider clientId={clientId}>
          <AppProvider>
            <Header />
            <main className="flex-1 flex flex-col relative z-10 pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <ToastContainer position="top-right" theme="dark" />
          </AppProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
