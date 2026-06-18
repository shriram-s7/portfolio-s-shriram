import { useState, useRef, MouseEvent, useEffect } from 'react';
import { projectsData } from '../../data/projectsData';
import { Github, Youtube, Car, Search, Film, Activity, HeartPulse, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Project {
  id: string | number;
  title: string;
  description: string;
  features: string[];
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  icon: React.ElementType;
  color: string;
  neon: string;
}

// Icon mapping
const iconMap: { [key: string]: React.ElementType } = {
  Car,
  Activity,
  Search,
  Film,
  HeartPulse
};

const projects: Project[] = projectsData.map((project: any) => ({
  ...project,
  icon: iconMap[project.icon] || Activity // Fallback to Activity if icon not found
}));

// --- FIXED 3D TILT CARD ---
const TiltCard = ({ children, className, onClick }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  // State for transform and transition duration
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)",
    transition: "transform 0.4s ease-out" // Default smooth reset
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    // Calculate rotation based on mouse position
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    setStyle({
      // 1. Force Scale(1.05) and TranslateY(-12px) for the POP
      // 2. Apply the Tilt Rotation
      transform: `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.05) translateY(-12px)`,
      // 3. REMOVE transition so it tracks mouse instantly (no lag)
      transition: "none"
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      // Reset everything to flat
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)",
      // Add transition back so it eases out smoothly
      transition: "transform 0.5s ease-out"
    });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-xl border border-white/5 bg-white/5 
        hover:bg-[#020617] hover:border-opacity-100 hover:z-30
        cursor-pointer ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // State for highlighting a specific project card
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | number | null>(null);

  useEffect(() => {
    const handleTriggerProjectView = (event: CustomEvent) => {
      const projectId = event.detail.projectId;
      const projectElement = document.getElementById(`project-card-${projectId}`);

      if (projectElement) {
        // 1. Smooth Scroll
        projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 2. Highlight Effect
        setHighlightedProjectId(projectId);

        // Remove highlight after a delay
        setTimeout(() => setHighlightedProjectId(null), 2000);

        // 3. Auto-open Modal after 1 second
        setTimeout(() => {
          const projectToOpen = projects.find(p => p.id === projectId);
          if (projectToOpen) {
            setSelectedProject(projectToOpen);
          }
        }, 1000);
      }
    };

    window.addEventListener('trigger-project-view' as any, handleTriggerProjectView as any);

    return () => {
      window.removeEventListener('trigger-project-view' as any, handleTriggerProjectView as any);
    };
  }, []);

  return (
    <section id="projects" className="py-7 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title animate-slide-up">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle animate-slide-up animation-delay-100">
            Showcasing innovative solutions in AI, Development, and System Design
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 md:px-0">
          {projects.map((project, index) => (
            // WRAPPER DIV: Handles the slide-up animation separately
            // This prevents the entry animation from cancelling the tilt animation
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className={`animate-slide-up transition-all duration-500 ${highlightedProjectId === project.id ? 'ring-2 ring-primary scale-105 z-40' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TiltCard
                onClick={() => setSelectedProject(project)}
                className={project.neon}
              >
                {/* --- HIGHLIGHT GRADIENT --- */}
                {/* Visible on Hover for that "Light Behind" effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${project.color.replace('text-', 'from-').split(' ')[0]}/20 via-transparent to-transparent`} />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

                {/* Watermark Icon */}
                <project.icon
                  strokeWidth={1}
                  className={`absolute -right-6 -top-6 w-48 h-48 opacity-5 group-hover:opacity-10 transition-all duration-500 -rotate-12 ${project.color.split(' ')[0]}`}
                />

                {/* Content */}
                <div className="p-8 relative z-10 flex flex-col h-full min-h-[320px]">

                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-lg ${project.color} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-${project.color.split(' ')[0]}/50`}>
                      <project.icon size={24} />
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors z-20"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 hover:bg-red-500/20 text-red-400 rounded-full transition-colors z-20"
                        >
                          <Youtube size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/5 group-hover:bg-white/10">
                        {t}
                      </span>
                    ))}
                    <button
                      className="ml-auto text-xs font-medium text-primary flex items-center gap-1 hover:underline"
                    >
                      Details <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Details (Unchanged) */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl glass-card border-white/10 p-0 overflow-hidden">
          <div className="p-6 md:p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                {selectedProject && (
                  <div className={`p-2 rounded-lg ${selectedProject.color}`}>
                    <selectedProject.icon size={24} />
                  </div>
                )}
                <DialogTitle className="text-2xl font-bold">
                  {selectedProject?.title}
                </DialogTitle>
              </div>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-foreground/80">Key Highlights</h4>
                <ul className="space-y-3">
                  {selectedProject?.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                      <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${selectedProject.color.split(' ')[0].replace('text-', 'bg-')}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider text-foreground/80">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject?.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/80 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 pt-6 mt-2 border-t border-white/10">
                {selectedProject?.githubUrl && (
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex-1 justify-center">
                    <Github size={18} /> View Code
                  </a>
                )}
                {selectedProject?.demoUrl && (
                  <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center bg-red-600 hover:bg-red-700 border-red-500">
                    <Youtube size={18} /> Watch Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;