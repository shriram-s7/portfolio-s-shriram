import { 
  Code, 
  Globe, 
  Brain, 
  Wrench, 
  Coffee, 
  Terminal, 
  Server, 
  Database, 
  Network, 
  Zap, 
  GitBranch, 
  Eye, 
  Target 
} from 'lucide-react';

import { skillsData } from '../../data/skillsData';

// Icon mapping for categories
const iconMap: { [key: string]: React.ElementType } = {
  Code,
  Globe,
  Brain,
  Wrench
};

const skillCategories = skillsData.map((category: any) => ({
  ...category,
  icon: iconMap[category.icon] || Code // Fallback
}));

// Skill-specific icons and colors configuration
interface SkillIconConfig {
  icon: React.ElementType;
  colorClass: string;
}

const skillIconMap: { [key: string]: SkillIconConfig } = {
  'Python': { icon: Code, colorClass: 'text-yellow-400' },
  'Java': { icon: Coffee, colorClass: 'text-orange-400' },
  'C': { icon: Terminal, colorClass: 'text-blue-400' },
  'HTML/CSS/JS': { icon: Globe, colorClass: 'text-orange-400' },
  'Flask': { icon: Server, colorClass: 'text-gray-300' },
  'MySQL/SQLite': { icon: Database, colorClass: 'text-blue-400' },
  'Machine Learning': { icon: Brain, colorClass: 'text-purple-400' },
  'LSTM / NLP': { icon: Network, colorClass: 'text-purple-400' },
  'Automation': { icon: Zap, colorClass: 'text-yellow-400' },
  'Git & GitHub': { icon: GitBranch, colorClass: 'text-orange-400' },
  'OpenCV': { icon: Eye, colorClass: 'text-cyan-400' },
  'YOLOv8': { icon: Target, colorClass: 'text-cyan-400' }
};

const getSkillIconConfig = (name: string): SkillIconConfig => {
  return skillIconMap[name] || { icon: Code, colorClass: 'text-gray-400' };
};

const getProficiency = (level: number) => {
  if (level >= 80) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Basic';
};

const getBarFillClass = (proficiency: string) => {
  switch (proficiency) {
    case 'Advanced':
      return 'skill-bar-fill'; // Keep existing cyan-to-purple gradient (hero color)
    case 'Intermediate':
      return 'h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00C9A7]'; // Catchy Blue to Teal gradient
    case 'Basic':
    case 'Beginner':
    default:
      return 'h-full rounded-full bg-gradient-to-r from-[#475569] to-[#64748B]'; // Catchy Slate-600 to Slate-500 gradient
  }
};

const getLabelClass = (proficiency: string) => {
  switch (proficiency) {
    case 'Advanced':
      return 'text-[#00C9A7] font-semibold text-xs';
    case 'Intermediate':
      return 'text-[#3B82F6] font-semibold text-xs';
    case 'Basic':
    case 'Beginner':
    default:
      return 'text-[#64748b] font-medium text-xs';
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="glow-effect w-[400px] h-[400px] bg-primary top-1/2 left-0 -translate-y-1/2 animate-pulse-glow" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title animate-slide-up">
            Skills <span className="gradient-text">Snapshot</span>
          </h2>
          <p className="section-subtitle animate-slide-up animation-delay-100">
            Technical expertise across multiple domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="glass-card-hover p-6 animate-slide-up"
              style={{ animationDelay: `${(categoryIndex + 2) * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => {
                  const proficiency = getProficiency(skill.level);
                  const iconConfig = getSkillIconConfig(skill.name);
                  const SkillIcon = iconConfig.icon;

                  return (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <SkillIcon className={`w-[18px] h-[18px] ${iconConfig.colorClass} opacity-70 group-hover:opacity-100 transition-opacity duration-200`} />
                          <span className="text-sm text-foreground font-medium group-hover:text-white transition-colors duration-200">{skill.name}</span>
                        </div>
                        <span className={getLabelClass(proficiency)}>
                          {proficiency}
                        </span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className={`${getBarFillClass(proficiency)} transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
