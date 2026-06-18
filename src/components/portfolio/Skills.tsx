import { Code, Globe, Brain, Wrench } from 'lucide-react';

import { skillsData } from '../../data/skillsData';

// Icon mapping
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
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {skill.level >= 80 ? 'Advanced' : 'Intermediate'}
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
