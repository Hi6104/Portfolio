'use client';

import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: 'purple' | 'indigo' | 'cyan' | 'none';
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  glowColor = 'none',
  onClick
}: GlassCardProps) {
  const glowStyles = {
    purple: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-brand-purple/35',
    indigo: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-brand-indigo/35',
    cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-brand-cyan/35',
    none: ''
  };

  return (
    <div
      onClick={onClick}
      className={`
        glass-container 
        rounded-2xl 
        p-6 
        relative 
        overflow-hidden 
        w-full
        ${hoverEffect ? 'glass-card-hover cursor-pointer' : ''}
        ${glowColor !== 'none' ? glowStyles[glowColor] : ''}
        ${onClick ? 'active:scale-[0.98]' : ''}
        ${className}
      `}
    >
      {/* Dynamic ambient card glow on hover */}
      {glowColor !== 'none' && (
        <div 
          className={`
            absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500
            ${glowColor === 'purple' ? 'bg-brand-purple' : ''}
            ${glowColor === 'indigo' ? 'bg-brand-indigo' : ''}
            ${glowColor === 'cyan' ? 'bg-brand-cyan' : ''}
          `}
        />
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
