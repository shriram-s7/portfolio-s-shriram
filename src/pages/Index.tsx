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
        <title>S Shriram | Computer Science Engineer & AI/ML Developer</title>
        <meta name="description" content="Portfolio of S Shriram - Computer Science Engineer, IITM BS Data Science Student, and Full Stack & AI/ML Developer passionate about building real-time, AI-driven systems." />
        <meta name="keywords" content="S Shriram, Computer Science Engineer, IIT Madras, IITM, BS Data Science, Full Stack Developer, AI/ML Developer, Machine Learning, Python, Portfolio" />
        <meta property="og:title" content="S Shriram | Computer Science Engineer & AI/ML Developer" />
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
