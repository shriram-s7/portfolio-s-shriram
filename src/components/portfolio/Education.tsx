import { useState, useEffect } from 'react';
import { GraduationCap, Calendar, Star, BookOpen, Award, X, MapPin, CheckCircle2 } from 'lucide-react';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  year: string;
  score: string;
  description: string;
  details: string[];
  icon: React.ElementType;
  color: string;
  logo?: string;
  glow: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: 'B.E. Computer Science and Engineering',
    institution: 'Easwari Engineering College',
    year: '5th Sem Ongoing',
    score: 'CGPA: 8.87',
    description: 'Specializing in Full Stack Development and AI/ML. Active member of technical clubs.',
    details: [
      "Consistently maintained a high CGPA of 8.87 through rigorous coursework.",
      "Key Courses: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks.",
      "Active participant in the college's Coding Club and Technical Symposiums.",
      "Leading a team for the Smart India Hackathon internal rounds."
    ],
    icon: GraduationCap,
    color: 'text-blue-400',
    logo: '/logos/eec.png',
    glow: 'hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] hover:border-blue-400',
  },
  {
    id: 3,
    degree: 'Diploma in Data Science',
    institution: 'IIT Madras (BS Degree)',
    year: 'Ongoing',
    score: 'Current CGPA: 7.59',
    description: 'Advanced curriculum covering Machine Learning, Statistics, Data Visualization, and real-world AI/ML applications.',
    details: [
      "Core Courses: Machine Learning Foundations (MLF), Machine Learning Techniques (MLT), Tools in Data Science (TDS), and Business Data Management (BDM).",
      "Project Courses: Machine Learning Practice (MLP) Project, Business Data Management (BDM) Project.",
      "Gained hands-on expertise in building ML models, data pipelines, business analytics, and using tools like git, bash, SQL, and Python libraries.",
      "Engaged in in-person invigilated examinations and continuous weekly assignments."
    ],
    icon: Award,
    color: 'text-emerald-400',
    logo: '/logos/iitm.png',
    glow: 'hover:shadow-[0_0_60px_-10px_rgba(52,211,153,0.6)] hover:border-emerald-400',
  },
  {
    id: 2,
    degree: 'Diploma in Programming',
    institution: 'IIT Madras (BS Degree)',
    year: 'Completed',
    score: 'CGPA: 7.59',
    description: 'Rigorous curriculum covering DSA, Java, and Database Management.',
    details: [
      "Completed: Modern Application Development I (Project: MAD I App), Programming, Data Structures and Algorithms using Python, Database Management Systems, Programming Concepts using Java.",
      "Ongoing: System Commands, Modern Application Development II (Project: MAD II App).",
      "Gained proficiency in Python, Java, and PostGreSQL through graded assignments and proctored exams.",
      "Collaborated with peers from across India on group projects."
    ],
    icon: BookOpen,
    color: 'text-purple-400',
    logo: '/logos/iitm.png',
    glow: 'hover:shadow-[0_0_60px_-10px_rgba(192,132,252,0.6)] hover:border-purple-400',
  },
  {
    id: 6,
    degree: 'Foundation in Data Science',
    institution: 'IIT Madras (BS Degree)',
    year: 'Completed',
    score: 'CGPA: 7.63',
    description: 'Gained strong fundamentals in Mathematics, Statistics, and Python.',
    details: [
      "Mastered Computational Thinking and Mathematics for Data Science.",
      "Completed intensive courses in Statistics I & II, building a base for ML.",
      "Passed rigorous in-person quizzes and end-term exams at designated centers.",
      "Learned to analyze real-world datasets using Python libraries like Pandas and NumPy."
    ],
    icon: Award,
    color: 'text-emerald-400',
    logo: '/logos/iitm.png',
    glow: 'hover:shadow-[0_0_60px_-10px_rgba(52,211,153,0.6)] hover:border-emerald-400',
  },
  {
    id: 4,
    degree: 'Class XII (CBSE)',
    institution: "Swamy's School",
    year: 'Completed',
    score: '95.8% (School Rank 3)',
    description: 'School Topper in Mathematics. Excellence in Physics, Chemistry and Computer Science.',
    details: [
      "Secured School Rank 3 with an aggregate of 95.8%.",
      "Subject Topper in Mathematics for scoring 95/100.",
      "Scored 98/100 in Computer Science, demonstrating early aptitude for coding.",
      "Won medals in inter-school Maths olympiads and quizzes."
    ],
    icon: Star,
    color: 'text-blue-400',
    logo: '/logos/school.png',
    glow: 'hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] hover:border-blue-400',
  },
  {
    id: 5,
    degree: 'Class X (CBSE)',
    institution: "Swamy's School",
    year: 'Completed',
    score: '97.4% (School Topper)',
    description: 'Foundation for strong analytical and problem-solving skills.',
    details: [
      "School Topper (Rank 1) with 97.4%.",
      "Scored 100/100 in Tamil and 99/100 in Science,English.",
      "Claimed the 'Best Student Award' for academic and extracurricular excellence.",
      "Built a strong foundation in logical and analytical reasoning."
    ],
    icon: Star,
    color: 'text-orange-400',
    logo: '/logos/school.png',
    glow: 'hover:shadow-[0_0_60px_-10px_rgba(251,146,60,0.6)] hover:border-orange-400',
  },
];

