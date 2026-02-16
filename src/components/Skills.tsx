'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    icon: '🎨',
    skills: ['React / Next.js', 'Remix', 'React Native','TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    skills: ['Node.js / Express', 'RestAPI' ,'GraphQL', 'Prisma', 'PostgreSQL', 'MongoDB', 'FireBase'],
  },
  {
    title: 'AI / Agentic Workflows',
    icon: '🤖',
    skills: ['LangChain', 'LangGraph'],
  },
  {
    title: 'Tools',
    icon: '🛠️',
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
                    stroke="#262626"
                    opacity={0.3}
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    style={{ fontSize: '11px', fontFamily: 'monospace' }}
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    style={{ fontSize: '11px', fontFamily: 'monospace' }}
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#141414',
                      border: '1px solid #262626',
                      borderRadius: '0',
                      boxShadow: 'none',
                      color: '#FFFFFF',
                      fontFamily: 'monospace',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="level" 
                    fill="#C9A962" 
                    radius={[0, 0, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="aer-card h-full p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="aer-headline text-lg">
                      {category.title.toUpperCase()}
                    </h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between py-2 border-b border-aer-border-subtle last:border-b-0"
                    >
                      <span className="text-sm aer-body">{skill}</span>
                      <div className="w-2 h-2 bg-aer-accent-gold" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
