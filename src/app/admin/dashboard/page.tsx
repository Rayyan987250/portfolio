'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BarChart3,
  Mail,
  FolderOpen,
  Settings,
  User,
  Save,
  X,
  Search,
  Filter,
  ExternalLink,
  Github
} from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  role: string;
}

interface DashboardStats {
  projects: number;
  skills: number;
  contacts: number;
  analytics: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  tech_stack: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  github_url?: string;
  live_url?: string;
  image?: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
  color?: string;
  order_index: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<DashboardStats>({ projects: 0, skills: 0, contacts: 0, analytics: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [emailServiceStatus, setEmailServiceStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin-token');
    const userData = localStorage.getItem('admin-user');

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
      loadDashboardData(token);
    } catch (error) {
      console.error('Invalid user data:', error);
      router.push('/admin/login');
    }
  }, [router]);

  const getAuthToken = () => localStorage.getItem('admin-token');

  const loadDashboardData = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats({
            projects: data.data.projects || 0,
            skills: data.data.skills || 0,
            contacts: data.data.contacts || 0,
            analytics: data.data.analytics || 0,
          });
        }
      }

      // Check email service status
      await checkEmailServiceStatus();
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEmailServiceStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact/test-email');
      if (response.ok) {
        const data = await response.json();
        setEmailServiceStatus(data.success ? 'online' : 'offline');
      } else {
        setEmailServiceStatus('offline');
      }
    } catch (error) {
      console.error('Failed to check email service:', error);
      setEmailServiceStatus('offline');
    }
  };

  const loadProjects = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/api/admin/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProjects(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const loadSkills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/skills');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSkills(data.data.skills || []);
        }
      }
    } catch (error) {
      console.error('Failed to load skills:', error);
    }
  };

  const loadContacts = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/api/admin/contacts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setContacts(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to load contacts:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    router.push('/admin/login');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'projects') {
      loadProjects();
    } else if (tab === 'skills') {
      loadSkills();
    } else if (tab === 'contacts') {
      loadContacts();
    }
  };

  const handleCreateProject = async (projectData: Partial<Project>) => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProjects([...projects, data.data]);
          setShowProjectForm(false);
          loadDashboardData(token!);
        }
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleUpdateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProjects(projects.map(p => p.id === id ? data.data : p));
          setEditingProject(null);
          loadDashboardData(token!);
        }
      }
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
        loadDashboardData(token!);
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleCreateSkill = async (skillData: Partial<Skill>) => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(skillData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSkills([...skills, data.data]);
          setShowSkillForm(false);
          loadDashboardData(token!);
        }
      }
    } catch (error) {
      console.error('Failed to create skill:', error);
    }
  };

  const handleUpdateSkill = async (id: string, skillData: Partial<Skill>) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:5000/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(skillData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSkills(skills.map(s => s.id === id ? data.data : s));
          setEditingSkill(null);
          loadDashboardData(token!);
        }
      }
    } catch (error) {
      console.error('Failed to update skill:', error);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:5000/api/skills/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSkills(skills.filter(s => s.id !== id));
        loadDashboardData(token!);
      }
    } catch (error) {
      console.error('Failed to delete skill:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-aer-bg-primary flex items-center justify-center">
        <div className="text-aer-text-muted aer-body">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Settings },
    { id: 'contacts', label: 'Messages', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderOpen, color: 'text-blue-400' },
    { label: 'Skills', value: stats.skills, icon: Settings, color: 'text-green-400' },
    { label: 'Messages', value: stats.contacts, icon: Mail, color: 'text-purple-400' },
    { label: 'Page Views', value: stats.analytics, icon: BarChart3, color: 'text-orange-400' },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-aer-bg-primary">
      {/* Header */}
      <header className="bg-aer-bg-secondary border-b border-aer-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl aer-headline">ADMIN DASHBOARD</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-aer-text-muted" />
                <span className="text-sm aer-body">{user.email}</span>
              </div>
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-sm text-aer-text-muted hover:text-aer-accent-gold transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>View Portfolio</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-aer-text-muted hover:text-aer-accent-gold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-aer-accent-gold/10 text-aer-accent-gold border-r-2 border-aer-accent-gold'
                        : 'text-aer-text-muted hover:text-aer-text-primary hover:bg-aer-bg-tertiary'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="aer-ui-text">{item.label.toUpperCase()}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl aer-headline mb-6">Dashboard Overview</h2>
                  
                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="aer-card p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <IconComponent className={`w-6 h-6 ${stat.color}`} />
                            <span className="text-2xl aer-numeral">{stat.value}</span>
                          </div>
                          <h3 className="aer-ui-text text-aer-text-secondary">{stat.label.toUpperCase()}</h3>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Quick Actions */}
                  <div className="aer-card p-6">
                    <h3 className="text-lg aer-headline mb-4">Quick Actions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleTabChange('projects')}
                        className="flex items-center space-x-3 p-4 bg-aer-bg-tertiary hover:bg-aer-accent-gold/10 transition-colors rounded-sm"
                      >
                        <Plus className="w-5 h-5 text-aer-accent-gold" />
                        <span className="aer-body">Manage Projects</span>
                      </button>
                      <button
                        onClick={() => handleTabChange('skills')}
                        className="flex items-center space-x-3 p-4 bg-aer-bg-tertiary hover:bg-aer-accent-gold/10 transition-colors rounded-sm"
                      >
                        <Plus className="w-5 h-5 text-aer-accent-gold" />
                        <span className="aer-body">Manage Skills</span>
                      </button>
                      <button
                        onClick={() => handleTabChange('contacts')}
                        className="flex items-center space-x-3 p-4 bg-aer-bg-tertiary hover:bg-aer-accent-gold/10 transition-colors rounded-sm"
                      >
                        <Mail className="w-5 h-5 text-aer-accent-gold" />
                        <span className="aer-body">View Messages</span>
                      </button>
                      <button
                        onClick={() => router.push('/')}
                        className="flex items-center space-x-3 p-4 bg-aer-bg-tertiary hover:bg-aer-accent-gold/10 transition-colors rounded-sm"
                      >
                        <Eye className="w-5 h-5 text-aer-accent-gold" />
                        <span className="aer-body">View Portfolio</span>
                      </button>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="aer-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg aer-headline">System Status</h3>
                      <button
                        onClick={() => checkEmailServiceStatus()}
                        className="text-xs text-aer-text-muted hover:text-aer-accent-gold transition-colors"
                      >
                        Refresh Status
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="aer-body">Backend API</span>
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">ONLINE</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="aer-body">Database</span>
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">CONNECTED</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="aer-body">Email Service</span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          emailServiceStatus === 'online' ? 'bg-green-500/20 text-green-400' :
                          emailServiceStatus === 'offline' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {emailServiceStatus === 'online' ? 'ONLINE' :
                           emailServiceStatus === 'offline' ? 'OFFLINE' :
                           'CHECKING...'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="aer-body">Analytics</span>
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">TRACKING</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl aer-headline">Projects Management</h2>
                  <button 
                    onClick={() => setShowProjectForm(true)}
                    className="aer-button-primary px-6 py-3 flex items-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-aer-accent-gold/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD PROJECT</span>
                  </button>
                </div>
                
                {/* Projects List */}
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="aer-card p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg aer-headline">{project.name}</h3>
                            <span className={`px-2 py-1 text-xs rounded ${
                              project.status === 'PUBLISHED' ? 'bg-green-500/20 text-green-400' :
                              project.status === 'DRAFT' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {project.status}
                            </span>
                            {project.featured && (
                              <span className="px-2 py-1 text-xs bg-aer-accent-gold/20 text-aer-accent-gold rounded">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <p className="text-aer-text-muted aer-body mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tech_stack.map((tech, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-aer-bg-tertiary text-aer-text-secondary rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-aer-text-muted">
                            {project.github_url && (
                              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-aer-accent-gold transition-all duration-200 hover:scale-105">
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                              </a>
                            )}
                            {project.live_url && (
                              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-aer-accent-gold transition-all duration-200 hover:scale-105">
                                <ExternalLink className="w-4 h-4" />
                                <span>Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 text-aer-text-muted hover:text-aer-accent-gold transition-all duration-200 hover:scale-110 active:scale-95 rounded hover:bg-aer-accent-gold/10"
                            title="Edit Project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 text-aer-text-muted hover:text-red-400 transition-all duration-200 hover:scale-110 active:scale-95 rounded hover:bg-red-400/10"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {projects.length === 0 && (
                    <div className="aer-card p-8 text-center">
                      <FolderOpen className="w-12 h-12 text-aer-text-muted mx-auto mb-4" />
                      <h3 className="text-lg aer-headline mb-2">No Projects Yet</h3>
                      <p className="text-aer-text-muted aer-body mb-4">Create your first project to get started</p>
                      <button 
                        onClick={() => setShowProjectForm(true)}
                        className="aer-button-primary px-6 py-3 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-aer-accent-gold/20"
                      >
                        ADD YOUR FIRST PROJECT
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl aer-headline">Skills Management</h2>
                  <button 
                    onClick={() => setShowSkillForm(true)}
                    className="aer-button-primary px-6 py-3 flex items-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-aer-accent-gold/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD SKILL</span>
                  </button>
                </div>
                
                {/* Skills List */}
                <div className="grid md:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="aer-card p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="aer-headline">{skill.name}</h3>
                          <span className="px-2 py-1 text-xs bg-aer-bg-tertiary text-aer-text-secondary rounded">
                            {skill.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="p-1 text-aer-text-muted hover:text-aer-accent-gold transition-all duration-200 hover:scale-110 active:scale-95 rounded hover:bg-aer-accent-gold/10"
                            title="Edit Skill"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-1 text-aer-text-muted hover:text-red-400 transition-all duration-200 hover:scale-110 active:scale-95 rounded hover:bg-red-400/10"
                            title="Delete Skill"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-aer-text-muted">Proficiency</span>
                          <span className="text-aer-accent-gold aer-numeral">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-aer-bg-tertiary rounded-full h-2">
                          <div 
                            className="bg-aer-accent-gold h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-aer-text-muted">
                        <span>Order: {skill.order_index}</span>
                        <span className={skill.visible ? 'text-green-400' : 'text-red-400'}>
                          {skill.visible ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {skills.length === 0 && (
                    <div className="md:col-span-2 aer-card p-8 text-center">
                      <Settings className="w-12 h-12 text-aer-text-muted mx-auto mb-4" />
                      <h3 className="text-lg aer-headline mb-2">No Skills Yet</h3>
                      <p className="text-aer-text-muted aer-body mb-4">Add your technical skills to showcase your expertise</p>
                      <button 
                        onClick={() => setShowSkillForm(true)}
                        className="aer-button-primary px-6 py-3 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-aer-accent-gold/20"
                      >
                        ADD YOUR FIRST SKILL
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'contacts' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl aer-headline">Contact Messages</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-aer-text-muted" />
                      <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-aer-bg-secondary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Messages List */}
                <div className="space-y-4">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className={`aer-card p-6 ${!contact.read ? 'border-l-4 border-aer-accent-gold' : ''}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="aer-headline">{contact.name}</h3>
                            {!contact.read && (
                              <span className="px-2 py-1 text-xs bg-aer-accent-gold/20 text-aer-accent-gold rounded">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-aer-text-muted">{contact.email}</p>
                          <p className="text-xs text-aer-text-muted mt-1">
                            {new Date(contact.created_at).toLocaleDateString()} at {new Date(contact.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                        <button
                          onClick={() => window.open(`mailto:${contact.email}`, '_blank')}
                          className="flex items-center space-x-2 px-3 py-2 text-sm bg-aer-bg-tertiary hover:bg-aer-accent-gold/10 text-aer-text-muted hover:text-aer-accent-gold transition-colors rounded"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                      <div className="bg-aer-bg-tertiary p-4 rounded">
                        <p className="text-aer-text-primary aer-body">{contact.message}</p>
                      </div>
                    </div>
                  ))}
                  
                  {filteredContacts.length === 0 && contacts.length > 0 && (
                    <div className="aer-card p-8 text-center">
                      <Search className="w-12 h-12 text-aer-text-muted mx-auto mb-4" />
                      <h3 className="text-lg aer-headline mb-2">No Messages Found</h3>
                      <p className="text-aer-text-muted aer-body">Try adjusting your search terms</p>
                    </div>
                  )}
                  
                  {contacts.length === 0 && (
                    <div className="aer-card p-8 text-center">
                      <Mail className="w-12 h-12 text-aer-text-muted mx-auto mb-4" />
                      <h3 className="text-lg aer-headline mb-2">No Messages Yet</h3>
                      <p className="text-aer-text-muted aer-body">Contact messages from your portfolio will appear here</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl aer-headline">Analytics Dashboard</h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="aer-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Eye className="w-6 h-6 text-blue-400" />
                      <span className="text-2xl aer-numeral">{stats.analytics}</span>
                    </div>
                    <h3 className="aer-ui-text text-aer-text-secondary">TOTAL VIEWS</h3>
                    <p className="text-xs text-aer-text-muted mt-1">All time page views</p>
                  </div>
                  
                  <div className="aer-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Mail className="w-6 h-6 text-green-400" />
                      <span className="text-2xl aer-numeral">{stats.contacts}</span>
                    </div>
                    <h3 className="aer-ui-text text-aer-text-secondary">MESSAGES</h3>
                    <p className="text-xs text-aer-text-muted mt-1">Contact form submissions</p>
                  </div>
                  
                  <div className="aer-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <FolderOpen className="w-6 h-6 text-purple-400" />
                      <span className="text-2xl aer-numeral">{stats.projects}</span>
                    </div>
                    <h3 className="aer-ui-text text-aer-text-secondary">PROJECTS</h3>
                    <p className="text-xs text-aer-text-muted mt-1">Published projects</p>
                  </div>
                  
                  <div className="aer-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Settings className="w-6 h-6 text-orange-400" />
                      <span className="text-2xl aer-numeral">{stats.skills}</span>
                    </div>
                    <h3 className="aer-ui-text text-aer-text-secondary">SKILLS</h3>
                    <p className="text-xs text-aer-text-muted mt-1">Technical skills listed</p>
                  </div>
                </div>

                <div className="aer-card p-8">
                  <div className="text-center">
                    <h3 className="text-lg aer-headline mb-4">📊 ANALYTICS INSIGHTS</h3>
                    <p className="text-aer-text-muted aer-body mb-6">
                      Track your portfolio performance and visitor engagement
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                      <div className="p-4 bg-aer-bg-tertiary rounded">
                        <h4 className="aer-ui-text text-aer-accent-gold mb-2">📈 VISITOR TRENDS</h4>
                        <p className="text-sm aer-body">Daily, weekly, and monthly visitor statistics</p>
                      </div>
                      <div className="p-4 bg-aer-bg-tertiary rounded">
                        <h4 className="aer-ui-text text-aer-accent-gold mb-2">🎯 POPULAR CONTENT</h4>
                        <p className="text-sm aer-body">Most viewed projects and sections</p>
                      </div>
                      <div className="p-4 bg-aer-bg-tertiary rounded">
                        <h4 className="aer-ui-text text-aer-accent-gold mb-2">🌍 GEOGRAPHIC DATA</h4>
                        <p className="text-sm aer-body">Where your visitors are coming from</p>
                      </div>
                      <div className="p-4 bg-aer-bg-tertiary rounded">
                        <h4 className="aer-ui-text text-aer-accent-gold mb-2">📱 DEVICE INSIGHTS</h4>
                        <p className="text-sm aer-body">Desktop vs mobile usage patterns</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="bg-aer-bg-tertiary p-4 rounded">
                        <h4 className="aer-ui-text text-aer-accent-gold mb-2">🚀 PERFORMANCE</h4>
                        <p className="text-sm aer-body">
                          Your portfolio is performing well with {stats.analytics} total page views and {stats.contacts} contact inquiries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Project Form Modal */}
      {(showProjectForm || editingProject) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-aer-bg-secondary rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl aer-headline">
                {editingProject ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}
              </h3>
              <button
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                }}
                className="p-2 text-aer-text-muted hover:text-aer-accent-gold transition-all duration-200 hover:scale-110 active:scale-95 rounded hover:bg-aer-accent-gold/10"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <ProjectForm
              project={editingProject}
              onSubmit={(data) => {
                if (editingProject) {
                  handleUpdateProject(editingProject.id, data);
                } else {
                  handleCreateProject(data);
                }
              }}
              onCancel={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Skill Form Modal */}
      {(showSkillForm || editingSkill) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-aer-bg-secondary rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl aer-headline">
                {editingSkill ? 'EDIT SKILL' : 'ADD NEW SKILL'}
              </h3>
              <button
                onClick={() => {
                  setShowSkillForm(false);
                  setEditingSkill(null);
                }}
                className="p-2 text-aer-text-muted hover:text-aer-accent-gold transition-all duration-200 hover:scale-110 active:scale-95 rounded hover:bg-aer-accent-gold/10"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <SkillForm
              skill={editingSkill}
              onSubmit={(data) => {
                if (editingSkill) {
                  handleUpdateSkill(editingSkill.id, data);
                } else {
                  handleCreateSkill(data);
                }
              }}
              onCancel={() => {
                setShowSkillForm(false);
                setEditingSkill(null);
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Project Form Component
function ProjectForm({ 
  project, 
  onSubmit, 
  onCancel 
}: { 
  project?: Project | null; 
  onSubmit: (data: Partial<Project>) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    techStack: project?.tech_stack?.join(', ') || '',
    status: (project?.status || 'DRAFT') as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
    githubUrl: project?.github_url || '',
    liveUrl: project?.live_url || '',
    featured: project?.featured || false,
    order: project?.order_index || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      name: formData.name,
      description: formData.description,
      techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
      status: formData.status,
      githubUrl: formData.githubUrl || undefined,
      liveUrl: formData.liveUrl || undefined,
      featured: formData.featured,
      order: formData.order,
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          PROJECT NAME *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted"
          placeholder="Enter project name"
        />
      </div>

      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          DESCRIPTION *
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold resize-none transition-all duration-200 hover:border-aer-text-muted"
          placeholder="Describe your project"
        />
      </div>

      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          TECH STACK *
        </label>
        <input
          type="text"
          required
          value={formData.techStack}
          onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted"
          placeholder="React, TypeScript, Node.js (comma separated)"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
            STATUS
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' })}
            className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted cursor-pointer"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
            ORDER
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          GITHUB URL
        </label>
        <input
          type="url"
          value={formData.githubUrl}
          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
          className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted"
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          LIVE URL
        </label>
        <input
          type="url"
          value={formData.liveUrl}
          onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
          className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold transition-all duration-200"
          placeholder="https://your-project.com"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4 text-aer-accent-gold bg-aer-bg-primary border-aer-border-subtle rounded focus:ring-aer-accent-gold focus:ring-2"
        />
        <label htmlFor="featured" className="text-sm aer-ui-text text-aer-text-secondary">
          FEATURED PROJECT
        </label>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-aer-border-subtle">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-aer-text-muted hover:text-aer-text-primary transition-all duration-200 hover:scale-105 active:scale-95"
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="aer-button-primary px-6 py-3 flex items-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-aer-accent-gold/20"
        >
          <Save className="w-4 h-4" />
          <span>{project ? 'UPDATE' : 'CREATE'} PROJECT</span>
        </button>
      </div>
    </form>
  );
}

// Skill Form Component
function SkillForm({ 
  skill, 
  onSubmit, 
  onCancel 
}: { 
  skill?: Skill | null; 
  onSubmit: (data: Partial<Skill>) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    level: skill?.level || 50,
    category: skill?.category || 'FRONTEND',
    icon: skill?.icon || '',
    color: skill?.color || '',
    order: skill?.order_index || 0,
    visible: skill?.visible !== false,
  });

  const categories = ['FRONTEND', 'BACKEND', 'AI_AGENTIC', 'TOOLS', 'DATABASE', 'DEVOPS'];
  
  const categoryDisplayNames: Record<string, string> = {
    'FRONTEND': 'Frontend',
    'BACKEND': 'Backend',
    'AI_AGENTIC': 'AI / Agentic',
    'TOOLS': 'Tools',
    'DATABASE': 'Database',
    'DEVOPS': 'DevOps'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      name: formData.name,
      level: formData.level,
      category: formData.category,
      icon: formData.icon || undefined,
      color: formData.color || undefined,
      order: formData.order,
      visible: formData.visible,
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          SKILL NAME *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted"
          placeholder="Enter skill name"
        />
      </div>

      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          PROFICIENCY LEVEL: {formData.level}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
          className="w-full h-2 bg-aer-bg-primary rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-aer-text-muted mt-1">
          <span>Beginner</span>
          <span>Expert</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
            CATEGORY
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted cursor-pointer"
          >
            {categories.map(category => (
              <option key={category} value={category}>{categoryDisplayNames[category]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
            ORDER
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          ICON (OPTIONAL)
        </label>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted"
          placeholder="Icon name or emoji"
        />
      </div>

      <div>
        <label className="block text-sm aer-ui-text text-aer-text-secondary mb-2">
          COLOR (OPTIONAL)
        </label>
        <input
          type="text"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="w-full px-4 py-3 bg-aer-bg-primary border border-aer-border-subtle rounded text-aer-text-primary placeholder-aer-text-muted focus:outline-none focus:border-aer-accent-gold transition-all duration-200 hover:border-aer-text-muted"
          placeholder="#FF5733 or red"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="visible"
          checked={formData.visible}
          onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
          className="w-4 h-4 text-aer-accent-gold bg-aer-bg-primary border-aer-border-subtle rounded focus:ring-aer-accent-gold focus:ring-2"
        />
        <label htmlFor="visible" className="text-sm aer-ui-text text-aer-text-secondary">
          VISIBLE ON PORTFOLIO
        </label>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-aer-border-subtle">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-aer-text-muted hover:text-aer-text-primary transition-all duration-200 hover:scale-105 active:scale-95"
        >
          CANCEL
        </button>
        <button
          type="submit"
          className="aer-button-primary px-6 py-3 flex items-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-aer-accent-gold/20"
        >
          <Save className="w-4 h-4" />
          <span>{skill ? 'UPDATE' : 'CREATE'} SKILL</span>
        </button>
      </div>
    </form>
  );
}