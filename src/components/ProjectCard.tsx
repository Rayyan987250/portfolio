'use client';

import { motion } from 'framer-motion';

export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  aiIntegration?: string;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="aer-card h-full overflow-hidden">
        {/* Project Image/Placeholder */}
        <div className="relative h-64 bg-aer-bg-tertiary overflow-hidden" role="img" aria-label={`${project.name} project thumbnail`}>
          {project.image ? (
            <div className="w-full h-full bg-aer-bg-tertiary flex items-center justify-center">
              <div className="text-center">
                <span className="aer-numeral text-6xl text-aer-accent-gold/30">
                  {String(project.id).padStart(2, '0')}
                </span>
                <p className="aer-ui-text text-aer-text-muted mt-2">
                  {project.name.toUpperCase()}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <span className="aer-numeral text-6xl text-aer-accent-gold/30">
                  {String(project.id).padStart(2, '0')}
                </span>
                <p className="aer-ui-text text-aer-text-muted mt-2">
                  {project.name.toUpperCase()}
                </p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-aer-bg-primary/80 via-transparent to-transparent" />
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl aer-headline">{project.name}</h3>
            <p className="aer-body text-sm">{project.description}</p>
          </div>

          {/* AI Integration Badge */}
          {project.aiIntegration && (
            <div className="inline-flex items-center px-3 py-1 border border-aer-accent-gold text-aer-accent-gold text-xs aer-ui-text">
              AI • {project.aiIntegration.toUpperCase()}
            </div>
          )}

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs aer-ui-text text-aer-text-muted border border-aer-border-subtle">
                {tech.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {project.githubUrl && (
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <button className="aer-button-secondary w-full py-3 text-xs">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <svg className="mr-2 h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    CODE
                  </a>
                </button>
              </motion.div>
            )}
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <button 
                className={`w-full py-3 text-xs transition-all ${
                  project.liveUrl === '#' 
                    ? 'aer-button-secondary opacity-50 cursor-not-allowed' 
                    : 'aer-button-primary'
                }`}
                disabled={project.liveUrl === '#'}
              >
                <a 
                  href={project.liveUrl === '#' ? undefined : project.liveUrl} 
                  target={project.liveUrl === '#' ? undefined : "_blank"} 
                  rel={project.liveUrl === '#' ? undefined : "noopener noreferrer"}
                  className="flex items-center justify-center"
                >
                  {project.liveUrl === '#' ? 'COMING SOON' : 'LIVE DEMO'}
                </a>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
