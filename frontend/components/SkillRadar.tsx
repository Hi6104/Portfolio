'use client';

import React, { useState } from 'react';

interface Skill {
  name: string;
  lines: string[];
  percentage: number;
}

export default function SkillRadar() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const skills: Skill[] = [
    { name: 'Frontend',        lines: ['Frontend', '(React/Next.js)'], percentage: 96 },
    { name: 'System Arch.',    lines: ['System', 'Architecture'],      percentage: 88 },
    { name: 'UI/UX & Design',  lines: ['UI/UX &', 'Design Systems'],   percentage: 92 },
    { name: 'Backend & APIs',  lines: ['Backend', '& APIs'],           percentage: 80 },
    { name: 'DevOps & Optim.', lines: ['DevOps &', 'Optimization'],    percentage: 78 },
    { name: 'State Mgmt.',     lines: ['State', 'Management'],         percentage: 94 },
  ];

  // Center (180,180), radius 100
  const getCoordinates = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / 6 - Math.PI / 2;
    const radius = 100 * (value / 100);
    return {
      x: 180 + radius * Math.cos(angle),
      y: 180 + radius * Math.sin(angle),
    };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPoints = gridLevels.map((level) =>
    Array.from({ length: 6 })
      .map((_, i) => {
        const c = getCoordinates(i, level * 100);
        return `${c.x},${c.y}`;
      })
      .join(' ')
  );

  const dataPoints = skills
    .map((skill, index) => {
      const c = getCoordinates(index, skill.percentage);
      return `${c.x},${c.y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
        <div className="absolute inset-0 bg-radial-gradient from-brand-indigo/10 to-transparent blur-xl pointer-events-none rounded-full" />

        <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.1)]">

          {/* Grid hexagons */}
          {gridPoints.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="currentColor"
              className="text-zinc-800"
              strokeWidth="0.5"
              strokeDasharray={idx === 3 ? undefined : '3,3'}
            />
          ))}

          {/* Axis lines from center */}
          {Array.from({ length: 6 }).map((_, i) => {
            const outer = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1="180" y1="180"
                x2={outer.x} y2={outer.y}
                stroke="currentColor"
                className="text-zinc-800"
                strokeWidth="0.75"
              />
            );
          })}

          {/* Skill polygon */}
          <polygon
            points={dataPoints}
            fill="rgba(99, 102, 241, 0.25)"
            stroke="#6366f1"
            strokeWidth="2.5"
            className="transition-all duration-300"
          />

          {/* Interactive dots */}
          {skills.map((skill, index) => {
            const c = getCoordinates(index, skill.percentage);
            const isHovered = activeSkill?.name === skill.name;
            return (
              <g
                key={index}
                className="cursor-pointer"
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <circle
                  cx={c.x} cy={c.y}
                  r={isHovered ? 7 : 4.5}
                  fill={isHovered ? '#06b6d4' : '#8b5cf6'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />
                {isHovered && (
                  <circle
                    cx={c.x} cy={c.y}
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

          {/* Multi-line labels */}
          {skills.map((skill, index) => {
            const pos = getCoordinates(index, 135);
            let textAnchor: 'middle' | 'end' | 'start' = 'middle';
            if (pos.x < 170) textAnchor = 'end';
            else if (pos.x > 190) textAnchor = 'start';

            const lineH = 11;
            const isTop    = index === 0;
            const isBottom = index === 3;
            const startDy  = isTop ? -lineH : isBottom ? 4 : -(lineH / 2);

            return (
              <text
                key={index}
                x={pos.x}
                y={pos.y}
                textAnchor={textAnchor}
                fontSize="9"
                fill="#a1a1aa"
                fontWeight="600"
              >
                {skill.lines.map((line, li) => (
                  <tspan key={li} x={pos.x} dy={li === 0 ? startDy : lineH}>
                    {line}
                  </tspan>
                ))}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Hover tooltip */}
      <div className="h-10 mt-3 flex items-center justify-center">
        {activeSkill ? (
          <div className="text-sm font-medium text-brand-cyan flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
            {activeSkill.name}:{' '}
            <span className="font-extrabold text-white">{activeSkill.percentage}%</span> Mastery
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
