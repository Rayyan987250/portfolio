'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { type Project } from '@/types';
import { apiService } from '@/lib/api';

// Fallback project data in case API fails
const fallbackProjects: Project[] = [
  {
    id: 1,
    name: 'Coming Soon',
    description:
      'Exciting projects are currently in development. Check back soon to see my latest work featuring cutting-edge technologies and innovative solutions.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    aiIntegration: 'AI Integration',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    name: 'Coming Soon',
    description:
      'Working on amazing full-stack applications with modern architecture. Stay tuned for updates on these exciting projects.',
    techStack: ['PostgreSQL', 'MongoDB', 'Express', 'Tailwind CSS'],
    aiIntegration: 'LangChain',
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 3,
    name: 'Coming Soon',
    description:
      'Building scalable solutions with AI-powered features. More details coming soon as development progresses.',
    techStack: ['LangGraph', 'FastAPI', 'Docker', 'AWS'],
    aiIntegration: 'Agentic Workflows',
    githubUrl: '#',
    liveUrl: '#',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await apiService.getProjects();
        if (response.success && response.data && Array.isArray(response.data)) {
          // Transform backend data to frontend format
          const transformedProjects = response.data.map((project: any) => ({
            id: project.id,
            name: project.title || project.name,
            description: project.description,
            techStack: project.technologies ? project.technologies.split(',').map((tech: string) => tech.trim()) : [],
            aiIntegration: project.ai_integration || 'AI Integration',
            githubUrl: project.github_url || '#',
            liveUrl: project.live_url || '#',
            imageUrl: project.image_url,
            featured: project.featured,
            status: project.status
          }));
          
          // Only show visible/published projects to public
          const visibleProjects = transformedProjects.filter((project: any) => 
            project.status === 'PUBLISHED' || project.status === 'published'
          );
          
          if (visibleProjects.length > 0) {
            setProjects(visibleProjects);
          }
          // If no published projects, keep fallback
        }
      } catch (error) {
        console.warn('Failed to load projects from backend, using fallback data:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  return (
    <section id="projects" className="py-32 bg-aer-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Asymmetric Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="aer-offset-grid items-end">
            <div>
              <p className="aer-ui-text text-aer-text-muted mb-4">SELECTED WORK</p>
              <h2 className="text-5xl md:text-6xl aer-headline">
                FEATURED{' '}
                <span className="aer-gold-gradient">PROJECTS</span>
              </h2>
              <p className="text-lg aer-body max-w-lg mt-6">
                Explore my latest work showcasing AI integration, modern web technologies, 
                and innovative solutions built with attention to detail and performance.
              </p>
            </div>
            <div className="text-right">
              <span className="aer-numeral text-aer-text-muted text-lg">
                /0{projects.length}
              </span>
              <p className="aer-ui-text text-aer-text-muted mt-4">
                COMING SOON
              </p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-aer-text-muted aer-body">Loading projects...</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
