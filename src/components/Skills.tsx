'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Monitor, 
  Server, 
  Brain, 
  Wrench,
  Database,
  Cpu
} from 'lucide-react';
import { apiService } from '@/lib/api';

// Fallback skill data with proficiency levels
const fallbackSkillsData = [
  { name: 'React/Next.js', level: 95 },
  { name: 'React Native', level: 75 },
  { name: 'TypeScript', level: 92 },
  { name: 'Node.js/Express', level: 88 },
  { name: 'LangChain', level: 85 },
  { name: 'PostgreSQL', level: 82 },
  { name: 'Tailwind CSS', level: 90 },
];

// Category icon mapping
const categoryIcons: Record<string, { icon: any; color: string; displayName: string }> = {
  'FRONTEND': { icon: Monitor, color: 'text-blue-400', displayName: 'Frontend' },
  'BACKEND': { icon: Server, color: 'text-green-400', displayName: 'Backend' },
  'AI_AGENTIC': { icon: Brain, color: 'text-purple-400', displayName: 'AI / Agentic' },
  'TOOLS': { icon: Wrench, color: 'text-orange-400', displayName: 'Tools' },
  'DATABASE': { icon: Database, color: 'text-cyan-400', displayName: 'Database' },
  'DEVOPS': { icon: Cpu, color: 'text-red-400', displayName: 'DevOps' },
};

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const [skillsData, setSkillsData] = useState(fallbackSkillsData);
  const [groupedSkills, setGroupedSkills] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use setTimeout to avoid the cascading render warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load skills from backend
    const loadSkills = async () => {
      try {
        const response = await apiService.getSkills();
        if (response.success && response.data) {
          // Backend returns { skills: [], grouped: {} }
          const skillsArray = response.data.skills || response.data;
          const groupedData = response.data.grouped || {};
          
          // Filter only visible skills
          const visibleSkills = Array.isArray(skillsArray) 
            ? skillsArray.filter((skill: any) => skill.visible !== false)
            : [];
          
          // Transform backend data to chart format
          const chartData = visibleSkills.map((skill: any) => ({
            name: skill.name,
            level: skill.level || 80
          }));
          setSkillsData(chartData);

          // If we have grouped data from backend, use it
          if (Object.keys(groupedData).length > 0) {
            setGroupedSkills(groupedData);
          } else {
            // Otherwise, group skills by category on frontend
            const grouped = visibleSkills.reduce((acc: Record<string, any[]>, skill: any) => {
              const category = skill.category || 'Other';
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(skill);
              return acc;
            }, {});

            // Sort skills within each category by order_index
            Object.keys(grouped).forEach(category => {
              grouped[category].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
            });

            setGroupedSkills(grouped);
          }
        }
      } catch (error) {
        console.warn('Failed to load skills from backend, using fallback data:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
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
            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="text-aer-text-muted aer-body">Loading skills...</div>
              </div>
            ) : mounted ? (
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
            ) : null}
          </div>
        </motion.div>

        {/* Skill Categories - Dynamic from Backend */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-aer-text-muted aer-body">Loading skills...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(groupedSkills).map(([category, skills], index) => {
              const categoryConfig = categoryIcons[category] || { icon: Wrench, color: 'text-gray-400', displayName: category };
              const IconComponent = categoryConfig.icon;
              
              return (
                <motion.div
                  key={category}
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
                          className={`w-5 h-5 ${categoryConfig.color} group-hover:text-aer-accent-gold transition-colors duration-300`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <h3 className="aer-headline text-lg">
                        {categoryConfig.displayName.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {skills.map((skill: any) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between py-2 border-b border-aer-border-subtle last:border-b-0 group-hover:border-aer-accent-gold/20 transition-colors duration-300"
                      >
                        <span className="text-sm aer-body">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-aer-accent-gold aer-numeral">{skill.level}%</span>
                          <div className="w-2 h-2 bg-aer-accent-gold opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}