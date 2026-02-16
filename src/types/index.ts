// Type definitions for the portfolio project

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

export type Theme = 'light' | 'dark';