const Education = () => {
  const [selectedEdu, setSelectedEdu] = useState<EducationItem | null>(null);

  useEffect(() => {
    if (selectedEdu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEdu]);

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title animate-slide-up">
            Academic <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle animate-slide-up animation-delay-100">
            My educational background and milestones
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((edu, index) => (
            <div
              key={edu.id}
              onClick={() => setSelectedEdu(edu)}
              // --- THE "PHYSICAL POP" LOGIC ---
              // 1. hover:scale-105: Expands slightly (not 110 to keep text readable)
              // 2. hover:-translate-y-2: Moves up physically
              // 3. hover:z-50: Critical for overlap
              // 4. hover:bg-[#020617]: Solid background on hover
              // 5. edu.glow: The specific colored shadow
              className={`group relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 
                transition-all duration-300 ease-out cursor-pointer
                hover:scale-105 hover:-translate-y-2 hover:z-50 hover:bg-[#020617]
                animate-slide-up flex flex-col md:flex-row gap-6 items-start md:items-center overflow-hidden
                ${edu.glow}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${edu.color.replace('text-', 'from-').split(' ')[0]}/20 via-transparent to-transparent pointer-events-none`} />

              <edu.icon
                strokeWidth={1}
                className={`absolute -right-6 -bottom-6 w-32 h-32 opacity-5 group-hover:opacity-10 transition-all duration-500 -rotate-12 ${edu.color.split(' ')[0]}`}
              />

              <div className="flex-1 order-2 md:order-1 relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1.5">
                    <Calendar size={12} />
                    {edu.year}
                  </span>
                  {edu.score && (
                    <span className={`text-xs font-bold ${edu.color} bg-white/5 px-2.5 py-1 rounded-full border border-white/5`}>
                      {edu.score}
                    </span>
                  )}
                </div>

                {/* Increased Font Size */}
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-white transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-base font-medium text-muted-foreground mb-4">
                  {edu.institution}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {edu.description}
                </p>

                <span className="inline-block mt-4 text-xs font-medium text-white/50 group-hover:text-primary transition-colors border-b border-transparent group-hover:border-primary">
                  Click to view details
                </span>
              </div>

              <div className="order-1 md:order-2 shrink-0 relative z-10">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${edu.color} flex items-center justify-center p-4 bg-white/5 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {edu.logo ? (
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  ) : (
                    <edu.icon size={32} strokeWidth={1.5} />
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- EXPANDED DETAILS MODAL --- */}
      {selectedEdu && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedEdu(null)}
          />

          <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[85vh]">

            <div className="relative p-6 md:p-8 border-b border-white/10 bg-white/5">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedEdu(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-start gap-5">
                <div className={`w-16 h-16 rounded-xl ${selectedEdu.color} flex items-center justify-center p-3.5 bg-black/40 border border-white/10 shrink-0`}>
                  {selectedEdu.logo ? (
                    <img src={selectedEdu.logo} alt="logo" className="w-full h-full object-contain" />
                  ) : (
                    <selectedEdu.icon size={32} />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedEdu.degree}</h3>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
                    <MapPin size={14} />
                    {selectedEdu.institution}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-white/80">
                      {selectedEdu.year}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded bg-white/5 border border-white/5 ${selectedEdu.color}`}>
                      {selectedEdu.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                Key Highlights
              </h4>
              <ul className="space-y-4">
                {selectedEdu.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${selectedEdu.color}`} />
                    <span className="text-sm leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Education;