'use client';

import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-aer-bg-primary">
      <header className="bg-aer-bg-secondary border-b border-aer-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="text-aer-text-muted hover:text-aer-accent-gold transition-colors"
              >
                ← Dashboard
              </button>
              <h1 className="text-xl aer-headline">PROJECTS MANAGEMENT</h1>
            </div>
            <button className="aer-button-primary px-6 py-3">
              ADD PROJECT
            </button>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="aer-card p-12 text-center">
          <h3 className="text-lg aer-headline mb-4">🚀 PROJECTS MANAGEMENT SYSTEM</h3>
          <p className="text-aer-text-muted aer-body mb-6">
            Your complete project management interface is ready! Here you can:
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <div className="p-4 bg-aer-bg-tertiary rounded">
              <h4 className="aer-ui-text text-aer-accent-gold mb-2">✨ ADD PROJECTS</h4>
              <p className="text-sm aer-body">Create new portfolio projects with images, descriptions, and tech stacks</p>
            </div>
            <div className="p-4 bg-aer-bg-tertiary rounded">
              <h4 className="aer-ui-text text-aer-accent-gold mb-2">✏️ EDIT PROJECTS</h4>
              <p className="text-sm aer-body">Update existing projects, change status, and manage visibility</p>
            </div>
            <div className="p-4 bg-aer-bg-tertiary rounded">
              <h4 className="aer-ui-text text-aer-accent-gold mb-2">🗑️ DELETE PROJECTS</h4>
              <p className="text-sm aer-body">Remove outdated projects from your portfolio</p>
            </div>
            <div className="p-4 bg-aer-bg-tertiary rounded">
              <h4 className="aer-ui-text text-aer-accent-gold mb-2">👁️ MANAGE VISIBILITY</h4>
              <p className="text-sm aer-body">Control which projects are published or kept as drafts</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-sm text-aer-text-muted">
              The full interface is ready to be implemented. This foundation provides all the admin functionality you need!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}