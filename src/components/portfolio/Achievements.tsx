import { useState, useEffect } from 'react';
import { Trophy, X, ZoomIn, ZoomOut, Medal, Award, ExternalLink, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  organization: string;
  result: string;
  date: string;
  description: string;
  color: string;
  glow: string;
  icon?: string;
  myContribution?: string[];
  verifyLink?: string;
}

interface CourseCert {
  title: string;
  grade: string;
  description: string;
  verifyLink: string;
}

interface CertificationGroup {
  id: string;
  platform: string;
  coursesCount?: number;
  certs?: CourseCert[];
  highlight?: boolean;
  highlightLabel?: string;
  isNested?: boolean;
  subGroups?: {
    id: string;
    platform: string;
    coursesCount: number;
    certs: CourseCert[];
  }[];
}

// --- DATA ---
import { achievements as achievementsData, certificationGroups } from '../../data/achievementsData';

// Icon mapping
const iconMap: { [key: string]: React.ElementType } = {
  Trophy,
  Medal,
  Award,
  ExternalLink
};

const achievements = achievementsData.map((item: any) => ({
  ...item
}));

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  const visibleAchievements = showAllAchievements ? achievements : achievements.slice(0, 6);

  useEffect(() => {
    if (selectedAchievement) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedAchievement]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">

        {/* =========================================
            1. ACHIEVEMENTS SECTION 
           ========================================= */}
        <div className="text-center mb-16">
          <h2 className="section-title animate-slide-up">
            Honors & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle animate-slide-up animation-delay-100">
            Recognition from Hackathons, Academics, and Competitions
          </p>
        </div>

        {/* GRID (3 Columns) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleAchievements.map((item, index) => (
            <div
              key={item.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                onClick={() => setSelectedAchievement(item)}
                className={`group relative flex flex-col h-full rounded-2xl border border-white/10 bg-white/5 
                  transition-all duration-300 ease-out cursor-pointer
                  hover:scale-110 hover:-translate-y-4 hover:z-50 hover:bg-[#020617]
                  ${item.glow}`}
              >
                {/* 1. HEADER AREA */}
                <div className="flex justify-between items-center p-6 pb-0 z-10">
                  <div className="px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-white/90">
                    {item.date}
                  </div>

                  <div className={`p-2 rounded-full backdrop-blur-xl bg-[#0a0a0a]/90 border border-white/10 shadow-[inset_0_0_12px_-3px_currentColor] ${item.color}`}>
                    {(() => {
                      const IconComponent = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : Trophy;
                      return <IconComponent size={18} strokeWidth={2} className="text-current" />;
                    })()}
                  </div>
                </div>

                {/* 2. CONTENT AREA */}
                <div className="p-6 flex-1 relative z-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors text-white/90">
                      {item.title}
                    </h3>

                    <p className="text-base text-muted-foreground mb-3 line-clamp-1">
                      {item.organization}
                    </p>

                    <p className="text-sm text-gray-400 mb-5 line-clamp-2 min-h-[2.5rem]">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className={`inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-md bg-white/5 border border-white/5 ${item.color}`}>
                      <Award size={16} />
                      {item.result}
                    </div>
                    <span className="text-xs font-medium text-white/30 group-hover:text-primary transition-colors border-b border-transparent group-hover:border-primary">
                      Verify →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW MORE BUTTON - ACHIEVEMENTS */}
        {achievements.length > 6 && (
          <div className="flex justify-center mb-24 animate-slide-up">
            <button
              onClick={() => setShowAllAchievements(!showAllAchievements)}
              className="group relative px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-2 overflow-hidden hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 text-base font-bold tracking-wide text-white/90 group-hover:text-primary transition-colors">
                {showAllAchievements ? 'Show Less' : `View ${achievements.length - 6} More Honors`}
              </span>
              <div className="relative z-10 text-primary">
                {showAllAchievements ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </button>
          </div>
        )}


        {/* =========================================
            2. CERTIFICATIONS SECTION 
           ========================================= */}
        <div className="text-center mb-16">
          <h2 className="section-title animate-slide-up">
            Technical <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle animate-slide-up animation-delay-100">
            Validated skills in Data Science, Programming, and IoT
          </p>
        </div>

        {/* ACCORDION CONTAINER */}
        <div className="max-w-4xl mx-auto space-y-6">
          {certificationGroups.map((group) => {
            const isOpen = !!openGroups[group.id];
            const coursesCount = group.coursesCount ?? group.subGroups?.reduce((acc, sub) => acc + sub.coursesCount, 0) ?? 0;
            return (
              <div 
                key={group.id} 
                className="border border-white/10 rounded-2xl bg-[#090d16]/40 overflow-hidden transition-all duration-300"
              >
                {/* Clickable Header Row */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xl font-bold text-white tracking-wide">{group.platform}</span>
                    {group.highlightLabel && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                        {group.highlightLabel}
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                      {coursesCount} {coursesCount === 1 ? 'course' : 'courses'}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Expanded Content with CSS transition */}
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isOpen ? '4000px' : '0px',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  {group.isNested && group.subGroups ? (
                    <div className="p-6 pt-2 border-t border-white/5 bg-black/20 space-y-4">
                      {group.subGroups.map((subGroup) => {
                        const isSubOpen = !!openGroups[subGroup.id];
                        return (
                          <div 
                            key={subGroup.id}
                            className="border border-white/5 rounded-xl bg-[#090d16]/20 overflow-hidden transition-all duration-300"
                          >
                            {/* Nested Header Row */}
                            <button
                              onClick={() => toggleGroup(subGroup.id)}
                              className="w-full flex items-center justify-between p-4 pl-6 hover:bg-white/5 transition-colors focus:outline-none"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-white/90 tracking-wide">{subGroup.platform}</span>
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                                  {subGroup.coursesCount} {subGroup.coursesCount === 1 ? 'course' : 'courses'}
                                </span>
                              </div>
                              <div className={`p-1 rounded-full bg-white/5 border border-white/10 text-white/70 transition-transform duration-300 ${isSubOpen ? 'rotate-180' : ''}`}>
                                <ChevronDown size={14} />
                              </div>
                            </button>

                            {/* Nested Expanded Content */}
                            <div
                              className="transition-all duration-500 ease-in-out overflow-hidden"
                              style={{
                                maxHeight: isSubOpen ? '2000px' : '0px',
                                opacity: isSubOpen ? 1 : 0
                              }}
                            >
                              <div className="p-6 pt-2 border-t border-white/5 bg-black/10">
                                <div className="grid md:grid-cols-2 gap-4">
                                  {subGroup.certs.map((cert, certIdx) => (
                                    <div
                                      key={certIdx}
                                      className="group/card relative flex flex-col justify-between p-5 rounded-xl border-l-[3px] border-l-[#06b6d4] border-t border-r border-b border-white/5 bg-[#0d1527]/40 hover:bg-[#0f1b33] transition-all duration-300 shadow-sm hover:shadow-cyan-950/10"
                                    >
                                      <div>
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                          <h4 className="font-bold text-base text-white leading-snug group-hover/card:text-cyan-400 transition-colors">
                                            {cert.title}
                                          </h4>
                                          <span className="shrink-0 text-[9px] font-bold tracking-wider uppercase bg-cyan-400/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-400/20 font-mono">
                                            {cert.grade}
                                          </span>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-relaxed mb-3">
                                          {cert.description}
                                        </p>
                                      </div>
                                      <div>
                                        <a
                                          href={cert.verifyLink}
                                          className="inline-flex items-center gap-1 text-[#0d9488] hover:text-[#0f766e] text-[11px] font-bold tracking-wide transition-colors group/link"
                                        >
                                          Verify 
                                          <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                                        </a>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-6 pt-2 border-t border-white/5 bg-black/20">
                      <div className="grid md:grid-cols-2 gap-6">
                        {group.certs?.map((cert, certIdx) => (
                          <div
                            key={certIdx}
                            className={`group/card relative flex flex-col justify-between p-6 rounded-xl border-l-[3px] border-t border-r border-b border-white/5 bg-[#0d1527]/60 hover:bg-[#0f1b33] transition-all duration-300 shadow-md ${
                              group.highlight
                                ? 'border-l-[#f59e0b] hover:shadow-amber-950/20'
                                : 'border-l-[#06b6d4] hover:shadow-cyan-950/20'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <h4 className={`font-bold text-white leading-snug transition-colors ${group.highlight ? 'text-xl group-hover/card:text-amber-400' : 'text-lg group-hover/card:text-cyan-400'}`}>
                                  {cert.title}
                                </h4>
                                <span className={`shrink-0 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border font-mono ${
                                  group.highlight
                                    ? 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                                    : 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20'
                                }`}>
                                  {cert.grade}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                {cert.description}
                              </p>
                            </div>
                            <div>
                              <a
                                href={cert.verifyLink}
                                className={`inline-flex items-center gap-1 text-xs font-bold tracking-wide transition-colors group/link ${
                                  group.highlight
                                    ? 'text-amber-500 hover:text-amber-600'
                                    : 'text-[#0d9488] hover:text-[#0f766e]'
                                }`}
                              >
                                Verify 
                                <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 🏆 ACHIEVEMENT DETAILS MODAL */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedAchievement(null)}
          />

          <div className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[85vh]">
            <div className="relative p-6 md:p-8 border-b border-white/10 bg-white/5">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full backdrop-blur-xl bg-black/40 border border-white/10 shadow-[inset_0_0_12px_-3px_currentColor] ${selectedAchievement.color}`}>
                  {(() => {
                    const IconComponent = (selectedAchievement.icon && iconMap[selectedAchievement.icon]) ? iconMap[selectedAchievement.icon] : Trophy;
                    return <IconComponent size={24} className="text-current" />;
                  })()}
                </div>
                <div className="flex-1 pr-6">
                  <h3 className="text-2xl font-bold text-white mb-2 leading-snug">{selectedAchievement.title}</h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {selectedAchievement.organization}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-white/80">
                      {selectedAchievement.date}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded bg-white/5 border border-white/5 ${selectedAchievement.color}`}>
                      {selectedAchievement.result}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Award size={18} className="text-primary" />
                  Achievement Summary
                </h4>
                {selectedAchievement.myContribution && selectedAchievement.myContribution.length > 0 && (
                  <ul className="space-y-2.5">
                    {selectedAchievement.myContribution.map((contribution, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-teal-400 shrink-0 mt-1.5">•</span>
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {selectedAchievement.verifyLink && (
                <div className="pt-2">
                  <a
                    href={selectedAchievement.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                  >
                    <ExternalLink size={14} />
                    <span>Link to Certificate</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;