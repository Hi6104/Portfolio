'use client';

import React, { useState } from 'react';

interface Skill {
  name: string;
  percentage: number;
}

export default function SkillRadar() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const skills: Skill[] = [
    { name: 'Frontend (React/Next.js)', percentage: 96 },
    { name: 'System Architecture', percentage: 88 },
    { name: 'UI/UX & Design Systems', percentage: 92 },
    { name: 'Backend & APIs', percentage: 80 },
    { name: 'DevOps & Optimization', percentage: 78 },
    { name: 'State Management', percentage: 94 }
  ];

  // Radar layout coordinates generator (for 6 vertices of a regular hexagon)
  // Center is (150, 150), radius is 100
  const getCoordinates = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / 6 - Math.PI / 2;
    const radius = 100 * (value / 100);
    const x = 150 + radius * Math.cos(angle);
    const y = 150 + radius * Math.sin(angle);
    return { x, y };
  };

  // Generate Hexagon Grid lines (100%, 75%, 50%, 25%)
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPoints = gridLevels.map((level) => {
    return Array.from({ length: 6 })
      .map((_, i) => {
        const coords = getCoordinates(i, level * 100);
        return `${coords.x},${coords.y}`;
      })
      .join(' ');
  });

  // Generate Data Shape points
  const dataPoints = skills
    .map((skill, index) => {
      const coords = getCoordinates(index, skill.percentage);
      return `${coords.x},${coords.y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
        {/* Glowing Background Radial */}
        <div className="absolute inset-0 bg-radial-gradient from-brand-indigo/10 to-transparent blur-xl pointer-events-none rounded-full" />
        
        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          {/* Hexagonal grid lines */}
          {gridPoints.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="currentColor"
              className="text-zinc-800 dark:text-zinc-800/60 light:text-slate-300"
              strokeWidth="0.5"
              strokeDasharray={idx === 3 ? 'none' : '3,3'}
            />
          ))}

          {/* Hexagonal axis lines from center */}
          {Array.from({ length: 6 }).map((_, i) => {
            const outer = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1="150"
                y1="150"
                x2={outer.x}
                y2={outer.y}
                stroke="currentColor"
                className="text-zinc-800 dark:text-zinc-850 light:text-slate-200"
                strokeWidth="0.75"
              />
            );
          })}

          {/* Filled Skill Polygon Area */}
          <polygon
            points={dataPoints}
            fill="rgba(99, 102, 241, 0.25)"
            stroke="#6366f1"
            strokeWidth="2.5"
            className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          />

          {/* Glow nodes & Interactive dots */}
          {skills.map((skill, index) => {
            const coords = getCoordinates(index, skill.percentage);
            const isHovered = activeSkill?.name === skill.name;
            return (
              <g
                key={index}
                className="cursor-pointer group"
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r={isHovered ? 7 : 4.5}
                  fill={isHovered ? '#06b6d4' : '#8b5cf6'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />
                {isHovered && (
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r="12"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1"
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}

          {/* Radial Axis labels */}
          {skills.map((skill, index) => {
            const outer = getCoordinates(index, 115);
            // Adjust label text anchors for alignment correctness
            let textAnchor: 'middle' | 'end' | 'start' = 'middle';
            if (outer.x < 140) textAnchor = 'end';
            else if (outer.x > 160) textAnchor = 'start';

            // Vertical offset adjustments
            let dy = '0.35em';
            if (outer.y < 50) dy = '-0.2em';
            else if (outer.y > 250) dy = '0.9em';

            return (
              <text
                key={index}
                x={outer.x}
                y={outer.y}
                textAnchor={textAnchor}
                dy={dy}
                className="text-[9px] font-semibold fill-zinc-400 dark:fill-zinc-400 light:fill-slate-600 transition-colors select-none group-hover:fill-brand-indigo"
              >
                {skill.name.split(' (')[0]}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Real-time stats tooltip summary */}
      <div className="h-10 mt-3 flex items-center justify-center">
        {activeSkill ? (
          <div className="text-sm font-medium text-brand-cyan animate-pulse flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
            {activeSkill.name}: <span className="font-extrabold text-white dark:text-white light:text-slate-900">{activeSkill.percentage}%</span> Mastery
          </div>
        ) : (
          <div className="text-xs text-zinc-500 text-center">
            Hover over the outer points to inspect skill levels
          </div>
        )}
      </div>
    </div>
  );
}
