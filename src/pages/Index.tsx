import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Achievements from '@/components/portfolio/Achievements';
import Education from '@/components/portfolio/Education';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>S Shriram | Full Stack Developer & Data Science Enthusiast</title>
        <meta name="description" content="Portfolio of S Shriram - Engineering student passionate about building real-time, AI-driven systems. Full Stack Developer specializing in Python, Java, Flask, and Machine Learning." />
        <meta name="keywords" content="S Shriram, Full Stack Developer, Data Science, Machine Learning, Python, Java, Flask, Portfolio" />
        <meta property="og:title" content="S Shriram | Full Stack Developer & Data Science Enthusiast" />
        <meta property="og:description" content="Engineering student passionate about building real-time, AI-driven systems using modern technologies." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sshriram.dev" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Achievements />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
