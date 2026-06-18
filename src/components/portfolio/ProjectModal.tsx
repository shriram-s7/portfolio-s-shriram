import { X, ExternalLink, Github, Play } from 'lucide-react';
import { useEffect } from 'react';

export interface Project {
  id: number;
  title: string;
  status: 'active' | 'prototype';
  shortDescription: string;
  fullDescription: string;
  problem?: string;
  solution?: string;
  features: string[];
  techStack: string[];
  roles?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card p-6 md:p-8 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl md:text-3xl font-display font-bold">{project.title}</h3>
            <span className={project.status === 'active' ? 'status-active' : 'status-prototype'}>
              {project.status === 'active' ? '● In Development' : '● Prototype'}
            </span>
          </div>
          <p className="text-muted-foreground text-lg">{project.fullDescription}</p>
        </div>

        {/* Problem & Solution */}
        {project.problem && project.solution && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <h4 className="font-semibold text-destructive mb-2">Problem</h4>
              <p className="text-sm text-muted-foreground">{project.problem}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">Solution</h4>
              <p className="text-sm text-muted-foreground">{project.solution}</p>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-display font-semibold mb-3">Key Features</h4>
          <ul className="grid gap-2">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">▹</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Roles (if applicable) */}
        {project.roles && (
          <div className="mb-6">
            <h4 className="font-display font-semibold mb-3">User Roles</h4>
            <div className="flex flex-wrap gap-2">
              {project.roles.map((role, index) => (
                <span key={index} className="tech-tag">
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="font-display font-semibold mb-3">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Play size={18} />
              Watch Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={18} />
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
