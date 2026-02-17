// API service for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// API Response types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any[];
  message?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface AnalyticsData {
  action: string;
  page?: string;
  data?: any;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle non-JSON responses
      let data: ApiResponse<T>;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', { url, error });
      
      // Re-throw with more context
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown API error occurred');
    }
  }

  // Contact form submission
  async submitContact(data: ContactFormData): Promise<ApiResponse> {
    // Client-side validation
    if (!data.name?.trim()) {
      throw new Error('Name is required');
    }
    if (!data.email?.trim()) {
      throw new Error('Email is required');
    }
    if (!data.message?.trim()) {
      throw new Error('Message is required');
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Please enter a valid email address');
    }

    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject?.trim() || 'Portfolio Contact',
        message: data.message.trim(),
      }),
    });
  }

  // Get projects
  async getProjects(): Promise<ApiResponse> {
    return this.request('/api/projects');
  }

  // Admin: Get all projects (including drafts)
  async getAdminProjects(token: string): Promise<ApiResponse> {
    return this.request('/api/admin/projects', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Admin: Create project
  async createProject(data: any, token: string): Promise<ApiResponse> {
    return this.request('/api/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  // Admin: Update project
  async updateProject(id: string, data: any, token: string): Promise<ApiResponse> {
    return this.request(`/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  // Admin: Delete project
  async deleteProject(id: string, token: string): Promise<ApiResponse> {
    return this.request(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Get skills
  async getSkills(): Promise<ApiResponse> {
    return this.request('/api/skills');
  }

  // Track analytics
  async trackEvent(data: AnalyticsData): Promise<ApiResponse> {
    if (!data.action?.trim()) {
      console.warn('Analytics: Action is required');
      return { success: false, error: 'Action is required' };
    }

    const sessionId = this.getSessionId();
    
    try {
      return await this.request('/api/analytics/track', {
        method: 'POST',
        headers: {
          'X-Session-ID': sessionId,
        },
        body: JSON.stringify({
          action: data.action.trim(),
          page: data.page?.trim(),
          data: data.data || {},
        }),
      });
    } catch (error) {
      // Don't throw analytics errors - just log them
      console.warn('Analytics tracking failed:', error);
      return { success: false, error: 'Analytics tracking failed' };
    }
  }

  // Track project interaction
  async trackProject(projectId: string, action: string): Promise<ApiResponse> {
    if (!projectId?.trim() || !action?.trim()) {
      console.warn('Analytics: Project ID and action are required');
      return { success: false, error: 'Project ID and action are required' };
    }

    const sessionId = this.getSessionId();
    
    try {
      return await this.request(`/api/analytics/project/${projectId}`, {
        method: 'POST',
        headers: {
          'X-Session-ID': sessionId,
        },
        body: JSON.stringify({ action: action.trim() }),
      });
    } catch (error) {
      // Don't throw analytics errors - just log them
      console.warn('Project analytics tracking failed:', error);
      return { success: false, error: 'Project analytics tracking failed' };
    }
  }

  // Get or create session ID
  private getSessionId(): string {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return `server_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    let sessionId = localStorage.getItem('portfolio-session-id');
    
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('portfolio-session-id', sessionId);
    }
    
    return sessionId;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();
export default apiService;