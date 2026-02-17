'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Monitor, 
  Server, 
  Brain, 
  Wrench,
  Code2,
  Database,
  Cpu,
  GitBranch
} from 'lucide-react';

// Skill data with proficiency levels
const skillsData = [
  { name: 'React/Next.js', level: 95 },
  { name: 'TypeScript', level: 92 },
  { name: 'Node.js/Express', level: 88 },
  { name: 'LangChain', level: 85 },
  { name: 'PostgreSQL', level: 82 },
  { name: 'Tailwind CSS', level: 90 },
];

const skillCategories = [
  {
    title: 'Frontend',
    icon: Monitor,
    iconColor: 'text-blue-400',
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: Server,
    iconColor: 'text-green-400',
    skills: ['Node.js / Express', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'AI / Agentic Workflows',
    icon: Brain,
    iconColor: 'text-purple-400',
    skills: ['LangChain', 'LangGraph'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    iconColor: 'text-orange-400',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
  },
];

export default function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid the cascading render warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Get current theme for chart styling
  const isDark = typeof window !== 'undefined' ? 
    document.documentElement.classList.contains('dark') : true;

  return (
    <section id="skills" className="py-32 bg-aer-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Asymmetric Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="aer-offset-grid-reverse items-end">
            <p className="text-lg aer-body">
              A curated selection of technologies and tools I work with to deliver 
              exceptional digital experiences and scalable solutions.
            </p>
            <div>
              <p className="aer-ui-text text-aer-text-muted mb-4">EXPERTISE</p>
              <h2 className="text-5xl md:text-6xl aer-headline">
                SKILLS &{' '}
                <span className="aer-gold-gradient">TECHNOLOGIES</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Skills Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="aer-card p-8">
            <h3 className="text-2xl aer-headline mb-8 text-center">Proficiency Overview</h3>
            {mounted && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData}>
                  <CartesianGrid
                    strokeDasharray="1 1"
                    stroke={isDark ? "#262626" : "#E5E7EB"}
                    opacity={0.3}
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke={isDark ? "#9CA3AF" : "#6B7280"}
                    style={{ fontSize: '11px', fontFamily: 'var(--font-inter)' }}
                    tick={{ fill: isDark ? '#9CA3AF' : '#6B7280' }}
                  />
                  <YAxis 
                    stroke={isDark ? "#9CA3AF" : "#6B7280"}
                    style={{ fontSize: '11px', fontFamily: 'var(--font-sf-mono)' }}
                    tick={{ fill: isDark ? '#9CA3AF' : '#6B7280' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#141414' : '#FFFFFF',
                      border: `1px solid ${isDark ? '#262626' : '#E5E7EB'}`,
                      borderRadius: '0',
                      boxShadow: isDark ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      color: isDark ? '#FFFFFF' : '#0A0A0A',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="level" 
                    fill={isDark ? "#C9A962" : "#B8860B"}
                    radius={[0, 0, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aer-card h-full p-6 group hover:bg-aer-bg-tertiary transition-colors duration-300"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-sm bg-aer-bg-tertiary group-hover:bg-aer-bg-primary transition-colors duration-300`}>
                      <IconComponent 
                        className={`w-5 h-5 ${category.iconColor} group-hover:text-aer-accent-gold transition-colors duration-300`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="aer-headline text-lg">
                      {category.title.toUpperCase()}
                    </h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between py-2 border-b border-aer-border-subtle last:border-b-0 group-hover:border-aer-accent-gold/20 transition-colors duration-300"
                    >
                      <span className="text-sm aer-body">{skill}</span>
                      <div className="w-2 h-2 bg-aer-accent-gold opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}