// Global type definitions for the portfolio

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

export interface SkillData {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  display: string;
}