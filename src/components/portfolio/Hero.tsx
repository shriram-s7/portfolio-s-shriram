import { useState, useEffect } from 'react';
import { Eye, Briefcase, X, Download, ZoomIn, ZoomOut, MapPin } from 'lucide-react';
import { profileData } from '../../data/profileData';

const Hero = () => {
  const [showResume, setShowResume] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { name, role, summary, location, education, techStack } = profileData;

  useEffect(() => {
    if (showResume) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showResume]);

  useEffect(() => {
    if (!showResume) setZoomLevel(1);
  }, [showResume]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Effects - GLOW INTENSITY INCREASED */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      {/* Increased size from 600px to 800px and added opacity for stronger, larger glow */}
      <div className="glow-effect w-[800px] h-[800px] bg-primary/60 -top-48 -left-48 animate-pulse-glow" />
      {/* Increased size from 500px to 700px */}
      <div className="glow-effect w-[700px] h-[700px] bg-secondary/60 -bottom-32 -right-32 animate-pulse-glow animation-delay-300" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="max-w-[90rem] mx-auto text-center">

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 animate-slide-up">
            <span className="gradient-text">{name}</span>
          </h1>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6 animate-slide-up animation-delay-100">
            <MapPin size={16} className="text-primary" />
            <span className="text-base font-medium">{location}</span>
          </div>

          <p className="text-xl md:text-2xl text-foreground font-medium mb-4 animate-slide-up animation-delay-150">
            {role}
          </p>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-200">
            {summary}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up animation-delay-300">
            <a href="#projects" className="btn-primary">
              <Briefcase size={18} />
              View Projects
            </a>
            <button
              onClick={() => setShowResume(true)}
              className="btn-secondary"
            >
              <Eye size={18} />
              View Resume
            </button>
          </div>

          {/* --- STATS BAR --- */}
          {/* Changes:
             1. Reverted bg-[#0a0a0a]/80 to bg-black/40 for more translucency (glass effect).
             2. Kept the new border-primary/30 and shadow highlight.
          */}
          <div className="
            w-full rounded-2xl 
            bg-black/40 backdrop-blur-xl 
            border border-primary/30
            shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)]
            hover:border-primary/50 hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.25)]
            transition-all duration-300
            p-6 md:px-8 md:py-8 
            animate-slide-up animation-delay-400 
            text-left
          ">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-8 gap-x-6 items-start">

              {/* 1. EDUCATION (4 Columns) */}
              <div className="xl:col-span-4 xl:border-r border-white/5 xl:pr-6">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">Education</p>
                <div className="flex flex-col gap-5">
                  <div className="h-11 flex flex-col justify-center">
                    <p className="font-bold text-foreground text-base leading-tight">{education[0].institution}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{education[0].degree} • {education[0].year}</p>
                  </div>
                  <div className="h-11 flex flex-col justify-center">
                    <p className="font-bold text-foreground text-base leading-tight">{education[1].institution}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{education[1].degree} • {education[1].year}</p>
                  </div>
                </div>
              </div>

              {/* 2. LEVEL (2 Columns) */}
              <div className="xl:col-span-2 xl:border-r border-white/5 xl:pr-6">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">Current Level</p>
                <div className="flex flex-col gap-5">
                  <div className="h-11 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                      Semester 5
                    </span>
                  </div>
                  <div className="h-11 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 whitespace-nowrap">
                      Diploma Level
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. CGPA (1 Column) */}
              <div className="xl:col-span-1 xl:border-r border-white/5 xl:pr-6">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">CGPA</p>
                <div className="flex flex-col gap-5">
                  <div className="h-11 flex items-center">
                    <span className="font-bold text-2xl gradient-text">8.87</span>
                  </div>
                  <div className="h-11 flex items-center">
                    <span className="font-bold text-2xl text-white/90">7.59</span>
                  </div>
                </div>
              </div>

              {/* 4. STATUS (2 Columns) */}
              <div className="xl:col-span-2 xl:border-r border-white/5 xl:pr-6 flex flex-col h-full">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">Status</p>
                <div className="flex-1 flex items-center">
                  <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-xs font-medium border border-green-500/20 whitespace-nowrap">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Open to Internships
                  </div>
                </div>
              </div>

              {/* 5. TECH STACK (3 Columns) */}
              <div className="xl:col-span-3 flex flex-col h-full">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">Tech Stack</p>
                <div className="flex-1 flex items-center">
                  <div className="flex flex-wrap gap-2 content-center">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-secondary/10 border border-secondary/20 text-secondary-foreground text-xs font-medium hover:bg-secondary/20 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* --- RESUME MODAL --- */}
      {showResume && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={() => setShowResume(false)}
          />

          <div className="relative w-full max-w-6xl h-[90vh] glass-card flex flex-col animate-scale-in border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex flex-wrap items-center justify-between p-4 border-b border-white/10 bg-black/40 z-10 shrink-0 gap-4">
              <h3 className="text-xl font-semibold text-white">Resume Preview</h3>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center bg-white/10 rounded-lg p-1">
                  <button onClick={handleZoomOut} className="p-1.5 hover:bg-white/10 rounded-md transition-colors" title="Zoom Out"><ZoomOut size={18} /></button>
                  <span className="px-2 text-xs font-mono w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                  <button onClick={handleZoomIn} className="p-1.5 hover:bg-white/10 rounded-md transition-colors" title="Zoom In"><ZoomIn size={18} /></button>
                </div>
                <a href="/S_Shriram_Resume.pdf" download="S_Shriram_Resume.pdf" className="btn-primary py-1.5 px-3 text-sm flex items-center gap-2 h-9">
                  <Download size={16} /> <span className="hidden sm:inline">Download PDF</span>
                </a>
                <button onClick={() => setShowResume(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"><X size={24} /></button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-neutral-900/50 relative flex items-start justify-center p-4 md:p-8">
              <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }} className="shadow-2xl">
                <img src="/resume.png" alt="Resume Preview" className="max-w-full w-auto h-auto object-contain bg-white" style={{ minWidth: 'min(100%, 800px)' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;