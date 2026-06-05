'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import GlassCard from '../../components/GlassCard';
import SkillRadar from '../../components/SkillRadar';

const CONTACT = {
  name: 'Himanshu Vishwakarma',
  title: 'Full-Stack Web Developer',
  email: 'hvishwakarma821@gmail.com',
  phone: '+91 7080987084',
  address: 'Sidhauli, Sitapur, Uttar Pradesh, India',
  github: 'https://github.com/Hi6104',
  linkedin: 'https://www.linkedin.com/in/himanshu-vishwakarma-2202b8201/',
};

const timelineEntries = [
  {
    role: 'Software Engineer (Full-Stack)',
    company: 'Velocity Software Solutions Pvt. Ltd.',
    location: 'Noida, India',
    duration: 'Feb 2024 – Mar 2026',
    color: 'brand-purple',
    bullets: [
      'Full Stack Developer with 2+ years of experience in eCommerce development using Remix, React.js, Next.js, PHP, JavaScript, HTML, CSS, and SQL.',
      'Developed Shopify Remix applications and custom modules for OpenCart and PrestaShop, including third-party integrations and API enhancements for improved scalability.',
      'Worked on database management and responsive UI development while collaborating with clients for requirements, customization, and technical support.',
    ],
  },
];

const education = [
  {
    degree: 'B.Tech – Computer Science & Engineering',
    institution: 'KIET Group of Institutions',
    location: 'Ghaziabad, India',
    duration: 'Dec 2020 – Jun 2024',
    grade: 'CGPA: 8.14',
  },
];

const skillGroups = [
  {
    category: 'Languages',
    icon: '{ }',
    color: 'text-brand-cyan',
    skills: ['JavaScript', 'Python', 'Java', 'PHP'],
  },
  {
    category: 'Frameworks & Libraries',
    icon: '⚡',
    color: 'text-brand-purple',
    skills: ['React.js', 'Next.js', 'Node.js', 'Remix', 'Flask', 'Pandas'],
  },
  {
    category: 'Tools & Platforms',
    icon: '🛠',
    color: 'text-emerald-400',
    skills: ['Git', 'Docker', 'Kubernetes', 'Linux', 'PrestaShop', 'OpenCart', 'Firebase'],
  },
  {
    category: 'Databases',
    icon: '🗄',
    color: 'text-amber-400',
    skills: ['MongoDB', 'SQL', 'SQL Server', 'Qdrant (Vector DB)'],
  },
];

const projects = [
  {
    name: 'Okuru – Digital Gift Card Platform',
    stack: ['Next.js', 'TypeScript', 'Firebase'],
    color: 'border-brand-cyan/30 bg-brand-cyan/5',
    tagColor: 'bg-brand-cyan/10 text-brand-cyan',
    bullets: [
      'Developed frontend for Admin and Partner portals of a digital gift card platform.',
      'Built RBAC system: Super Admins can create groups with view/create/update/delete permissions.',
      'Implemented country/currency config, affiliate & referral settings, and discount code system.',
    ],
  },
  {
    name: 'Knowband – eCommerce Modules & AI Tools',
    stack: ['PHP (MVC)', 'HTML', 'JavaScript', 'CSS', 'Qdrant'],
    color: 'border-brand-purple/30 bg-brand-purple/5',
    tagColor: 'bg-brand-purple/10 text-brand-purple',
    bullets: [
      'Developed e-commerce modules for OpenCart & PrestaShop, including eBay, Etsy, Google Shopping integrations.',
      'Built modules: Store Locator, Affiliate & Referral, Shipping Timer, Supercheckout, Related Products.',
      'Implemented AI tools: Content Generator, LLM TXT Generator, and a Qdrant-powered vector chatbot.',
    ],
  },
  {
    name: 'Fit-Init – Smart AI Self-Defence & Yoga Trainer',
    stack: ['Python', 'Flask', 'MediaPipe', 'TensorFlow Hub'],
    color: 'border-emerald-500/30 bg-emerald-500/5',
    tagColor: 'bg-emerald-500/10 text-emerald-400',
    bullets: [
      'Full-stack AI wellness platform with real-time pose correction for self-defence and yoga.',
      'Implemented live joint-angle analysis via Computer Vision, achieving 90–95% accuracy.',
      'Built a real-time REST API for live accuracy tracking and performance telemetry.',
    ],
  },
];

