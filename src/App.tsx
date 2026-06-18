// Imports
import Navbar from './components/portfolio/Navbar';
import Hero from './components/portfolio/Hero';
import Skills from './components/portfolio/Skills';
import Projects from './components/portfolio/Projects';
import Hackathon from './components/portfolio/Hackathon';
import Achievements from './components/portfolio/Achievements';
import Education from './components/portfolio/Education';
import Contact from './components/portfolio/Contact';
import Footer from './components/portfolio/Footer';

// Effects
import ModernBackground from './components/ModernBackground';

import TechCompanion from './components/TechCompanion'; // <--- Import the Robot
import HelperAIChat from './components/HelperAIChat';

function App() {
  return (
    <main className="min-h-screen text-foreground relative selection:bg-primary/30">

      {/* Background & Effects */}
      <ModernBackground />


      {/* The New Little Robot */}
      <TechCompanion />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Hackathon />
        <Achievements />
        <Education />
        <Contact />
        <Footer />
        <HelperAIChat />
      </div>
    </main>
  );
}

export default App;