const coreSkills = [
  { name: 'React / Next.js', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'PHP (MVC / eCommerce)', level: 88 },
  { name: 'Node.js / Express', level: 82 },
  { name: 'Python / Flask', level: 78 },
  { name: 'SQL / Databases', level: 80 },
];

export default function ResumeScreen() {
  const { quizProgress } = useApp();
  const [activeSection, setActiveSection] = useState<string>('experience');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const earnedBadges = Object.values(quizProgress)
    .flatMap(p => p.badgesEarned)
    .filter(Boolean);

  const sections = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className="w-full relative min-h-screen py-10 px-6 overflow-hidden">
      <div className="ambient-glow -top-20 left-10 ambient-indigo animate-pulse-slow" />
      <div className="ambient-glow bottom-[-50px] right-5 ambient-purple" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10">

        {/* ── Hero Header ── */}
        <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-7">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="space-y-3">

              {/* Name + title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {CONTACT.name}
                </h1>
                <p className="text-brand-purple font-bold text-sm mt-1 uppercase tracking-widest">
                  {CONTACT.title}
                </p>
              </div>

              {/* Contact chips */}
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-zinc-400">
                <a href={'mailto:' + CONTACT.email} className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full hover:border-brand-cyan/50 hover:text-brand-cyan transition">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {CONTACT.email}
                </a>
                <a href={'tel:' + CONTACT.phone} className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full hover:border-brand-cyan/50 hover:text-brand-cyan transition">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {CONTACT.phone}
                </a>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full hover:border-brand-purple/50 hover:text-brand-purple transition">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                  GitHub
                </a>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full hover:border-blue-400/50 hover:text-blue-400 transition">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  LinkedIn
                </a>
                <span className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {CONTACT.address}
                </span>
              </div>
            </div>

            {/* Download button */}
            <a
              href="/assests/Himanshu.pdf"
              download="Himanshu_Vishwakarma_Resume.pdf"
              className="shrink-0 bg-brand-purple hover:bg-brand-purple-dark text-white text-xs font-bold px-5 py-3 rounded-2xl transition active:scale-[0.98] shadow-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        </GlassCard>

        {/* ── Tab Navigation ── */}
        <div className="flex gap-2 flex-wrap">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={
                'px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition border ' +
                (activeSection === s.id
                  ? 'bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/20'
                  : 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:border-brand-purple/40 hover:text-white')
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* ── EXPERIENCE ── */}
        {activeSection === 'experience' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
                Professional Experience
              </h2>

              <div className="relative border-l-2 border-zinc-900 pl-6 ml-3.5 space-y-10">
                {timelineEntries.map((entry, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[32px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-brand-purple group-hover:bg-brand-purple transition duration-300" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold flex-wrap gap-1">
                        <span className="text-brand-purple">{entry.duration}</span>
                        <span className="text-zinc-550">{entry.company} · {entry.location}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-white">{entry.role}</h3>
                      <ul className="space-y-2 text-xs leading-relaxed text-zinc-450 font-medium list-disc list-inside">
                        {entry.bullets.map((bullet, i) => (
                          <li key={i} className="marker:text-brand-purple">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {/* Education inside timeline */}
                {education.map((edu, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[32px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-brand-cyan group-hover:bg-brand-cyan transition duration-300" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold flex-wrap gap-1">
                        <span className="text-brand-cyan">{edu.duration}</span>
                        <span className="text-zinc-550">{edu.location}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-white">{edu.degree}</h3>
                      <p className="text-xs text-zinc-450 font-medium">{edu.institution}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: skill bars + badges */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
                  Capability Vector
                </h2>
                <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-4">
                  <SkillRadar />
                </GlassCard>
              </div>

              <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5 space-y-4">
                <h3 className="text-xs font-extrabold uppercase text-zinc-400 border-b border-zinc-900 pb-2">Core Proficiency</h3>
                <div className="space-y-3 text-[11px] font-semibold text-zinc-450">
                  {coreSkills.map((skill, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span>{skill.name}</span>
                        <span className="text-brand-cyan">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full transition-all duration-700"
                          style={{ width: skill.level + '%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Badges */}
              <GlassCard hoverEffect={false} className="border-brand-purple/20 bg-zinc-950/60 !p-5 space-y-4">
                <h3 className="text-xs font-extrabold uppercase text-zinc-400 border-b border-zinc-900 pb-2 flex items-center justify-between">
                  <span>Quiz Certifications</span>
                  <span className="text-[10px] text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20">{earnedBadges.length} Earned</span>
                </h3>
                {earnedBadges.length === 0 ? (
                  <p className="text-xs text-zinc-550 italic text-center py-2">
                    Complete quizzes in the <a href="/games" className="text-brand-purple hover:underline font-bold">Games Center</a> to unlock badges!
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    {earnedBadges.map((badge, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-bold flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span className="line-clamp-1">{badge}</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        )}

        {/* ── PROJECTS ── */}
        {activeSection === 'projects' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
              Featured Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project, idx) => (
                <GlassCard key={idx} hoverEffect className={'border ' + project.color + ' !p-0 overflow-hidden'}>
                  <button
                    className="w-full text-left p-5"
                    onClick={() => setExpandedProject(expandedProject === idx ? null : idx)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-base font-extrabold text-white">{project.name}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech, ti) => (
                            <span key={ti} className={'text-[10px] font-bold px-2 py-0.5 rounded-full border ' + project.tagColor + ' border-current/20'}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <svg
                        className={'w-4 h-4 shrink-0 mt-1 text-zinc-500 transition-transform duration-300 ' + (expandedProject === idx ? 'rotate-180' : '')}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {expandedProject === idx && (
                    <div className="px-5 pb-5 border-t border-zinc-800/50">
                      <ul className="space-y-2 text-xs leading-relaxed text-zinc-400 font-medium list-disc list-inside mt-4">
                        {project.bullets.map((bullet, bi) => (
                          <li key={bi} className="marker:text-brand-cyan">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* ── SKILLS ── */}
        {activeSection === 'skills' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillGroups.map((group, idx) => (
                <GlassCard key={idx} hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-5 space-y-4">
                  <h3 className={'text-xs font-extrabold uppercase tracking-wider border-b border-zinc-900 pb-2 flex items-center gap-2 ' + group.color}>
                    <span>{group.icon}</span>
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <span
                        key={si}
                        className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-brand-purple/40 hover:text-white transition cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Proficiency bars */}
            <GlassCard hoverEffect={false} className="border-zinc-900/60 bg-zinc-950/60 !p-6 space-y-5">
              <h3 className="text-xs font-extrabold uppercase text-zinc-400 border-b border-zinc-900 pb-2">Proficiency Levels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {coreSkills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-300">{skill.name}</span>
                      <span className="text-brand-cyan">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"
                        style={{ width: skill.level + '%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* ── EDUCATION ── */}
        {activeSection === 'education' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
              Education
            </h2>
            {education.map((edu, idx) => (
              <GlassCard key={idx} hoverEffect={false} className="border-brand-cyan/20 bg-zinc-950/60 !p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-white">{edu.degree}</h3>
                    <p className="text-sm text-zinc-400 font-semibold">{edu.institution}</p>
                    <p className="text-xs text-zinc-550">{edu.location}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-xs font-bold text-zinc-500">{edu.duration}</p>
                    <span className="inline-block text-sm font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                      {edu.grade}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
